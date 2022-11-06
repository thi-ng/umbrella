import type { ColoredNoiseOpts } from "./api.js";
import { red } from "./red.js";
import { interleave } from "./utils.js";

/**
 * Band-stop filtered noise (interleaved red noise). Opposite of {@link green}.
 *
 * @param opts -
 */
export const violet = (opts?: Partial<ColoredNoiseOpts>) =>
	interleave(red(opts), red(opts));
