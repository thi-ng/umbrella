import type { Color, ReadonlyColor } from "./api.js";
import { setC4, setV4 } from "./utils.js";

/**
 * Multiplies RGB channels w/ alpha channel. Assumes alpha is in last
 * vector component and [0..1] interval. Does NOT clamp result.
 *
 * @param out -
 * @param src -
 */
export const premultiply = (out: Color | null, src: ReadonlyColor) => {
	const a = src[3];
	return setC4(out || src, src[0] * a, src[1] * a, src[2] * a, a);
};

/**
 * Multiplies RGB channels of packed int with alpha channel. Assumes
 * 8bits/channel and alpha in MSB lane.
 *
 * @param src -
 */
export const premultiplyInt = (src: number) => {
	const a = (src >>> 24) / 0xff;
	return (
		(src & 0xff000000) |
		((((src >>> 16) & 0xff) * a) << 16) |
		((((src >>> 8) & 0xff) * a) << 8) |
		((src & 0xff) * a)
	);
};

/**
 * Reverse operation of {@link premultiply}. Divides RGB channels
 * by alpha, unless alpha is zero. Does NOT clamp result.
 *
 * @param out -
 * @param src -
 */
export const postmultiply = (out: Color | null, src: ReadonlyColor) => {
	const a = src[3];
	return a > 0
		? setC4(out || src, src[0] / a, src[1] / a, src[2] / a, a)
		: out && out != src
		? setV4(out, src)
		: src;
};

/**
 * Reverse op of {@link premultiplyInt}. Assumes 8bits/channel and alpha in
 * MSB lane. Divides RGB channels by alpha (unless zero) and DOES clamp
 * result to avoid overflows.
 *
 * @param src -
 */
export const postmultiplyInt = (src: number) => {
	const a = (src >>> 24) / 0xff;
	return a > 0
		? ((src & 0xff000000) |
				(Math.min(0xff, ((src >>> 16) & 0xff) / a) << 16) |
				(Math.min(0xff, ((src >>> 8) & 0xff) / a) << 8) |
				Math.min(0xff, (src & 0xff) / a)) >>>
				0
		: src;
};

/**
 * Returns true if RGBA float color vector is premultiplied.
 *
 * @param src -
 */
export const isPremultiplied = (src: ReadonlyColor) => {
	const a = src[3];
	return (src[0] <= a && src[1] <= a) || src[2] <= a;
};

/**
 * Returns true if packed int color value is premultiplied.
 *
 * @param src -
 */
export const isPremultipliedInt = (src: number) => {
	const a = src >>> 24;
	return (
		((src >>> 16) & 0xff) <= a &&
		((src >>> 8) & 0xff) <= a &&
		(src & 0xff) <= a
	);
};
