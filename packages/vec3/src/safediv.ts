import { safeDiv as op } from "@thi.ng/math/safe-div";
import type { VecOpVV } from "@thi.ng/vec-api";

/**
 * Componentwise divides given 3D vector `a` by vector `b`. If a divisor
 * component is zero, the result will be zero too.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const safeDiv3: VecOpVV = (o,a,b)=>{!o && (o=a);o[0]=op(a[0],b[0]);o[1]=op(a[1],b[1]);o[2]=op(a[2],b[2]);return o;};