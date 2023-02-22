import { EMOJI } from "./emoji.js";

/**
 * Inverse mapping of {@link EMOJI}, i.e. here the emoji characters are keys to
 * look up their names in this object.
 */
export const NAMES = Object.entries(EMOJI).reduce(
	(acc, [k, v]) => ((acc[v] = k), acc),
	<Record<string, string>>{}
);
