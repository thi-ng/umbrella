import { DEFAULT_OPTS, type ColoredNoiseOpts } from "./api.js";

/**
 * Unfiltered noise w/ uniform distribution. Merely yields samples from
 * given PRNG.
 *
 * @param opts -
 */
export function* white(opts?: Partial<ColoredNoiseOpts>) {
	const { scale, rnd } = { ...DEFAULT_OPTS, ...opts };
	while (true) {
		yield rnd.norm(scale);
	}
}
