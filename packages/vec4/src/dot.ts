import type { VecOpRoVV } from "@thi.ng/vec-api";

/**
 * Computes dot product of given 4D vectors.
 */
export const dot4: VecOpRoVV<number> = (a,b) => {
return a[0]*b[0]+a[1]*b[1]+a[2]*b[2]+a[3]*b[3];
};