import { lowDiscrepancy } from "./lowdisc.js";

/**
 * Iterator yielding 1D Halton sequence for given `base` (preferably a prime).
 *
 * @remarks
 * Ported from Python version at: https://en.wikipedia.org/wiki/Halton_sequence
 *
 * @param base -
 */
export function* halton(base: number) {
	let n = 0;
	let d = 1;
	let invB = 1 / base;
	while (true) {
		let x = d - n;
		if (x === 1) {
			n = 1;
			d *= base;
		} else {
			let y = (d * invB) | 0;
			while (x <= y) {
				y = (y * invB) | 0;
			}
			n = (base + 1) * y - x;
		}
		yield n / d;
	}
}

/**
 * n-dimensional version of {@link halton}. Takes a vector of `bases` (one per
 * dimension) and yields iterator of nD points. If `offset` > 0, the stated
 * number of initial iterations will be skipped.
 *
 * @param bases -
 * @param offset -
 */
export const haltonND = (bases: number[], offset = 0) =>
	lowDiscrepancy(bases.map(halton), offset);
