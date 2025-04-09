import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Copies nD vector `a` to `o` (or if latter is null, creates a new vector).
 *
 * @param o - output vector
 * @param a - input vector
 */
export const set: VecOpV = (o,a) => {
!o&&(o=[]);for(let i=a.length;--i>=0;) {o[i]=a[i];}return o;
};