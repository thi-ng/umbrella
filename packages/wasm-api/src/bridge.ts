import type {
	Event,
	FnU2,
	INotify,
	Listener,
	NumericArray,
	TypedArray,
} from "@thi.ng/api";
import { INotifyMixin } from "@thi.ng/api/mixins/inotify";
import { defError } from "@thi.ng/errors/deferror";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { U16, U32, U64HL, U8 } from "@thi.ng/hex";
import type { ILogger } from "@thi.ng/logger";
import { ConsoleLogger } from "@thi.ng/logger/console";
import {
	BigIntArray,
	CoreAPI,
	IWasmAPI,
	WasmExports,
	IWasmMemoryAccess,
	EVENT_MEMORY_CHANGED,
} from "./api.js";

const B32 = BigInt(32);

export const OutOfMemoryError = defError(() => "Out of memory");

/**
 * The main interop API bridge between the JS host environment and a WebAssembly
 * module. This class provides a small core API with various typed accessors and
 * utils to exchange data (scalars, arrays, strings etc.) via the WASM module's
 * memory.
 *
 * @remarks
 * All typed memory accessors are assuming the given lookup addresses are
 * properly aligned to the corresponding primitive types (e.g. f32 values are
 * aligned to 4 byte boundaries, f64 to 8 bytes etc.) Unaligned access is
 * explicitly **not supported**! If you need such, please refer to other
 * mechanisms like JS `DataView`...
 *
 * 64bit integers are handled via JS `BigInt` and hence require the host env to
 * support it. No polyfill is provided.
 */
@INotifyMixin
export class WasmBridge<T extends WasmExports = WasmExports>
	implements IWasmMemoryAccess, INotify
{
	i8!: Int8Array;
	u8!: Uint8Array;
	i16!: Int16Array;
	u16!: Uint16Array;
	i32!: Int32Array;
	u32!: Uint32Array;
	i64!: BigInt64Array;
	u64!: BigUint64Array;
	f32!: Float32Array;
	f64!: Float64Array;
	utf8Decoder: TextDecoder = new TextDecoder();
	utf8Encoder: TextEncoder = new TextEncoder();
	imports!: WebAssembly.Imports;
	exports!: T;
	api: CoreAPI;

	constructor(
		public modules: Record<string, IWasmAPI<T>> = {},
		public logger: ILogger = new ConsoleLogger("wasm")
	) {
		const logN = (x: number) => this.logger.debug(x);
		const logA =
			(method: FnU2<number, TypedArray | BigIntArray>) =>
			(addr: number, len: number) =>
				this.logger.debug(method(addr, len).join(", "));
		this.api = {
			printI8: logN,
			printU8: logN,
			printU8Hex: (x: number) => this.logger.debug(`0x${U8(x)}`),
			printI16: logN,
			printU16: logN,
			printU16Hex: (x: number) => this.logger.debug(`0x${U16(x)}`),
			printI32: logN,
			printU32: (x: number) => this.logger.debug(x >>> 0),
			printU32Hex: (x: number) => this.logger.debug(`0x${U32(x)}`),
			_printI64: (hi: number, lo: number) =>
				this.logger.debug((BigInt(hi) << B32) | BigInt(lo)),
			_printU64: (hi: number, lo: number) =>
				this.logger.debug((BigInt(hi >>> 0) << B32) | BigInt(lo >>> 0)),
			_printU64Hex: (hi: number, lo: number) =>
				this.logger.debug(`0x${U64HL(hi, lo)}`),
			printF32: logN,
			printF64: logN,

			_printI8Array: logA(this.getI8Array.bind(this)),
			_printU8Array: logA(this.getU8Array.bind(this)),
			_printI16Array: logA(this.getI16Array.bind(this)),
			_printU16Array: logA(this.getU16Array.bind(this)),
			_printI32Array: logA(this.getI32Array.bind(this)),
			_printU32Array: logA(this.getU32Array.bind(this)),
			_printI64Array: logA(this.getI64Array.bind(this)),
			_printU64Array: logA(this.getU64Array.bind(this)),
			_printF32Array: logA(this.getF32Array.bind(this)),
			_printF64Array: logA(this.getF64Array.bind(this)),

			_printStr0: (addr: number) =>
				this.logger.debug(this.getString(addr, 0)),

			_printStr: (addr: number, len: number) =>
				this.logger.debug(this.getString(addr, len)),

			debug: () => {
				debugger;
			},
		};
	}

	/**
	 * Instantiates WASM module from given `src` (and optional provided extra
	 * imports), then automatically calls {@link WasmBridge.init} with the
	 * modules exports.
	 *
	 * @remarks
	 * If the given `src` is a `Response` or `Promise<Response>`, the module
	 * will be instantiated via `WebAssembly.instantiateStreaming()`, otherwise
	 * the non-streaming version will be used.
	 *
	 * @param src
	 * @param imports
	 */
	async instantiate(
		src: Response | BufferSource | PromiseLike<Response | BufferSource>,
		imports?: WebAssembly.Imports
	) {
		const $src = await src;
		const $imports = { ...this.getImports(), ...imports };
		const wasm = await ($src instanceof Response
			? WebAssembly.instantiateStreaming($src, $imports)
			: WebAssembly.instantiate($src, $imports));
		return this.init(<any>wasm.instance.exports);
	}

	/**
	 * Receives the WASM module's exports, stores the for future reference and
	 * then initializes all declared bridge child API modules. Returns false if
	 * any of the module initializations failed.
	 *
	 * @remarks
	 * Emits the {@link EVENT_MEMORY_CHANGED} event just before returning (and
	 * AFTER all child API modules have been initialized).
	 *
	 * @param exports
	 */
	async init(exports: T) {
		this.exports = exports;
		this.ensureMemory(false);
		for (let id in this.modules) {
			this.logger.debug(`initializing API module: ${id}`);
			const status = await this.modules[id].init(this);
			if (!status) return false;
		}
		this.notify({ id: EVENT_MEMORY_CHANGED, value: this.exports.memory });
		return true;
	}

	/**
	 * Called automatically during initialization. Initializes and/or updates
	 * the various typed WASM memory views (e.g. after growing the WASM memory
	 * and the previous buffer becoming detached). Unless `notify` is false,
	 * the {@link EVENT_MEMORY_CHANGED} event will be emitted if the memory
	 * views had to be updated.
	 *
	 * @param notify
	 */
	ensureMemory(notify = true) {
		const buf = this.exports.memory.buffer;
		if (this.u8 && this.u8.buffer === buf) return;
		this.i8 = new Int8Array(buf);
		this.u8 = new Uint8Array(buf);
		this.i16 = new Int16Array(buf);
		this.u16 = new Uint16Array(buf);
		this.i32 = new Int32Array(buf);
		this.u32 = new Uint32Array(buf);
		this.i64 = new BigInt64Array(buf);
		this.u64 = new BigUint64Array(buf);
		this.f32 = new Float32Array(buf);
		this.f64 = new Float64Array(buf);
		notify &&
			this.notify({
				id: EVENT_MEMORY_CHANGED,
				value: this.exports.memory,
			});
	}

	/**
	 * Required use for WASM module instantiation to provide JS imports to the
	 * module. Returns an object of all WASM imports declared by the bridge core
	 * API and any provided bridge API modules.
	 *
	 * @remarks
	 * Since v0.4.0 each API module's imports will be in their own WASM import
	 * object, named using the same key which was assigned to the module when
	 * creating the WASM bridge. The bridge's core API will be named `core` and
	 * is reserved.
	 *
	 * @example
	 * The following creates a bridge with a fictional `custom` API module:
	 *
	 * ```ts
	 * const bridge = new WasmBridge({ custom: new CustomAPI() });
	 *
	 * // get combined imports object
	 * bridge.getImports();
	 * {
	 *   // imports defined by the core API of the bridge itself
	 *   wasmapi: { ... },
	 *   // imports defined by the CustomAPI module
	 *   custom: { ... }
	 * }
	 * ```
	 *
	 * Any related API bindings on the WASM (Zig) side then also need to refer
	 * to these custom import sections (also see `/zig/core.zig`):
	 *
	 * ```zig
	 * pub export "custom" fn foo(x: u32) void;
	 * ```
	 */
	getImports(): WebAssembly.Imports {
		if (!this.imports) {
			this.imports = { wasmapi: this.api };
			for (let id in this.modules) {
				if (this.imports[id] !== undefined) {
					illegalArgs(`attempt to redeclare API module ${id}`);
				}
				this.imports[id] = this.modules[id].getImports();
			}
		}
		return this.imports;
	}

	/**
	 * Attempts to grow the WASM memory by an additional `numPages` (64KB/page)
	 * and if successful updates all typed memory views to use the new
	 * underlying buffer.
	 *
	 * @param numPages
	 */
	growMemory(numPages: number) {
		this.exports.memory.grow(numPages);
		this.ensureMemory();
	}

	/**
	 * Attempts to allocate `numBytes` using the exported WASM core API function
	 * {@link WasmExports._wasm_allocate} (implementation specific) and returns
	 * start address of the new memory block. If unsuccessful, throws an
	 * {@link OutOfMemoryError}. If `clear` is true, the allocated region will
	 * be zero-filled.
	 *
	 * @remarks
	 * See {@link WasmExports._wasm_allocate} docs for further details.
	 *
	 * @param numBytes
	 * @param clear
	 */
	allocate(numBytes: number, clear = false) {
		const addr = this.exports._wasm_allocate(numBytes);
		if (!addr)
			throw new OutOfMemoryError(`unable to allocate: ${numBytes}`);
		this.logger.debug(
			`allocated ${numBytes} bytes @ 0x${U32(addr)} .. 0x${U32(
				addr + numBytes - 1
			)}`
		);
		this.ensureMemory();
		clear && this.u8.fill(0, addr, addr + numBytes);
		return addr;
	}

	/**
	 * Frees a previous allocated memory region using the exported WASM core API
	 * function {@link WasmExports._wasm_free} (implementation specific). The
	 * `numBytes` value must be the same as previously given to
	 * {@link WasmBridge.allocate}.
	 *
	 * @remarks
	 * This function always succeeds, regardless of presence of an active
	 * allocator on the WASM side or validity of given arguments.
	 *
	 * @param addr
	 * @param numBytes
	 */
	free(addr: number, numBytes: number) {
		this.logger.debug(
			`freeing memory @ 0x${U32(addr)} .. 0x${U32(addr + numBytes - 1)}`
		);
		this.exports._wasm_free(addr, numBytes);
	}

	getI8(addr: number) {
		return this.i8[addr];
	}

	getU8(addr: number) {
		return this.u8[addr];
	}

	getI16(addr: number) {
		return this.i16[addr >> 1];
	}

	getU16(addr: number) {
		return this.u16[addr >> 1];
	}

	getI32(addr: number) {
		return this.i32[addr >> 2];
	}

	getU32(addr: number) {
		return this.u32[addr >> 2];
	}

	getI64(addr: number) {
		return this.i64[addr >> 3];
	}

	getU64(addr: number) {
		return this.u64[addr >> 3];
	}

	getF32(addr: number) {
		return this.f32[addr >> 2];
	}

	getF64(addr: number) {
		return this.f64[addr >> 3];
	}

	setI8(addr: number, x: number) {
		this.i8[addr] = x;
		return this;
	}

	setU8(addr: number, x: number) {
		this.u8[addr] = x;
		return this;
	}

	setI16(addr: number, x: number) {
		this.i16[addr >> 1] = x;
		return this;
	}

	setU16(addr: number, x: number) {
		this.u16[addr >> 1] = x;
		return this;
	}

	setI32(addr: number, x: number) {
		this.i32[addr >> 2] = x;
		return this;
	}

	setU32(addr: number, x: number) {
		this.u32[addr >> 2] = x;
		return this;
	}

	setI64(addr: number, x: bigint) {
		this.i64[addr >> 3] = x;
		return this;
	}

	setU64(addr: number, x: bigint) {
		this.u64[addr >> 3] = x;
		return this;
	}

	setF32(addr: number, x: number) {
		this.f32[addr >> 2] = x;
		return this;
	}

	setF64(addr: number, x: number) {
		this.f64[addr >> 3] = x;
		return this;
	}

	getI8Array(addr: number, len: number) {
		return this.i8.subarray(addr, addr + len);
	}

	getU8Array(addr: number, len: number) {
		return this.u8.subarray(addr, addr + len);
	}

	getI16Array(addr: number, len: number) {
		addr >>= 1;
		return this.i16.subarray(addr, addr + len);
	}

	getU16Array(addr: number, len: number) {
		addr >>= 1;
		return this.u16.subarray(addr, addr + len);
	}

	getI32Array(addr: number, len: number) {
		addr >>= 2;
		return this.i32.subarray(addr, addr + len);
	}

	getU32Array(addr: number, len: number) {
		addr >>= 2;
		return this.u32.subarray(addr, addr + len);
	}

	getI64Array(addr: number, len: number) {
		addr >>= 3;
		return this.i64.subarray(addr, addr + len);
	}

	getU64Array(addr: number, len: number) {
		addr >>= 3;
		return this.u64.subarray(addr, addr + len);
	}

	getF32Array(addr: number, len: number) {
		addr >>= 2;
		return this.f32.subarray(addr, addr + len);
	}

	getF64Array(addr: number, len: number) {
		addr >>= 3;
		return this.f64.subarray(addr, addr + len);
	}

	setI8Array(addr: number, buf: NumericArray) {
		this.i8.set(buf, addr);
		return this;
	}

	setU8Array(addr: number, buf: NumericArray) {
		this.u8.set(buf, addr);
		return this;
	}

	setI16Array(addr: number, buf: NumericArray) {
		this.i16.set(buf, addr >> 1);
		return this;
	}

	setU16Array(addr: number, buf: NumericArray) {
		this.u16.set(buf, addr >> 1);
		return this;
	}

	setI32Array(addr: number, buf: NumericArray) {
		this.i32.set(buf, addr >> 2);
		return this;
	}

	setU32Array(addr: number, buf: NumericArray) {
		this.u32.set(buf, addr >> 2);
		return this;
	}

	setI64Array(addr: number, buf: BigIntArray) {
		this.i64.set(buf, addr >> 3);
		return this;
	}

	setU64Array(addr: number, buf: BigIntArray) {
		this.u64.set(buf, addr >> 3);
		return this;
	}

	setF32Array(addr: number, buf: NumericArray) {
		this.f32.set(buf, addr >> 2);
		return this;
	}

	setF64Array(addr: number, buf: NumericArray) {
		this.f64.set(buf, addr >> 3);
		return this;
	}

	/**
	 * Reads UTF-8 encoded string from given address and optional byte length.
	 * The default length is 0, which will be interpreted as a zero-terminated
	 * string. Returns string.
	 *
	 * @param addr
	 * @param len
	 */
	getString(addr: number, len = 0) {
		this.ensureMemory();
		return this.utf8Decoder.decode(
			this.u8.subarray(
				addr,
				len > 0 ? addr + len : this.u8.indexOf(0, addr)
			)
		);
	}

	/**
	 * Encodes given string as UTF-8 and writes it to WASM memory starting at
	 * `addr`. By default the string will be zero-terminated and only `maxBytes`
	 * will be written. Returns the number of bytes written (excluding final
	 * sentinel, if any).
	 *
	 * @remarks
	 * An error will be thrown if the encoded string doesn't fully fit into the
	 * designated memory region (also note that there might need to be space for
	 * the additional sentinel/termination byte).
	 *
	 * @param str
	 * @param addr
	 * @param maxBytes
	 * @param terminate
	 */
	setString(
		str: string,
		addr: number,
		maxBytes: number,
		terminate = true
	): number {
		maxBytes = Math.min(maxBytes, this.u8.length - addr);
		const len = this.utf8Encoder.encodeInto(
			str,
			this.u8.subarray(addr, addr + maxBytes)
		).written!;
		if (len == null || len >= maxBytes + (terminate ? 0 : 1)) {
			illegalArgs(
				`error writing string to 0x${U32(
					addr
				)} (max. ${maxBytes} bytes, got at least ${str.length})`
			);
		}
		if (terminate) {
			this.u8[addr + len!] = 0;
		}
		return len!;
	}

	getElementById(addr: number, len = 0) {
		const id = this.getString(addr, len);
		const el = document.getElementById(id);
		el == null && illegalArgs(`missing DOM element #${id}`);
		return el!;
	}

	/** {@inheritDoc @thi.ng/api#INotify.addListener} */
	// @ts-ignore: mixin
	addListener(id: string, fn: Listener, scope?: any): boolean {}

	/** {@inheritDoc @thi.ng/api#INotify.removeListener} */
	// @ts-ignore: mixin
	removeListener(id: string, fn: Listener, scope?: any): boolean {}

	/** {@inheritDoc @thi.ng/api#INotify.notify} */
	// @ts-ignore: mixin
	notify(event: Event): void {}
}
