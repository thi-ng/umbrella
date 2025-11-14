// SPDX-License-Identifier: Apache-2.0
import { FIFOBuffer } from "./fifo.js";

/**
 * Returns a {@link SlidingBuffer} ring buffer with given max. capacity.
 *
 * @remarks
 * With this implementation, writes are **always** possible, but not guaranteed
 * to happen: Whilst the buffer is at full capacity, new writes will first
 * expunge the oldest buffered value. Read behavior is the same as for
 * {@link fifo}.
 *
 * Also see {@link dropping} for alternative behavior.
 *
 * @param cap
 */
export const sliding = <T>(cap: number) => new SlidingBuffer<T>(cap);

export class SlidingBuffer<T> extends FIFOBuffer<T> {
	copy() {
		const buf = new SlidingBuffer<T>(1);
		buf.buf = this.buf.slice();
		buf.rpos = this.rpos;
		buf.wpos = this.wpos;
		buf.len = this.len;
		return buf;
	}

	writable() {
		return true;
	}

	write(x: T) {
		if (!super.writable()) {
			const { buf, rpos } = this;
			buf[rpos] = undefined;
			this.rpos = (rpos + 1) % buf.length;
			this.len--;
		}
		return super.write(x);
	}
}
