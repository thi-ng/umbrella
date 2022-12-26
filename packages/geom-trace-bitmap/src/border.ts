import type { BorderFn } from "./api.js";

/**
 * Border function which only checks X coordinates.
 *
 * @param w - image width
 * @param h - image width
 */
export const borderX: BorderFn = (w) => {
	w--;
	return (p) => p[0] === 0 || p[0] === w;
};

/**
 * Border function which only checks Y coordinates.
 *
 * @param w - image width
 * @param h - image width
 */
export const borderY: BorderFn = (_, h) => {
	h--;
	return (p) => p[1] === 0 || p[1] === h;
};

/**
 * Border function which checks both X & Y coordinates.
 *
 * @param w - image width
 * @param h - image width
 */
export const borderXY: BorderFn = (w, h) => {
	w--;
	h--;
	return (p) => p[0] === 0 || p[0] === w || p[1] === 0 || p[1] === h;
};
