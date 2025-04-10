import type { VecOpRoVV } from "@thi.ng/vec-api";

/**
 * Computes the Manhattan (or Taxicab) distance between given vectors.
 * Reference: https://en.wikipedia.org/wiki/Taxicab_geometry
 */
export const distManhattan2: VecOpRoVV<number> = (a, b) =>
	Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]);
