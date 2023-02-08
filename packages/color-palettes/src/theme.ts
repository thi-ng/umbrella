import { U24 } from "@thi.ng/hex";
import { assert } from "@thi.ng/errors/assert";
import type { CSSTheme, RGBTheme } from "./api.js";
import { BINARY, NUM_THEMES } from "./binary.js";

/**
 * Returns theme for given ID as sRGB color vectors.
 *
 * @param id
 */
export const asRGB = (id: number) => {
	__ensureID(id);
	const theme: RGBTheme = [];
	id *= 18;
	for (let i = 0; i < 6; i++, id += 3) {
		theme.push([
			BINARY[id] / 255,
			BINARY[id + 1] / 255,
			BINARY[id + 2] / 255,
			1,
		]);
	}
	return theme;
};

/**
 * Returns theme for given ID as CSS hex colors.
 *
 * @param id
 */
export const asCSS = (id: number) => {
	__ensureID(id);
	const theme: CSSTheme = [];
	id *= 18;
	for (let i = 0; i < 6; i++, id += 3) {
		theme.push(
			"#" +
				U24((BINARY[id] << 16) | (BINARY[id + 1] << 8) | BINARY[id + 2])
		);
	}
	return theme;
};

/**
 * Yields iterator of RGB themes (via {@link asRGB}). Unless specific theme IDs
 * are provided, yields all themes.
 *
 * @param ids
 */
export const rgbThemes = (...ids: number[]) => __themes(asRGB, ids);

/**
 * Yields iterator of CSS themes (via {@link asCSS}). Unless specific theme IDs
 * are provided, yields all themes.
 *
 * @param ids
 */
export const cssThemes = (...ids: number[]) => __themes(asCSS, ids);

function* __themes<T>(fn: (id: number) => T, ids: number[]) {
	if (ids.length) {
		for (let id of ids) yield fn(id);
	} else {
		for (let i = 0; i < NUM_THEMES; i++) yield fn(i);
	}
}

const __ensureID = (id: number) =>
	assert(id >= 0 && id < NUM_THEMES, `invalid theme ID`);
