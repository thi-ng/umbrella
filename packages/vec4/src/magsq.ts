import type { VecOpRoV } from "@thi.ng/vec-api";

/**
 * Computes the squared magnitude of given 4D vector
 */
export const magSq4: VecOpRoV<number> = (a) => {
return a[0]*a[0]+a[1]*a[1]+a[2]*a[2]+a[3]*a[3];
};