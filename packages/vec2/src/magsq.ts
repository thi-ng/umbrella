import type { VecOpRoV } from "@thi.ng/vec-api";

/**
 * Computes the squared magnitude of given 2D vector
 */
export const magSq2: VecOpRoV<number> = (a) => {
return a[0]*a[0]+a[1]*a[1];
};