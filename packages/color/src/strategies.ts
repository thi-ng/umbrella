// SPDX-License-Identifier: Apache-2.0
import type { MaybeColor } from "./api.js";
import { lch, type LCH } from "./lch/lch.js";
import { rotate } from "./rotate.js";

const $ = (src: LCH, l = 0, c = 0) => {
	src.l += l;
	src.c += c;
	return src;
};

/**
 * Returns array of `src` color (converted to LCH) and its complementary color,
 * possibly adjusted via optional `deltaL` and `deltaC` args (offsets for L & C
 * channels).
 *
 * @param src -
 * @param deltaL -
 * @param deltaC -
 */
export const complementaryStrategy = (
	src: MaybeColor,
	deltaL?: number,
	deltaC?: number
) => {
	const $src = lch(src);
	return [$src, $(<LCH>rotate(lch(), $src, 0.5), deltaL, deltaC)];
};

/**
 * Returns array of `src` color and 2 neighboring colors, each ±rotated by
 * normalized `theta` and possibly adjusted via optional `deltaL` and `deltaC`
 * args (offsets for L & C channels).
 *
 * @param src -
 * @param theta -
 * @param deltaL -
 * @param deltaC -
 */
export const analogStrategy = (
	src: MaybeColor,
	theta = 1 / 12,
	deltaL?: number,
	deltaC?: number
) => {
	const $src = lch(src);
	return [
		$src,
		$(<LCH>rotate(lch(), $src, -theta), deltaL, deltaC),
		$(<LCH>rotate(lch(), $src, theta), deltaL, deltaC),
	];
};

/**
 * Similar to {@link splitComplementaryStrategy}. Returns array of `src` color,
 * its complementary color and 2 of that colors' neighbors, each ±rotated by
 * normalized `theta` and possibly adjusted via optional `deltaL` and `deltaC`
 * args (offsets for L & C channels).
 *
 * @param src -
 * @param theta -
 * @param deltaL -
 * @param deltaC -
 */
export const splitAnalogStrategy = (
	src: MaybeColor,
	theta = 1 / 12,
	deltaL?: number,
	deltaC?: number
) => {
	const $src = lch(src);
	return [
		...splitComplementaryStrategy($src, theta, deltaL, deltaC),
		$(<LCH>rotate(lch(), $src, theta), deltaL, deltaC),
	];
};

/**
 * Similar to {@link splitAnalogStrategy}. Returns array of `src` color and 2
 * neighbors of its complementary color, each ±rotated by normalized `theta`
 * (from the complementary hue) and possibly adjusted via optional `deltaL` and
 * `deltaC` args (offsets for L & C channels).
 *
 * @param src -
 * @param theta -
 * @param deltaL -
 * @param deltaC -
 */
export const splitComplementaryStrategy = (
	src: MaybeColor,
	theta = 1 / 12,
	deltaL?: number,
	deltaC?: number
) => {
	const $src = lch(src);
	return [
		$src,
		$(<LCH>rotate(lch(), $src, 0.5 - theta), deltaL, deltaC),
		$(<LCH>rotate(lch(), $src, 0.5 + theta), deltaL, deltaC),
	];
};

/**
 * Returns array of 5 colors all sharing same hue and chromacity of given `src`
 * color, but with these luminance settings: 0.0, 0.25, 0.5, 0.75, 1.0. Chroma
 * can be adjusted via optional `deltaC` offset.
 *
 * @param src -
 * @param deltaC -
 */
export const monochromeStrategy = (src: MaybeColor, deltaC = 0) => {
	let [_, c, h, a] = lch(src);
	c += deltaC;
	return [
		lch(0.0, c, h, a),
		lch(0.25, c, h, a),
		lch(0.5, c, h, a),
		lch(0.75, c, h, a),
		lch(1, c, h, a),
	];
};

/**
 * Version of {@link splitComplementaryStrategy} with an hardcoded `theta` of
 * 1/6 to produce 3 colors with hues uniformly distributed on the color wheel
 * (possibly adjusted via optional `deltaL` and `deltaC` args, aka offsets for L
 * & C channels).
 *
 * @param src -
 * @param deltaL -
 * @param deltaC -
 */
export const triadicStrategy = (
	src: MaybeColor,
	deltaL?: number,
	deltaC?: number
) => splitComplementaryStrategy(src, 1 / 6, deltaL, deltaC);

/**
 * Returns array of `src` color and 3 other colors whose hues form a rectangle,
 * using `theta` to define the angular separation. The hues are at: `src`,
 * `src+theta`, `src+1/2` (complementary) and `src+1/2+theta`. Colors are
 * possibly adjusted via optional `deltaL` and `deltaC` args (offsets for L & C
 * channels).
 *
 * @param src -
 * @param theta -
 * @param deltaL -
 * @param deltaC -
 */
export const tetradicStrategy = (
	src: MaybeColor,
	theta = 1 / 12,
	deltaL?: number,
	deltaC?: number
) => {
	const $src = lch(src);
	return [
		$src,
		$(<LCH>rotate(lch(), $src, theta), deltaL, deltaC),
		$(<LCH>rotate(lch(), $src, 0.5), deltaL, deltaC),
		$(<LCH>rotate(lch(), $src, 0.5 + theta), deltaL, deltaC),
	];
};

/**
 * Version of {@link tetradicStrategy} with an hardcoded `theta` of 1/4 to
 * produce 4 colors with hues uniformly distributed on the color wheel (possibly
 * adjusted via optional `deltaL` and `deltaC` args, aka offsets for L & C
 * channels).
 *
 * @param src -
 * @param deltaL -
 * @param deltaC -
 */
export const squareStrategy = (
	src: MaybeColor,
	deltaL?: number,
	deltaC?: number
) => tetradicStrategy(src, 0.25, deltaL, deltaC);
