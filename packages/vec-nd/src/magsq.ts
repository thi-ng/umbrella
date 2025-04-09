import type { VecOpRoV } from "@thi.ng/vec-api";

/**
 * Computes the squared magnitude of given nD vector
 */
export const magSq: VecOpRoV<number> = (a) => {
let sum=0;for(let i=a.length;--i>=0;) {sum+=a[i]*a[i];}return sum;
};