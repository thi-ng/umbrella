import type { DistanceFn, MultiVecOpRoVV } from "./api.js";
import { vop } from "./vop.js";

/** @internal */
const { abs, max } = Math;

/**
 * Computes the Chebyshev distance between given 2D vectors.
 *
 * @remarks
 * Reference: https://en.wikipedia.org/wiki/Chebyshev_distance
 */
export const distChebyshev2: DistanceFn = (a, b) =>
	max(abs(a[0] - b[0]), abs(a[1] - b[1]));

/**
 * Computes the Chebyshev distance between given 3D vectors.
 *
 * @remarks
 * Reference: https://en.wikipedia.org/wiki/Chebyshev_distance
 */
export const distChebyshev3: DistanceFn = (a, b) =>
	max(abs(a[0] - b[0]), abs(a[1] - b[1]), abs(a[2] - b[2]));

/**
 * Computes the Chebyshev distance between given 4D vectors.
 *
 * @remarks
 * Reference: https://en.wikipedia.org/wiki/Chebyshev_distance
 */
export const distChebyshev4: DistanceFn = (a, b) =>
	max(abs(a[0] - b[0]), abs(a[1] - b[1]), abs(a[2] - b[2]), abs(a[3] - b[3]));

export const distChebyshev: MultiVecOpRoVV<number> = vop(
	0,
	(a, b) => {
		let d = 0;
		for (let i = a.length; i-- > 0; ) {
			d = max(d, abs(a[i] - b[i]));
		}
		return d;
	},
	distChebyshev2,
	distChebyshev3,
	distChebyshev4
);
