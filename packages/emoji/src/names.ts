import { EMOJI } from "./emoji.js";

/**
 * Inverse mapping of {@link EMOJI}, i.e. here the emoji characters are keys to
 * look up their names in this object.
 *
 * @remarks
 * Might still have to deal with variants:
 *
 * - http://unicode.org/emoji/charts/emoji-variants.html
 * - https://en.wikipedia.org/wiki/Variant_form_(Unicode)
 */
export const NAMES = Object.entries(EMOJI).reduce(
	(acc, [k, v]) => ((acc[v] = k), acc),
	<Record<string, string>>{}
);
