import type { Fn, IDeref } from "@thi.ng/api";
import type { IWasmMemoryAccess } from "./api.js";

/**
 * Generic pointer facility which on {@link Pointer.deref()} calls wrapper
 * function (provided as ctor arg) to realise the pointer's target value. The
 * pointer's target address can be accessed via {@link Pointer.addr}
 * (read/write).
 *
 * @remarks
 * The pointer always behaves like `volatile`, i.e. memoization of target values
 * is purposfully avoided and the wrapper function is executed anew _each_ time
 * the pointer is deref'd.
 */
export class Pointer<T> implements IDeref<T> {
	constructor(
		public readonly mem: IWasmMemoryAccess,
		public readonly base: number,
		public readonly fn: Fn<number, T>
	) {}

	get addr() {
		return this.mem.u32[this.base >>> 2];
	}

	set addr(addr: number) {
		this.mem.u32[this.base >>> 2] = addr;
	}

	deref() {
		return this.fn(this.addr);
	}
}
