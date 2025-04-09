import { wrap as op } from "@thi.ng/math/interval";
import type { VecOpVVV } from "@thi.ng/vec-api";

/**
 * Componentwise folds given nD vector `a` into the closed interval defined by
 * vectors `b` and `c`.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const wrap: VecOpVVV = (o,a,b,c)=>{!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=op(a[i],b[i],c[i]);}return o;};