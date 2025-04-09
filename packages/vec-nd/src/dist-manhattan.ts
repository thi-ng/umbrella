import type { VecOpRoVV } from "@thi.ng/vec-api";

/**
 * Computes the Manhattan (or Taxicab) distance between given vectors.
 * Reference: https://en.wikipedia.org/wiki/Taxicab_geometry
 */
export const distManhattan: VecOpRoVV<number> = (a,b) => {
let sum=0;for(let i=a.length;--i>=0;) {sum+=Math.abs(a[i]-b[i]);}return sum;
};