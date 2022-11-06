import type { ColoredNoiseOpts } from "./api.js";
import { blue } from "./blue.js";
import { interleave } from "./utils.js";

/**
 * Band-pass filtered noise (interleaved blue noise). Opposite of
 * {@link violet}.
 *
 * @param opts -
 */
export const green = (opts?: Partial<ColoredNoiseOpts>) =>
	interleave(blue(opts), blue(opts));
