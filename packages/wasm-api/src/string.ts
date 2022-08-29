import type { IDeref } from "@thi.ng/api";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import type { IWasmMemoryAccess } from "./api.js";

/**
 * Memory mapped string wrapper for Zig-style UTF-8 encoded byte slices (aka
 * pointer & length pair). The actual JS string can be obtained via
 * {@link WasmString.deref} and mutated via {@link WasmString.set}.
 */
export class WasmString implements IDeref<string> {
	readonly max: number;

	constructor(
		public readonly mem: IWasmMemoryAccess,
		public readonly base: number
	) {
		this.max = this.length;
	}

	/**
	 * Returns string start address (deref'd pointer).
	 */
	get addr() {
		return this.mem.u32[this.base >>> 2];
	}

	/**
	 * Returns string length (read from memory)
	 */
	get length() {
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
	 * Attempts to overwrite string's memory with given JS string (or wrapper).
	 * Throws an error if new string is longer than the _original_ length of the
	 * slice (i.e. when this `WasmString` instance was created). Also updates
	 * the slice's length field to new string length.
	 *
	 * @remarks
	 * Passing a `WasmString` instance as arg is faster than JS string since
	 * bytes can be copied directly and avoids UTF-8 encoding.
	 *
	 * @param str
	 */
	set(str: string | WasmString) {
		let len: number;
		if (typeof str === "string") {
			len = this.mem.setString(str, this.addr, this.max + 1, true);
		} else {
			if (str.length > this.max) {
				illegalArgs(
					`string too large (max. ${this.max} bytes, got ${str.length})`
				);
			}
			this.mem.u8.copyWithin(
				this.addr,
				str.addr,
				str.addr + str.length + 1
			);
			len = str.length;
		}
		this.mem.u32[(this.base + 4) >>> 2] = len;
	}

	toJSON() {
		this.deref();
	}

	toString() {
		return this.deref();
	}
}

/**
 * Memory mapped string wrapper for C-style UTF-8 encoded and zero-terminated
 * char pointers. The actual JS string can be obtained via
 * {@link WasmString.deref} and mutated via {@link WasmString.set}.
 */
export class WasmStringPtr implements IDeref<string> {
	constructor(
		public readonly mem: IWasmMemoryAccess,
		public readonly base: number
	) {}

	/**
	 * Returns string start address (deref'd pointer).
	 */
	get addr() {
		return this.mem.u32[this.base >>> 2];
	}

	/**
	 * Returns computed string length (scanning memory for zero sentinel)
	 */
	get length() {
		const addr = this.addr;
		const idx = this.mem.u8.indexOf(0, addr);
		return idx >= 0 ? idx - addr : 0;
	}

	/**
	 * Returns memory as JS string (aka wrapper for
	 * {@link WasmBridge.getString}).
	 */
	deref() {
		return this.mem.getString(this.addr, this.length);
	}

	/**
	 * Overwrites string's memory with given JS string (or wrapper). Unlike with
	 * {@link WasmString.set} this implementation which performs bounds
	 * checking, this method only throws an error if new string is longer than
	 * the available memory (from the start address until the end of the WASM
	 * memory). **Therefore, this is as (un)safe as a C pointer and should be
	 * used with caution!**
	 *
	 * @remarks
	 * Passing a `WasmStringPtr` instance as arg is faster than JS string since
	 * bytes can be copied directly and avoids UTF-8 encoding.
	 *
	 * @param str
	 */
	set(str: string | WasmStringPtr) {
		const addr = this.addr;
		if (typeof str === "string") {
			this.mem.setString(str, addr, this.mem.u8.byteLength - addr, true);
		} else {
			this.mem.u8.copyWithin(
				this.addr,
				str.addr,
				str.addr + str.length + 1
			);
		}
	}

	toJSON() {
		this.deref();
	}

	toString() {
		return this.deref();
	}
}
