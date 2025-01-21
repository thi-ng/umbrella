// SPDX-License-Identifier: Apache-2.0
import type { IReadWriteBuffer } from "./api.js";
import { assert } from "@thi.ng/errors/assert";

/**
 *  Returns a {@link LIFOBuffer} with given max. capacity.
 *
 * @remarks
 * Read/write behavior is mostly the same as with {@link fifo}, with the
 * important difference, that (as the name indicates), the last value written
 * will be the first value read (i.e. stack behavior).
 *
 * @param cap
 */
export const lifo = <T>(cap: number) => new LIFOBuffer<T>(cap);

export class LIFOBuffer<T> implements IReadWriteBuffer<T> {
	protected buf: T[] = [];

	constructor(protected cap = 1) {
		assert(cap >= 1, `capacity must be >= 1`);
	}

	get length() {
		return this.buf.length;
	}

	clear() {
		this.buf.length = 0;
	}

	copy() {
		const buf = new LIFOBuffer<T>(this.buf.length);
		buf.buf = this.buf.slice();
		return buf;
	}

	readable() {
		return this.buf.length > 0;
	}

	read() {
		return this.buf.pop()!;
	}

	peek() {
		return this.buf[this.buf.length - 1];
	}

	writable() {
		return this.buf.length < this.cap;
	}

	write(x: T) {
		this.buf.push(x);
		return true;
	}
}
