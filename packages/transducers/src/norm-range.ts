import { map } from "./map.js";

/**
 * Yields sequence of `n+1` monotonically increasing numbers in the
 * closed interval (0.0 .. 1.0). If `n <= 0`, yields nothing.
 *
 * @example
 * ```ts
 * [...normRange(4)]
 * // [0, 0.25, 0.5, 0.75, 1.0]
 * ```
 *
 * @param n - number of steps
 * @param includeLast - include last value (i.e. `1.0`)
 */
export function* normRange(
	n: number,
	includeLast = true
): IterableIterator<number> {
	if (n > 0) {
		for (let i = 0, m = includeLast ? n + 1 : n; i < m; i++) {
			yield i / n;
		}
	}
}

/**
 * 2D version of {@link normRange} in Y-major order (i.e. X is inner loop).
 *
 * @param nx -
 * @param ny -
 * @param includeLastX -
 * @param includeLastY -
 */
export function* normRange2d(
	nx: number,
	ny: number,
	includeLastX = true,
	includeLastY = true
) {
	const rx = [...normRange(nx, includeLastX)];
	for (let y of normRange(ny, includeLastY)) {
		yield* map((x) => [x, y], rx);
	}
}

/**
 * 3D version of {@link normRange} in Z-major order (i.e. X being innermost
 * loop).
 *
 * @param nx -
 * @param ny -
 * @param includeLastX -
 * @param includeLastY -
 */
export function* normRange3d(
	nx: number,
	ny: number,
	nz: number,
	includeLastX = true,
	includeLastY = true,
	includeLastZ = true
) {
	const sliceXY = [...normRange2d(nx, ny, includeLastX, includeLastY)];
	for (let z of normRange(nz, includeLastZ)) {
		yield* map((xy) => [...xy, z], sliceXY);
	}
}
