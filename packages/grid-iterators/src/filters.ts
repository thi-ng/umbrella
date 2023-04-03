import type { GridCoord2D } from "./api.js";

/**
 * Returns true if x,y is on a right-to-left diagonal with spacing `n`.
 *
 * @param x
 * @param y
 * @param n
 */
export const isOnDiagonal = ([x, y]: GridCoord2D, n: number) => {
	const d = ((x + y) / n) | 0;
	return y === d * n - x;
};

/**
 * Returns true if x,y is on a left-to-right diagonal with spacing `n`.
 *
 * @param x
 * @param y
 * @param n
 */
export const isOnDiagonalAlt = ([x, y]: GridCoord2D, N: number) => {
	const d = ((x - y) / N) | 0;
	return -y === d * N - x;
};
