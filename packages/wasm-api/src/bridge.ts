import type { FnU2, TypedArray } from "@thi.ng/api";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { U16, U32, U8 } from "@thi.ng/hex";
import type { ILogger } from "@thi.ng/logger";
import { ConsoleLogger } from "@thi.ng/logger/console";
import type { CoreAPI, IWasmAPI, WasmExports } from "./api.js";

/**
 * The main interop API bridge between the JS host environment and a WebAssembly
 * module. This class provides a small core API
 */
export class WasmBridge<T extends WasmExports = WasmExports> {
	i8!: Int8Array;
	u8!: Uint8Array;
	i16!: Int16Array;
	u16!: Uint16Array;
	i32!: Int32Array;
	u32!: Uint32Array;
	f32!: Float32Array;
	f64!: Float64Array;
	utf8Decoder: TextDecoder = new TextDecoder();
	utf8Encoder: TextEncoder = new TextEncoder();
	core: CoreAPI;
	exports!: T;

	constructor(
		public modules: Record<string, IWasmAPI<T>> = {},
		public logger: ILogger = new ConsoleLogger("wasm")
	) {
		const logN = (x: number) => this.logger.debug(x);
		const logA =
			(method: FnU2<number, TypedArray>) => (addr: number, len: number) =>
				this.logger.debug(method(addr, len).join(", "));
		this.core = {
			printI8: logN,
			printU8: logN,
			printU8Hex: (x: number) => this.logger.debug(`0x${U8(x)}`),
			printI16: logN,
			printU16: logN,
			printU16Hex: (x: number) => this.logger.debug(`0x${U16(x)}`),
			printI32: logN,
			printU32: logN,
			printU32Hex: (x: number) => this.logger.debug(`0x${U32(x)}`),
			printF32: logN,
			printF64: logN,

			_printI8Array: logA(this.getI8Array.bind(this)),
			_printU8Array: logA(this.getU8Array.bind(this)),
			_printI16Array: logA(this.getI16Array.bind(this)),
			_printU16Array: logA(this.getU16Array.bind(this)),
			_printI32Array: logA(this.getI32Array.bind(this)),
			_printU32Array: logA(this.getU32Array.bind(this)),
			_printF32Array: logA(this.getF32Array.bind(this)),
			_printF64Array: logA(this.getF64Array.bind(this)),

			_printStr0: (addr: number) =>
				this.logger.debug(this.getString(addr, 0)),

			_printStr: (addr: number, len: number) =>
				this.logger.debug(this.getString(addr, len)),
		};
	}

	/**
	 * Receives the WASM module's exports, stores the for future reference and
	 * then initializes all declared bridge child API modules. Returns false if
	 * any of the module initializations failed.
	 *
	 * @param exports
	 */
	async init(exports: T) {
		this.exports = exports;
		const buf = exports.memory.buffer;
		this.i8 = new Int8Array(buf);
		this.u8 = new Uint8Array(buf);
		this.i16 = new Int16Array(buf);
		this.u16 = new Uint16Array(buf);
		this.i32 = new Int32Array(buf);
		this.u32 = new Uint32Array(buf);
		this.f32 = new Float32Array(buf);
		this.f64 = new Float64Array(buf);
		for (let id in this.modules) {
			this.logger.debug(`initializing API module: ${id}`);
			const status = await this.modules[id].init(this);
			if (!status) return false;
		}
		return true;
	}

	/**
	 * Required use for WASM module instantiation to provide JS imports to the
	 * module. Returns an object of all WASM imports declared by the bridge core
	 * API and any provided bridge API modules.
	 *
	 * @remarks
	 * Since all declared imports will be merged into a single flat namespace,
	 * it's recommended to use per-module naming prefixes to avoid clashes. If
	 * there're any naming clashes, this function will throw an error.
	 */
	getImports() {
		const env: WebAssembly.ModuleImports = { ...this.core };
		for (let id in this.modules) {
			const imports = this.modules[id].getImports();
			// check for naming clashes
			for (let k in imports) {
				if (env[k] !== undefined) {
					illegalArgs(
						`attempt to redeclare import: ${k} by API module ${id}`
					);
				}
			}
			Object.assign(env, imports);
		}
		return { env };
	}

	getI8Array(addr: number, len: number): Int8Array {
		return this.i8.subarray(addr, addr + len);
	}

	getU8Array(addr: number, len: number): Uint8Array {
		return this.u8.subarray(addr, addr + len);
	}

	getI16Array(addr: number, len: number): Int16Array {
		addr >>= 1;
		return this.i16.subarray(addr, addr + len);
	}

	getU16Array(addr: number, len: number): Uint16Array {
		addr >>= 1;
		return this.u16.subarray(addr, addr + len);
	}

	getI32Array(addr: number, len: number): Int32Array {
		addr >>= 2;
		return this.i32.subarray(addr, addr + len);
	}

	getU32Array(addr: number, len: number): Uint32Array {
		addr >>= 2;
		return this.u32.subarray(addr, addr + len);
	}

	getF32Array(addr: number, len: number): Float32Array {
		addr >>= 2;
		return this.f32.subarray(addr, addr + len);
	}

	getF64Array(addr: number, len: number): Float64Array {
		addr >>= 3;
		return this.f64.subarray(addr, addr + len);
	}

	derefI8(ptr: number) {
		return this.i8[ptr];
	}

	derefU8(ptr: number) {
		return this.u8[ptr];
	}

	derefI16(ptr: number) {
		return this.i16[ptr >> 1];
	}

	derefU16(ptr: number) {
		return this.u16[ptr >> 1];
	}

	derefI32(ptr: number) {
		return this.i32[ptr >> 2];
	}

	derefU32(ptr: number) {
		return this.u32[ptr >> 2];
	}

	derefF32(ptr: number) {
		return this.f32[ptr >> 2];
	}

	derefF64(ptr: number) {
		return this.f64[ptr >> 3];
	}

	getString(addr: number, len = 0) {
		return this.utf8Decoder.decode(
			this.u8.subarray(
				addr,
				len > 0 ? addr + len : this.u8.indexOf(0, addr)
			)
		);
	}

	getElementById(addr: number, len = 0) {
		const id = this.getString(addr, len);
		const el = document.getElementById(id);
		el == null && illegalArgs(`missing DOM element #${id}`);
		return el;
	}

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
		if (len != null && len < maxBytes + (terminate ? 0 : 1)) {
			illegalArgs(`error writing string to 0x${U32(addr)}`);
		}
		if (terminate) {
			this.u8[addr + len!] = 0;
			return len! + 1;
		}
		return len!;
	}
}
