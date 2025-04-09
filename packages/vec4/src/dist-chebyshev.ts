import type { VecOpRoVV } from "@thi.ng/vec-api";

/**
 * Computes the Chebyshev distance between given vectors.
 * Reference: https://en.wikipedia.org/wiki/Chebyshev_distance
 */
export const distChebyshev4: VecOpRoVV<number> = (a,b) => {
return Math.max(Math.abs(a[0]-b[0]),Math.abs(a[1]-b[1]),Math.abs(a[2]-b[2]),Math.abs(a[3]-b[3]));
};