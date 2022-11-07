import { isNumber } from "@thi.ng/checks/is-number";
import { unsupported } from "@thi.ng/errors/unsupported";
import type {
	IWasmMemoryAccess,
	MemorySlice,
	ReadonlyWasmString,
} from "./api.js";

/**
 * Memory mapped string wrapper for Zig-style UTF-8 encoded byte slices (aka
 * pointer & length pair). The actual JS string can be obtained via
 * {@link WasmStringSlice.deref} and possibly mutated via
 * {@link WasmStringSlice.set}.
 *
 * @remarks
 * Currently only supports wasm32 target, need alt. solution for 64bit (possibly
 * diff implementation) using bigint addresses (TODO)
 */
export class WasmStringSlice implements ReadonlyWasmString {
	protected maxLen: number;

	constructor(
		public readonly mem: IWasmMemoryAccess,
		public readonly base: number,
		protected isConst = true,
		protected terminated = true
	) {
		this.maxLen = this.length;
	}

	/**
	 * Returns string start address (deref'd pointer).
	 */
	get addr() {
		this.mem.ensureMemory();
		return this.mem.u32[this.base >>> 2];
	}

	/**
	 * Returns string length (read from memory)
	 */
	get length() {
		this.mem.ensureMemory();
		return this.mem.u32[(this.base + 4) >>> 2];
	}

	/**
	 * Returns memory as JS string (aka wrapper for
	 * {@link WasmBridge.getString}).
	 */
	deref() {
		return this.mem.getString(this.addr, this.length);
	}

	/**
	 * If given a JS string as arg (and if **not** a const slice), attempts to
	 * overwrite this wrapped string's memory with bytes from given string. If
	 * given another {@link WasmStringSlice} as arg, only the slice pointer &
	 * new length will be updated (always succeeds).
	 *
	 * @remarks
	 * When copying bytes from a JS string, an error will be thrown if the new
	 * string is longer than the _original_ length of the slice (i.e. from when
	 * this `WasmStringSlice` wrapper instance was created). Also updates the
	 * slice's length field to new string length.
	 *
	 * Passing a `WasmString` instance as arg is faster than JS string since
	 * only the slice definition itself will be updated.
	 *
	 * @param str
	 */
	set(str: string | WasmStringSlice) {
		this.mem.ensureMemory();
		if (typeof str === "string") {
			if (this.isConst) unsupported("can't mutate const string");
			this.mem.u32[(this.base + 4) >>> 2] = this.mem.setString(
				str,
				this.addr,
				this.maxLen + ~~this.terminated,
				this.terminated
			);
		} else {
			this.mem.u32[this.base >>> 2] = str.addr;
			this.mem.u32[(this.base + 4) >>> 2] = str.length;
		}
	}

	/**
	 * Sets the slice itself to the new values provided.
	 *
	 * @param slice
	 * @param terminated
	 */
	setSlice(slice: MemorySlice, terminated: boolean): MemorySlice;
	setSlice(addr: number, len: number, terminated: boolean): MemorySlice;
	setSlice(...args: any[]) {
		this.mem.ensureMemory();
		const [slice, terminated] = <[MemorySlice, boolean]>(
			(isNumber(args[0])
				? [[args[0], args[1]], args[2]]
				: [args[0], args[1]])
		);
		this.mem.u32[this.base >>> 2] = slice[0];
		this.mem.u32[(this.base + 4) >>> 2] = slice[1];
		this.terminated = terminated;
		return slice;
	}

	/**
	 * Encodes given string to UTF-8 (by default zero terminated), allocates
	 * memory for it, updates this slice and returns a {@link MemorySlice} of
	 * the allocated region.
	 *
	 * @remarks
	 * If `terminated` is true, the stored slice length will **NOT** include the
	 * sentinel! E.g. the slice length of zero-terminated string `"abc"` is 3,
	 * but the number of allocated bytes is 4. This is done for compatibility
	 * with Zig's sentinel-terminated slice handling (e.g. `[:0]u8` slices).
	 *
	 * Regardless of `terminated` setting, the returned `MemorySlice` **always**
	 * covers the entire allocated region!
	 *
	 * @param str
	 * @param terminate
	 */
	setAlloc(str: string, terminate = true) {
		const slice = __alloc(this.mem, str, terminate);
		this.setSlice(terminate ? [slice[0], slice[1] - 1] : slice, terminate);
		return slice;
	}

	toJSON() {
		return this.deref();
	}

	toString() {
		return this.deref();
	}

	valueOf() {
		return this.deref();
	}
}

/**
 * Memory mapped string wrapper for C-style UTF-8 encoded and **always**
 * zero-terminated char pointers. The actual JS string can be obtained via
 * {@link WasmStringSlice.deref} and mutated via {@link WasmStringSlice.set}.
 */
export class WasmStringPtr implements ReadonlyWasmString {
	constructor(
		public readonly mem: IWasmMemoryAccess,
		public readonly base: number,
		protected isConst = true
	) {}

	/**
	 * Returns string start address (deref'd pointer).
	 */
	get addr() {
		this.mem.ensureMemory();
		return this.mem.u32[this.base >>> 2];
	}

	set addr(addr: number) {
		this.mem.ensureMemory();
		this.mem.u32[this.base >>> 2] = addr;
	}

	/**
	 * Returns computed string length (scanning memory for zero sentinel)
	 */
	get length() {
		this.mem.ensureMemory();
		const idx = this.mem.u8.indexOf(0, this.addr);
		return idx >= 0 ? idx - this.addr : 0;
	}

	/**
	 * Returns memory as JS string (aka wrapper for
	 * {@link WasmBridge.getString}).
	 */
	deref() {
		return this.mem.getString(this.addr, this.length);
	}

	/**
	 * If given a JS string as arg (and if this `WasmStringPtr` instance itself
	 * is not a `const` pointer), attempts to overwrite this wrapped string's
	 * memory with bytes from given string. If given another
	 * {@link WasmStringPtr}, it merely overrides the pointer to the new one
	 * (always succeeds).
	 *
	 * @remarks
	 * Unlike with {@link WasmStringSlice.set} this implementation which
	 * performs bounds checking when copying bytes from a JS string, this method
	 * only throws an error if the new string is longer than the available
	 * memory (from the start address until the end of the WASM memory).
	 * **Therefore, this is as (un)safe as a C pointer and should be used with
	 * caution!**
	 *
	 * Passing a `WasmStringPtr` instance as arg is faster than JS string since
	 * only the pointer itself will be updated.
	 *
	 * @param str
	 */
	set(str: string | WasmStringPtr) {
		const addr = this.addr;
		if (typeof str === "string") {
			if (this.isConst) unsupported("can't mutate const string");
			this.mem.ensureMemory();
			this.mem.setString(str, addr, this.mem.u8.byteLength - addr, true);
		} else {
			this.addr = str.addr;
			this.isConst = str.isConst;
		}
	}

	/**
	 * Encodes given string to UTF-8 (by default zero terminated), allocates
	 * memory for it, updates this pointer to new address and returns allocated
	 * {@link MemorySlice}.
	 *
	 * @remarks
	 * See {@link WasmStringSlice.setAlloc} for important details.
	 *
	 * @param str
	 */
	setAlloc(str: string) {
		const slice = __alloc(this.mem, str, true);
		this.mem.u32[this.base >>> 2] = slice[0];
		return slice;
	}

	toJSON() {
		return this.deref();
	}

	toString() {
		return this.deref();
	}

	valueOf() {
		return this.deref();
	}
}

const __alloc = (
	mem: IWasmMemoryAccess,
	str: string,
	terminate: boolean
): MemorySlice => {
	const buf = new TextEncoder().encode(str);
	const slice = mem.allocate(buf.length + ~~terminate);
	if (slice[1] > 0) {
		mem.u8.set(buf, slice[0]);
		terminate && (mem.u8[slice[0] + buf.length] = 0);
	}
	return slice;
};
