import { deg as op } from "@thi.ng/math/angle";
import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise computes converts radians to degrees of given 3D vector. Also
 * see {@link radians3}.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const degrees3: VecOpV = (o,a)=>{!o && (o=a);o[0]=op(a[0]);o[1]=op(a[1]);o[2]=op(a[2]);return o;};