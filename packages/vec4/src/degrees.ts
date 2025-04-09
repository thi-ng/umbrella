import { deg as op } from "@thi.ng/math/angle";
import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise computes converts radians to degrees of given 4D vector. Also
 * see {@link radians4}.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const degrees4: VecOpV = (o,a)=>{!o && (o=a);o[0]=op(a[0]);o[1]=op(a[1]);o[2]=op(a[2]);o[3]=op(a[3]);return o;};