import { remainder as op } from "@thi.ng/math/libc";
import type { VecOpVV } from "@thi.ng/vec-api";

/**
 * Componentwise computes modulo of given 4D vector. Uses the same logic as the
 * standard C function `remainder()`, i.e. componentwise `a - b * round(a /
 * b)`. Also see {@link mod4}, {@link fmod4}.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const remainder4: VecOpVV = (o,a,b)=>{!o && (o=a);o[0]=op(a[0],b[0]);o[1]=op(a[1],b[1]);o[2]=op(a[2],b[2]);o[3]=op(a[3],b[3]);return o;};