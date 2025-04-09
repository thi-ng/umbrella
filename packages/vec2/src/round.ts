import { roundTo as op } from "@thi.ng/math/prec";
import type { VecOpVV } from "@thi.ng/vec-api";

/**
 * Componentwise rounds given 2D vector `a` to multiples of components in
 * vector `b`.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const round2: VecOpVV = (o,a,b)=>{!o && (o=a);o[0]=op(a[0],b[0]);o[1]=op(a[1],b[1]);return o;};