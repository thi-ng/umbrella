import type { VecOpRoVV } from "@thi.ng/vec-api";

/**
 * Computes dot product of given 2D vectors.
 */
export const dot2: VecOpRoVV<number> = (a,b) => {
return a[0]*b[0]+a[1]*b[1];
};