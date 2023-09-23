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
 * Returns theme for given ID as CSS hex colors. If `reverse` is true (default:
 * false), the theme colors will be returned in reverse order.
 *
 * @param id
 * @param reverse
 */
export const asCSS = (id: number, reverse = false) => {
	__ensureID(id);
	const theme: CSSTheme = [];
	// (<any>theme).__id = id;
	id *= 18;
	for (let i = 0; i < 6; i++, id += 3) {
		theme.push(
			"#" +
				U24((BINARY[id] << 16) | (BINARY[id + 1] << 8) | BINARY[id + 2])
		);
	}
	return reverse ? theme.reverse() : theme;
};

/**
 * Returns theme for given ID as packed ARGB integers (alpha channel will always
 * be set to 0xff). If `reverse` is true (default: false), the theme colors will
 * be returned in reverse order.
 *
 * @param id
 * @param reverse
 */
export const asInt = (id: number, reverse = false) => {
	__ensureID(id);
	const theme: IntTheme = [];
	id *= 18;
	for (let i = 0; i < 6; i++, id += 3) {
		theme.push(
			(0xff000000 |
				(BINARY[id] << 16) |
				(BINARY[id + 1] << 8) |
				BINARY[id + 2]) >>>
				0
		);
	}
	return reverse ? theme.reverse() : theme;
};

/**
 * Returns theme for given ID as thi.ng/color LCH color vectors. If `reverse` is
 * true (default: false), the theme colors will be returned in reverse order.
 *
 * @param id
 * @param reverse
 */
export const asLCH = (id: number, reverse = false): LCHTheme =>
	asRGB(id, reverse).map((x) => lch(x));

/**
 * Returns theme for given ID as thi.ng/color sRGB color vectors. If `reverse`
 * is true (default: false), the theme colors will be returned in reverse order.
 *
 * @param id
 * @param reverse
 */
export const asRGB = (id: number, reverse = false) => {
	__ensureID(id);
	const theme: RGBTheme = <any>[];
	// (<any>theme).__id = id;
	id *= 18;
	for (let i = 0; i < 6; i++, id += 3) {
		theme.push(
			srgb(
				BINARY[id] / 255,
				BINARY[id + 1] / 255,
				BINARY[id + 2] / 255,
				1
			)
		);
	}
	return reverse ? theme.reverse() : theme;
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

/** @internal */
function* __themes<T extends Theme>(
	fn: (id: number) => T,
	preds: ThemePredicate[] | number[]
) {
	if (preds.length && typeof preds[0] === "function") {
		const pred = compFilter(...(<ThemePredicate[]>preds));
		for (let i = 0; i < NUM_THEMES; i++) {
			const theme = fn(i);
			if (pred(theme)) yield theme;
		}
	} else if (preds.length) {
		for (let id of <number[]>preds) yield fn(id);
	} else {
		for (let i = 0; i < NUM_THEMES; i++) yield fn(i);
	}
}

/** @internal */
const __ensureID = (id: number) =>
	assert(id >= 0 && id < NUM_THEMES, `invalid theme ID`);
