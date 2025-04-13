import type { DistanceFn, MultiVecOpRoVV } from "./api.js";
import { vop } from "./vop.js";

/** @internal */
const { abs } = Math;

/**
 * Computes the Manhattan (or Taxicab) distance between given 2D vectors.
 *
 * @remarks
 * Reference: https://en.wikipedia.org/wiki/Taxicab_geometry
 */
export const distManhattan2: DistanceFn = (a, b) =>
	abs(a[0] - b[0]) + abs(a[1] - b[1]);

/**
 * Computes the Manhattan (or Taxicab) distance between given 3D vectors.
 *
 * @remarks
 * Reference: https://en.wikipedia.org/wiki/Taxicab_geometry
 */
export const distManhattan3: DistanceFn = (a, b) =>
	abs(a[0] - b[0]) + abs(a[1] - b[1]) + abs(a[2] - b[2]);

/**
 * Computes the Manhattan (or Taxicab) distance between given 4D vectors.
 *
 * @remarks
 * Reference: https://en.wikipedia.org/wiki/Taxicab_geometry
 */
export const distManhattan4: DistanceFn = (a, b) =>
	abs(a[0] - b[0]) + abs(a[1] - b[1]) + abs(a[2] - b[2]) + abs(a[3] - b[3]);

export const distManhattan: MultiVecOpRoVV<number> = vop(
	0,
	(a, b) => {
		let d = 0;
		for (let i = a.length; i-- > 0; ) {
			d += abs(a[i] - b[i]);
		}
		return d;
	},
	distManhattan2,
	distManhattan3,
	distManhattan4
);
