import { fit11 as op } from "@thi.ng/math/fit";
import type { VecOpVVV } from "@thi.ng/vec-api";

/**
 * Componentwise maps given 3D vector `a` from the closed `[-1,1]` interval to
 * the closed target defined by `[b,c]`. Writes result into `o` (or if null,
 * back into `a`)
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const fit11_3: VecOpVVV = (o,a,b,c)=>{!o && (o=a);o[0]=op(a[0],b[0],c[0]);o[1]=op(a[1],b[1],c[1]);o[2]=op(a[2],b[2],c[2]);return o;};