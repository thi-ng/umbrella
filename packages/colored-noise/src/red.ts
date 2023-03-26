import { DEFAULT_OPTS, type ColoredNoiseOpts } from "./api.js";
import { preseed, sum } from "./utils.js";

/**
 * Low-pass filtered noise (same as brown noise). Opposite of {@link blue}.
 *
 * @param opts -
 */
export function* red(opts?: Partial<ColoredNoiseOpts>) {
	const { bins, scale, rnd } = {
		...DEFAULT_OPTS,
		...opts,
	};
	const state = preseed(bins, scale, rnd);
	const invN = 1 / bins;
	let acc = sum(state);
	for (let i = 0; true; ++i >= bins && (i = 0)) {
		acc -= state[i];
		acc += state[i] = rnd.norm(scale);
		yield acc * invN;
	}
}
