import { unsupported } from "@thi.ng/errors/unsupported";
import type { IWasmMemoryAccess, ReadonlyWasmString } from "./api.js";

/**
 * Memory mapped string wrapper for Zig-style UTF-8 encoded byte slices (aka
 * pointer & length pair). The actual JS string can be obtained via
 * {@link WasmStringSlice.deref} and mutated via {@link WasmStringSlice.set}.
 *
 * @remarks
 * Currently only supports wasm32 target, need alt. solution for 64bit (possibly
 * diff implementation) using bigint addresses (TODO)
 */
export class WasmStringSlice implements ReadonlyWasmString {
	readonly max: number;

	constructor(
		public readonly mem: IWasmMemoryAccess,
		public readonly base: number,
		public readonly isConst = true
	) {
		this.max = this.length;
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
				this.max + 1,
				true
			);
		} else {
			this.mem.u32[this.base >>> 2] = str.addr;
			this.mem.u32[(this.base + 4) >>> 2] = str.length;
		}
	}

	/**
	 * Sets the slice itself to the new values provided.
	 *
	 * @param addr
	 * @param len
	 */
	setSlice(addr: number, len: number) {
		this.mem.ensureMemory();
		this.mem.u32[this.base >>> 2] = addr;
		this.mem.u32[(this.base + 4) >>> 2] = len;
	}

	/**
	 * Encodes given string to UTF-8 (by default zero terminated), allocates
	 * memory for it and then updates this slice.
	 *
	 * @param str
	 * @param terminate
	 */
	setAlloc(str: string, terminate = true) {
		const buf = new TextEncoder().encode(str);
		const [addr] = this.mem.allocate(buf.length + ~~terminate);
		this.mem.u8.set(buf, addr);
		this.setSlice(addr, buf.length);
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
 * Memory mapped string wrapper for C-style UTF-8 encoded and zero-terminated
 * char pointers. The actual JS string can be obtained via
 * {@link WasmStringSlice.deref} and mutated via {@link WasmStringSlice.set}.
 */
export class WasmStringPtr implements ReadonlyWasmString {
	constructor(
		public readonly mem: IWasmMemoryAccess,
		public readonly base: number,
		public readonly isConst = true
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
	 * If given a JS string as arg (and if not a const pointer), attempts to
	 * overwrite this wrapped string's memory with bytes from given string. If
	 * given another {@link WasmStringPtr}, it merely overrides the pointer to
	 * the new one (always succeeds).
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
		}
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
