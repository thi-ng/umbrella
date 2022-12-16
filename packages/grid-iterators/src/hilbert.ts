import { asInt } from "@thi.ng/api/typedarray";

/**
 * Yields sequence of 2D grid coordinates along 2D Hilbert curve using given
 * `cols` and `rows` (each max. 32768 (2^15)).
 *
 * Ported & modified from original Java code by Christopher Kulla.
 * https://sourceforge.net/p/sunflow/code/HEAD/tree/trunk/src/org/sunflow/core/bucket/HilbertBucketOrder.java
 *
 * @param cols -
 * @param rows -
 */
export function* hilbert2d(cols: number, rows = cols) {
	[cols, rows] = asInt(cols, rows);
	let hIndex = 0; // hilbert curve index
	let hOrder = 0; // hilbert curve order
	// fit to number of buckets
	while ((1 << hOrder < cols || 1 << hOrder < rows) && hOrder < 15) hOrder++;
	const numBuckets = 1 << (2 * hOrder);
	for (let i = 0, n = cols * rows; i < n; i++) {
		let hx, hy;
		do {
			// adapted from Hacker's Delight
			let s, t, comp, swap, cs, sr;
			// s is the hilbert index, shifted to start in the middle
			s = hIndex | (0x55555555 << (2 * hOrder)); // Pad s on left with 01
			sr = (s >>> 1) & 0x55555555; // (no change) groups.
			cs = ((s & 0x55555555) + sr) ^ 0x55555555;
			// Compute complement & swap info in two-bit groups.
			// Parallel prefix xor op to propagate both complement and
			// swap info together from left to right (there is no step
			// "cs ^= cs >> 1", so in effect it computes two independent
			// parallel prefix operations on two interleaved sets of
			// sixteen bits).
			cs = cs ^ (cs >>> 2);
			cs = cs ^ (cs >>> 4);
			cs = cs ^ (cs >>> 8);
			cs = cs ^ (cs >>> 16);
			// Separate the swap and complement bits.
			swap = cs & 0x55555555;
			comp = (cs >>> 1) & 0x55555555;
			// Calculate x and y in the odd & even bit positions
			t = (s & swap) ^ comp;
			s = s ^ sr ^ t ^ (t << 1);
			// Clear out any junk on the left (unpad).
			s = s & ((1 << (2 * hOrder)) - 1);
			// Now "unshuffle" to separate the x and y bits.
			t = (s ^ (s >>> 1)) & 0x22222222;
			s = s ^ t ^ (t << 1);
			t = (s ^ (s >>> 2)) & 0x0c0c0c0c;
			s = s ^ t ^ (t << 2);
			t = (s ^ (s >>> 4)) & 0x00f000f0;
			s = s ^ t ^ (t << 4);
			t = (s ^ (s >>> 8)) & 0x0000ff00;
			s = s ^ t ^ (t << 8);
			// Assign the two halves to x and y.
			hx = s >>> 16;
			hy = s & 0xffff;
			hIndex++;
		} while (
			// Dont't emit any outside cells
			(hx >= cols || hy >= rows || hx < 0 || hy < 0) &&
			hIndex < numBuckets
		);
		yield [hx, hy];
	}
}
