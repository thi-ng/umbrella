import type { VecOpRoVV } from "@thi.ng/vec-api";

/**
 * Computes the Chebyshev distance between given vectors.
 * Reference: https://en.wikipedia.org/wiki/Chebyshev_distance
 */
export const distChebyshev2: VecOpRoVV<number> = (a, b) =>
	Math.max(Math.abs(a[0] - b[0]), Math.abs(a[1] - b[1]));
