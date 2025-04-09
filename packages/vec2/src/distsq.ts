import type { VecOpRoVV } from "@thi.ng/vec-api";

/**
 * Computes the squared Eucledian distance between given vectors.
 */
export const distSq2: VecOpRoVV<number> = (a,b) => {
let t,s=0;t=a[0]-b[0];s+=t*t;t=a[1]-b[1];s+=t*t;return s;
};