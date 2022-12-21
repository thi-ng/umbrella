import type { PointTransform } from "./api.js";

/**
 * No-op / identity {@link PointTransform}.
 */
export const ident: PointTransform = () => (x, y) => [x, y];

export const flipX: PointTransform = (cols) => (x, y) => [cols - 1 - x, y];

export const flipY: PointTransform = (_, rows) => (x, y) => [x, rows - 1 - y];

export const flipXY: PointTransform = (cols, rows) => (x, y) =>
	[cols - 1 - x, rows - 1 - y];

/**
 * {@link PointTransform} to swaps X & Y coords.
 */
export const swapXY: PointTransform = () => (x, y) => [y, x];

/**
 * Higher order {@link PointTransform} to compose given transforms in
 * left-to-right order.
 *
 * @param a
 * @param b
 */
export const compTransforms =
	(a: PointTransform, b: PointTransform): PointTransform =>
	(cols, rows) => {
		const $a = a(cols, rows);
		const $b = b(cols, rows);
		return (x, y) => $b(...$a(x, y));
	};
