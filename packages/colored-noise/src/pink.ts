import { ctz32 } from "@thi.ng/binary/count";
import { DEFAULT_OPTS, type ColoredNoiseOpts } from "./api.js";
import { preseed, sum } from "./utils.js";

/**
 * Exponential decay (1/f) noise, based on Voss-McCarthy algorithm.
 *
 * @remarks
 * The number of internal states should be in the [4..32] range (default: 8).
 * Due to JS integer limitations, `n` > 32 are meaningless.
 *
 * References:
 *
 * - https://www.dsprelated.com/showarticle/908.php
 * - https://www.firstpr.com.au/dsp/pink-noise/#Voss-McCartney
 *
 * @param opts -
 */
export function* pink(opts?: Partial<ColoredNoiseOpts>) {
	const { bins, scale, rnd } = {
		...DEFAULT_OPTS,
		bins: 8,
		...opts,
	};
	const state = preseed(bins, scale, rnd);
	const invN = 1 / bins;
	let acc = sum(state);
	for (let i = 0; true; i = (i + 1) >>> 0) {
		const id = ctz32(i) % bins;
		acc -= state[id];
		acc += state[id] = rnd.norm(scale);
		yield acc * invN;
	}
}
