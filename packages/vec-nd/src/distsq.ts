import type { VecOpRoVV } from "@thi.ng/vec-api";

/**
 * Computes the squared Eucledian distance between given vectors.
 */
export const distSq: VecOpRoVV<number> = (a,b) => {
let t,s=0;for(let i=a.length;--i>=0;) {t=a[i]-b[i];s+=t*t;}return s;
};