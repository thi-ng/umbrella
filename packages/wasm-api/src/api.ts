import type { Fn, IDeref, ILength } from "@thi.ng/api";
import type { WasmBridge } from "./bridge.js";

export const EVENT_MEMORY_CHANGED = "memory-changed";

export type BigIntArray = bigint[] | BigInt64Array | BigUint64Array;

export type ReadonlyWasmString = IDeref<string> &
	ILength & {
		readonly addr: number;
	};

export interface WasmTypeBase {
	/**
	 * Base address in linear WASM memory.
	 */
	readonly __base: number;
	/**
	 * Obtain as byte buffer
	 */
	readonly __bytes: Uint8Array;
}

export interface WasmType<T> {
	readonly align: number;
	readonly size: number;
	instance: Fn<number, T>;
}

export type WasmTypeConstructor<T> = Fn<IWasmMemoryAccess, WasmType<T>>;

/**
 * Common interface for WASM/JS child APIs which will be used in combination
 * with a parent {@link WasmBridge}.
 *
 * @remarks
 * The generic type param is optional and only used if the API is requiring
 * certain exports declared by WASM module.
 */
export interface IWasmAPI<T extends WasmExports = WasmExports> {
	/**
	 * The unique ID for grouping the WASM imports of this module. MUST be the
	 * same as used by the native side of the module.
	 */
	readonly id: string;
	/**
	 * IDs of other WASM API modules which this module depends on. Used to infer
	 * correct initialization order. The core module (w/ unique ID: `wasmapi`)
	 * is always considered an implicit dependency, will be initialized first
	 * and MUST NOT be stated here.
	 */
	readonly dependencies?: string[];
	/**
	 * Called by {@link WasmBridge.init} to initialize all child APIs (async)
	 * after the WASM module has been instantiated. If the method returns false
	 * the overall initialization process will be stopped/terminated.
	 *
	 * @param parent
	 */
	init(parent: WasmBridge<T>): Promise<boolean>;
	/**
	 * Returns an object of this child API's declared WASM imports. Be aware
	 * imports from all child APIs will be merged into a single flat namespace,
	 * it's recommended to use naming prefixes to avoid clashes.
	 */
	getImports(): WebAssembly.ModuleImports;
}

/**
 * Base interface of exports declared by the WASM module. At the very least, a
 * compatible module needs to export its memory and the functions defined in
 * this interface.
 *
 * @remarks
 * This interface is supposed to be extended with the concrete exports defined
 * by your WASM module and is used as generic type param for {@link WasmBridge}
 * and any {@link IWasmAPI} bridge modules. These exports can obtained via
 * {@link WasmBridge.exports} where they will be stored during the execution of
 * {@link WasmBridge.init}.
 */
export interface WasmExports {
	/**
	 * The WASM module's linear memory buffer. The `WasmBridge` automatically
	 * creates various typed views of that memory (i.e. u8, u16, u32, f32 etc.)
	 */
	memory: WebAssembly.Memory;
	/**
	 * Implementation specific WASM memory allocation function. If successful
	 * returns address of new memory block, or zero if unsuccessful.
	 *
	 * @remarks
	 * #### Zig
	 *
	 * Using the supplied Zig bindings (see `/zig/lib.zig`), it's the
	 * user's responsibility to define a public `WASM_ALLOCATOR` in the root
	 * source file to enable allocations, e.g. using the
	 * [`std.heap.GeneralPurposeAllocator`](https://ziglang.org/documentation/master/#Choosing-an-Allocator)
	 * (which also automatically handles growing the WASM memory). However, as
	 * mentioned, the underlying mechanism is purposefully left to the actual
	 * WASM-side implementation. If no allocator is defined this function
	 * returns zero, which in turn will cause {@link WasmBridge.allocate} to
	 * throw an error.
	 *
	 * #### C/C++
	 *
	 * Using the supplied C bindings (see `/include/wasmapi.h`), it's the user's
	 * responsibility to enable allocation support by defining the
	 * `WASMAPI_MALLOC` symbol (and compiling the WASM module with a malloc
	 * implementation).
	 */
	_wasm_allocate(numBytes: number): number;
	/**
	 * Implementation specific function to free a previously allocated chunk of
	 * of WASM memory (allocated via {@link WasmExports._wasm_allocate}, also
	 * see remarks for that function).
	 *
	 * @param addr
	 * @param numBytes
	 */
	_wasm_free(addr: number, numBytes: number): void;
}

export type MemorySlice = [addr: number, len: number];

export interface IWasmMemoryAccess {
	i8: Int8Array;
	u8: Uint8Array;
	i16: Int16Array;
	u16: Uint16Array;
	i32: Int32Array;
	u32: Uint32Array;
	i64: BigInt64Array;
	u64: BigUint64Array;
	f32: Float32Array;
	f64: Float64Array;

	/**
	 * Initializes and/or updates the various typed WASM memory views (e.g.
	 * after growing the WASM memory and the previous buffer becoming detached).
	 */
	ensureMemory(): void;

	/**
	 * Attempts to grow the WASM memory by an additional `numPages` (64KB/page)
	 * and if successful updates all typed memory views to use the new
	 * underlying buffer.
	 *
	 * @param numPages
	 */
	growMemory(numPages: number): void;

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
	allocate(numBytes: number, clear?: boolean): MemorySlice;

	/**
	 * Frees a previous allocated memory region using the exported WASM core API
	 * function {@link WasmExports._wasm_free} (implementation specific). The
	 * `numBytes` value must be the same as previously given to
	 * {@link IWasmMemoryAccess.allocate}.
	 *
	 * @remarks
	 * This function always succeeds, regardless of presence of an active
	 * allocator on the WASM side or validity of given arguments.
	 *
	 * @param slice
	 */
	free(slice: MemorySlice): void;

	/**
	 * Reads UTF-8 encoded string from given address and optional byte length.
	 * The default length is 0, which will be interpreted as a zero-terminated
	 * string. Returns string.
	 *
	 * @param addr
	 * @param len
	 */
	getString(addr: number, len?: number): string;

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
		terminate?: boolean
	): number;
}

/**
 * Core API of WASM imports defined by the {@link WasmBridge}. The same
 * functions are declared as bindings in `/zig/lib.zig`. **Also see this
 * file for documentation of each function...**
 *
 * @remarks
 * Zig API:
 * https://github.com/thi-ng/umbrella/blob/develop/packages/wasm-api/zig/lib.zig
 */
export interface CoreAPI extends WebAssembly.ModuleImports {
	printI8: Fn<number, void>;
	printU8: Fn<number, void>;
	printU8Hex: Fn<number, void>;
	printI16: Fn<number, void>;
	printU16: Fn<number, void>;
	printU16Hex: Fn<number, void>;
	printI32: Fn<number, void>;
	printU32: Fn<number, void>;
	printU32Hex: Fn<number, void>;
	printI64: Fn<bigint, void>;
	printU64: Fn<bigint, void>;
	printU64Hex: Fn<bigint, void>;
	printF32: Fn<number, void>;
	printF64: Fn<number, void>;
	_printI8Array: (addr: number, len: number) => void;
	_printU8Array: (addr: number, len: number) => void;
	_printI16Array: (addr: number, len: number) => void;
	_printU16Array: (addr: number, len: number) => void;
	_printI32Array: (addr: number, len: number) => void;
	_printU32Array: (addr: number, len: number) => void;
	_printI64Array: (addr: number, len: number) => void;
	_printU64Array: (addr: number, len: number) => void;
	_printF32Array: (addr: number, len: number) => void;
	_printF64Array: (addr: number, len: number) => void;
	printStrZ: (addr: number) => void;
	_printStr: (addr: number, len: number) => void;
	printHexdump: (addr: number, len: number) => void;
	debug: () => void;
	_panic: (addr: number, len: number) => void;
	timer: () => number;
	epoch: () => bigint;
}
