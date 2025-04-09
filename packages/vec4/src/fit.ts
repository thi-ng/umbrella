import { fit as op } from "@thi.ng/math/fit";
import type { VecOpVVVVV } from "@thi.ng/vec-api";

/**
 * Componentwise maps given 4D vector `a` from the closed source interval
 * defined by `[b,c]` to the target interval `[d,e]`. Writes result into `o`
 * (or if null, back into `a`)
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 * @param d - input vector
 * @param e - input vector
 */
export const fit4: VecOpVVVVV = (o,a,b,c,d,e)=>{!o && (o=a);o[0]=op(a[0],b[0],c[0],d[0],e[0]);o[1]=op(a[1],b[1],c[1],d[1],e[1]);o[2]=op(a[2],b[2],c[2],d[2],e[2]);o[3]=op(a[3],b[3],c[3],d[3],e[3]);return o;};