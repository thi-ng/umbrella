import { DEFAULT_OPTS, type ColoredNoiseOpts } from "./api.js";
import { preseed, sum } from "./utils.js";

/**
 * High-pass filtered noise. Opposite of {@link red}.
 *
 * @param opts -
 */
export function* blue(opts?: Partial<ColoredNoiseOpts>) {
	const { bins, scale, rnd } = { ...DEFAULT_OPTS, ...opts };
	const state = preseed(bins, scale, rnd);
	state.forEach((x, i) => (state[i] = i & 1 ? x : -x));
	const invN = 1 / bins;
	let acc = sum(state);
	for (let i = 0, sign = -1; true; ++i >= bins && (i = 0)) {
		acc -= state[i];
		acc += state[i] = sign * rnd.norm(scale);
		sign ^= 0xfffffffe;
		yield sign * acc * invN;
	}
}
