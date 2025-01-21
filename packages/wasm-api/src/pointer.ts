// SPDX-License-Identifier: Apache-2.0
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
 *
 * Pointers with addr=0 are interpreted as null/optional pointers and
 * {@link Pointer.deref} will return `undefined` in these cases.
 */
export class Pointer<T> implements IDeref<T | undefined> {
	constructor(
		public readonly mem: IWasmMemoryAccess,
		public readonly base: number,
		public readonly fn: Fn<number, T>
	) {}

	get addr() {
		this.mem.ensureMemory();
		return this.mem.u32[this.base >>> 2];
	}

	set addr(addr: number) {
		this.mem.ensureMemory();
		this.mem.u32[this.base >>> 2] = addr;
	}

	get isNull() {
		return this.addr === 0;
	}

	deref() {
		const addr = this.addr;
		return addr ? this.fn(addr) : undefined;
	}
}

/**
 * Generic pointer facility for
 * [`WASM64`](https://docs.thi.ng/umbrella/wasm-api-bindgen/variables/WASM64.html)
 * target, which on {@link Pointer64.deref()} calls wrapper function (provided
 * as ctor arg) to realize the pointer's target value. The pointer's target
 * address can be accessed via {@link Pointer.addr} (read/write).
 *
 * @remarks
 * The pointer always behaves like `volatile`, i.e. memoization of target values
 * is purposefully avoided and the wrapper function is executed anew _each_ time
 * the pointer is deref'd.
 *
 * Pointers with addr=0 are interpreted as null/optional pointers and
 * {@link Pointer64.deref} will return `undefined` in these cases.
 */
export class Pointer64<T> implements IDeref<T | undefined> {
	constructor(
		public readonly mem: IWasmMemoryAccess,
		public readonly base: bigint,
		public readonly fn: Fn<bigint, T>
	) {}

	get addr() {
		this.mem.ensureMemory();
		return this.mem.u64[Number(this.base >> BigInt(3))];
	}

	set addr(addr: bigint) {
		this.mem.ensureMemory();
		this.mem.u64[Number(this.base >> BigInt(3))] = addr;
	}

	get isNull() {
		return this.addr === 0n;
	}

	deref() {
		const addr = this.addr;
		return addr ? this.fn(addr) : undefined;
	}
}
