import type { TemplateFn } from "../api.js";

/**
 * Post-processing stage template function. Replaces all leading tabs (per line
 * indentation) with `size` spaces.
 *
 * @param size
 */
export const tabsToSpaces = (size = 4): TemplateFn => {
	const indent = " ".repeat(size);
	return ({ src }) => src.replace(/^\t+/gm, (x) => indent.repeat(x.length));
};

/**
 * Post-processing stage template function. Compacts successive empty lines to a
 * max. of 1 empty line.
 *
 * @param ctx
 */
export const compactEmptyLines: TemplateFn = ({ src, eol }) =>
	src.replace(/(\r?\n){2,}/g, eol.repeat(2)).trim() + eol;
