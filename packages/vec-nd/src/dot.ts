import type { VecOpRoVV } from "@thi.ng/vec-api";

/**
 * Computes dot product of given nD vectors.
 */
export const dot: VecOpRoVV<number> = (a,b) => {
let s=0;for(let i=a.length;--i>=0;) {s+=a[i]*b[i];}return s;
};