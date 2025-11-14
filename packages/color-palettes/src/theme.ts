// SPDX-License-Identifier: Apache-2.0
import { isNumber } from "@thi.ng/checks/is-number";
import { css } from "@thi.ng/color/css/css";
import { argb32 } from "@thi.ng/color/int/int";
import { lch } from "@thi.ng/color/lch/lch";
import { srgb } from "@thi.ng/color/srgb/srgb";
import { assert } from "@thi.ng/errors/assert";
import { U24 } from "@thi.ng/hex";
import type {
	CSSTheme,
	IntTheme,
	LCHTheme,
	RGBTheme,
	Theme,
	ThemePredicate,
} from "./api.js";
import { BINARY, NUM_THEMES } from "./binary.js";
import { compFilter } from "./filter.js";

/**
 * Returns given `theme` (array of colors or theme preset ID) as CSS color
 * strings. If `reverse` is true (default: false), the theme colors will be
 * returned in reverse order.
 *
 * @remarks
 * The resulting format of CSS colors depends on the color type of the given
 * theme (if given an array of colors), as well as on the currently active
 * [default
 * setting](https://docs.thi.ng/umbrella/color/functions/setDefaultCSSConversions.html)
 * of the CSS conversions in thi.ng/color.
 *
 * @param theme
 * @param reverse
 */
export const asCSS = (theme: number | Theme, reverse = false) => {
	let res: CSSTheme;
	if (isNumber(theme)) {
		__ensureID(theme);
		theme *= 18;
		res = [];
		for (let i = 0; i < 6; i++, theme += 3) {
			res.push("#" + U24(__read(theme)));
		}
	} else {
		res = theme.map((x) => css(x));
	}
	return reverse ? res.reverse() : res;
};

/**
 * Returns given `theme` (array of colors or theme preset ID) as packed ARGB
 * integers. If `reverse` is true (default: false), the theme colors will be
 * returned in reverse order.
 *
 * @remarks
 * If given a theme ID, the alpha channel of all colors will always be set to
 * `0xff`.
 *
 * @param theme
 * @param reverse
 */
export const asInt = (theme: number | Theme, reverse = false) => {
	let res: IntTheme;
	if (isNumber(theme)) {
		__ensureID(theme);
		theme *= 18;
		res = [];
		for (let i = 0; i < 6; i++, theme += 3) {
			res.push(__read(theme));
		}
	} else {
		res = theme.map((x) => argb32(x).deref()[0]);
	}
	return reverse ? res.reverse() : res;
};

/**
 * Returns given `theme` (array of colors or theme preset ID) as thi.ng/color
 * LCH color vectors. If `reverse` is true (default: false), the theme colors
 * will be returned in reverse order.
 *
 * @param theme
 * @param reverse
 */
export const asLCH = (theme: number | Theme, reverse = false): LCHTheme => {
	if (isNumber(theme)) {
		return asRGB(theme, reverse).map((x) => lch(x));
	}
	const res = theme.map((x) => lch(x));
	return reverse ? res.reverse() : res;
};

/**
 * Returns given `theme` (array of colors or theme preset ID) sRGB color
 * vectors. If `reverse` is true (default: false), the theme colors will be
 * returned in reverse order.
 *
 * @param theme
 * @param reverse
 */
export const asRGB = (theme: number | Theme, reverse = false) => {
	let res: RGBTheme;
	if (isNumber(theme)) {
		__ensureID(theme);
		theme *= 18;
		res = [];
		for (let i = 0; i < 6; i++, theme += 3) {
			res.push(
				srgb(
					BINARY[theme] / 255,
					BINARY[theme + 1] / 255,
					BINARY[theme + 2] / 255,
					1
				)
			);
		}
	} else {
		res = theme.map((x) => srgb(x));
	}
	return reverse ? res.reverse() : res;
};

/**
 * Yields iterator of CSS themes (via {@link asCSS}). Yields all
 * themes unless specific theme IDs or filter predicates are provided.
 *
 * @param preds
 */
export const cssThemes = (...preds: ThemePredicate[] | number[]) =>
	__themes(asCSS, preds);

/**
 * Yields iterator of packed ARGB integer themes (via {@link asInt}). Yields all
 * themes unless specific theme IDs or filter predicates are provided.
 *
 * @param preds
 */
export const intThemes = (...preds: ThemePredicate[] | number[]) =>
	__themes(asInt, preds);

/**
 * Yields iterator of LCH themes (via {@link asLCH}). Yields all
 * themes unless specific theme IDs or filter predicates are provided.
 *
 * @param preds
 */
export const lchThemes = (...preds: ThemePredicate[] | number[]) =>
	__themes(asLCH, preds);

/**
 * Yields iterator of RGB themes (via {@link asRGB}). Yields all
 * themes unless specific theme IDs or filter predicates are provided.
 *
 * @param preds
 */
export const rgbThemes = (...preds: ThemePredicate[] | number[]) =>
	__themes(asRGB, preds);

/**
 * Yields iterator of theme IDs (indices). Yields all themes unless specific
 * theme IDs or filter predicates are provided.
 *
 * @param preds
 */
export const themeIDs = (...preds: ThemePredicate[] | number[]) =>
	__themes(asRGB, preds, true);

/** @internal */
function __themes<T extends Theme>(
	fn: (id: number) => T,
	preds: ThemePredicate[] | number[]
): IterableIterator<T>;
/** @internal */
function __themes<T extends Theme>(
	fn: (id: number) => T,
	preds: ThemePredicate[] | number[],
	idOnly: true
): IterableIterator<number>;
/** @internal */
function* __themes<T extends Theme>(
	fn: (id: number) => T,
	preds: ThemePredicate[] | number[],
	idOnly = false
) {
	if (preds.length && typeof preds[0] === "function") {
		const pred = compFilter(...(<ThemePredicate[]>preds));
		for (let i = 0; i < NUM_THEMES; i++) {
			const theme = fn(i);
			if (pred(theme)) yield idOnly ? i : theme;
		}
	} else if (preds.length) {
		for (let id of <number[]>preds) yield idOnly ? id : fn(id);
	} else {
		for (let i = 0; i < NUM_THEMES; i++) yield idOnly ? i : fn(i);
	}
}

/** @internal */
const __ensureID = (id: number) =>
	assert(id >= 0 && id < NUM_THEMES, `invalid theme ID`);

/** @internal */
const __read = (i: number) =>
	(0xff000000 | (BINARY[i] << 16) | (BINARY[i + 1] << 8) | BINARY[i + 2]) >>>
	0;
