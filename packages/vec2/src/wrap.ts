import { wrap as op } from "@thi.ng/math/interval";
import type { VecOpVVV } from "@thi.ng/vec-api";

/**
 * Componentwise folds given 2D vector `a` into the closed interval defined by
 * vectors `b` and `c`.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const wrap2: VecOpVVV = (o,a,b,c)=>{!o && (o=a);o[0]=op(a[0],b[0],c[0]);o[1]=op(a[1],b[1],c[1]);return o;};