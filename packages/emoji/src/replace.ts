// SPDX-License-Identifier: Apache-2.0
import { EMOJI } from "./emoji.js";

/**
 * Takes a string and replaces all known `:emoji_name:` occurrences with their
 * actual emoji character.
 *
 * @param src
 */
export const replaceNames = (src: string) =>
	src.replace(/:([a-z0-9_+-]+):/g, (orig, id) => EMOJI[id] || orig);
