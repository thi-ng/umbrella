import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Copies 2D vector `a` to `o` (or if latter is null, creates a new vector).
 *
 * @param o - output vector
 * @param a - input vector
 */
export const set2: VecOpV = (o,a) => {
!o&&(o=[]);o[0]=a[0];o[1]=a[1];return o;
};