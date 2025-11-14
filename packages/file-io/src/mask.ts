// SPDX-License-Identifier: Apache-2.0
import { isString } from "@thi.ng/checks/is-string";

let MASKS: [RegExp, string][] = [
	[process.env.HOME ? new RegExp(process.env.HOME, "g") : /~/, "~"],
];

/**
 * Adds given path pattern and its replacement string to registered path masks.
 *
 * @remarks
 * By default only the `$HOME` dir will be masked (if that env var is defined).
 *
 * Also see {@link maskedPath} and {@link setPathMasks}.
 *
 * @param pattern
 * @param mask
 */
export const addPathMask = (pattern: string | RegExp, mask = "****") => {
	MASKS.push([isString(pattern) ? new RegExp(pattern, "g") : pattern, mask]);
};

/**
 * Overrides ALL registered path masks with those given.
 *
 * @remarks
 * Also see {@link maskedPath} and {@link addPathMasks}.
 *
 * @param masks
 */
export const setPathMasks = (masks: [RegExp, string][]) => (MASKS = masks);

/**
 * Iteratively applies all registered path masks to given `path` and returns
 * result.
 *
 * @remarks
 * This function is used by all logging functions in this package. By default
 * only the `$HOME` dir will be masked (if that env var is defined).
 *
 * See {@link addPathMask}, {@link setPathMasks}.
 *
 * @example
 * ```ts
 * maskedPath("/Users/asterix/foo/bar.txt");
 * // "~/foo/bar.txt"
 * ```
 *
 * @param path
 */
export const maskedPath = (path: string) => {
	for (let [re, mask] of MASKS) {
		path = path.replace(re, mask);
	}
	return path;
};

/**
 * Replaces `home` (default: `process.env.HOME`) sub-path with given `mask`
 * (default: `~`). Used by all path logging calls in this package.
 *
 * @param path
 * @param home
 *
 * @deprecated use {@link maskedPath} instead
 */
export const maskHomeDir = (
	path: string,
	home = process.env.HOME,
	mask = "~"
) => (home ? path.replace(home, mask) : path);
