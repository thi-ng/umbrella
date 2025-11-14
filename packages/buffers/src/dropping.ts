// SPDX-License-Identifier: Apache-2.0
import { FIFOBuffer } from "./fifo.js";

/**
 * Returns a {@link DroppingBuffer} ring buffer with given max. capacity.
 *
 * @remarks
 * With this implementation, writes are **always** possible, but not guaranteed
 * to happen: Whilst the buffer is at full capacity, new writes will be silently
 * ignored. Read behavior is the same as for {@link fifo}.
 *
 * Also see {@link sliding} for alternative behavior.
 *
 * @param cap
 */
export const dropping = <T>(cap: number) => new DroppingBuffer<T>(cap);

export class DroppingBuffer<T> extends FIFOBuffer<T> {
	copy() {
		const buf = new DroppingBuffer<T>(1);
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
		return super.writable() ? super.write(x) : false;
	}
}
