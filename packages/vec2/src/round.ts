import { roundTo as op } from "@thi.ng/math/prec";
import { defOpVV } from "./defop.js";
import type { VecOpVO } from "@thi.ng/vec-api";

/**
 * Componentwise rounds given 2D vector `a` to multiples of components in
 * vector `b`.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const round2 = defOpVV(op);

/**
 * Componentwise rounds given 2D vector `a` to multiples of uniform scalar `n`
 * (default: 1).
 *
 * @param o - output vector
 * @param a - input vector
 * @param n - scalar
 */
export const roundN2: VecOpVO<number> = (o,a,n=1)=>{!o && (o=a);o[0]=op(a[0],n);o[1]=op(a[1],n);return o;};
