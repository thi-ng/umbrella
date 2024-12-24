import type { Maybe } from "@thi.ng/api";
import { assert } from "@thi.ng/errors/assert";
import type { IReadWriteBuffer } from "./api.js";

/**
 * Returns a {@link FIFOBuffer} ring buffer with given max. capacity.
 *
 * @remarks
 * With this implementation, new writes will be ignored whilst the buffer's
 * capacity is reached.
 *
 * Also see {@link lifo}.
 *
 * @param cap
 */
export const fifo = <T>(cap: number) => new FIFOBuffer<T>(cap);

/**
 * First-in, first-out ring buffer implementation. See {@link fifo}.
 */
export class FIFOBuffer<T> implements IReadWriteBuffer<T> {
	protected buf: Maybe<T>[];
	protected rpos = 0;
	protected wpos = 0;
	protected len = 0;

	constructor(cap = 1) {
		assert(cap >= 1, `capacity must be >= 1`);
		this.buf = new Array(cap + 1);
	}

	get length() {
		return this.len;
	}

	clear() {
		this.buf.fill(undefined);
	}

	copy() {
		const buf = new FIFOBuffer<T>(1);
		buf.buf = this.buf.slice();
		buf.rpos = this.rpos;
		buf.wpos = this.wpos;
		buf.len = this.len;
		return buf;
	}

	readable() {
		return this.rpos !== this.wpos;
	}

	read() {
		const { buf, rpos } = this;
		const val = buf[rpos]!;
		buf[rpos] = undefined;
		this.rpos = (rpos + 1) % buf.length;
		this.len--;
		return val;
	}

	peek() {
		const { buf, rpos } = this;
		return buf[rpos]!;
	}

	writable() {
		return (this.wpos + 1) % this.buf.length !== this.rpos;
	}

	write(x: T) {
		const { buf, wpos } = this;
		buf[wpos] = x;
		this.wpos = (wpos + 1) % buf.length;
		this.len++;
		return true;
	}
}
