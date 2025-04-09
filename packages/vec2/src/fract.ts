import { fract as op } from "@thi.ng/math/prec";
import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise computes fractional parts of given 2D vector.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const fract2: VecOpV = (o,a)=>{!o && (o=a);o[0]=op(a[0]);o[1]=op(a[1]);return o;};