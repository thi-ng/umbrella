import type { PointTransform2D } from "./api.js";

/**
 * No-op / identity {@link PointTransform2D}.
 */
export const ident: PointTransform2D = () => (x, y) => [x, y];

export const flipX: PointTransform2D = (cols) => (x, y) => [cols - 1 - x, y];

export const flipY: PointTransform2D = (_, rows) => (x, y) => [x, rows - 1 - y];

export const flipXY: PointTransform2D = (cols, rows) => (x, y) =>
	[cols - 1 - x, rows - 1 - y];

/**
 * {@link PointTransform2D} to swaps X & Y coords.
 */
export const swapXY: PointTransform2D = () => (x, y) => [y, x];

/**
 * Higher order {@link PointTransform2D} to compose given transforms in
 * left-to-right order.
 *
 * @param a
 * @param b
 */
export const compTransforms =
	(a: PointTransform2D, b: PointTransform2D): PointTransform2D =>
	(cols, rows) => {
		const $a = a(cols, rows);
		const $b = b(cols, rows);
		return (x, y) => $b(...$a(x, y));
	};
