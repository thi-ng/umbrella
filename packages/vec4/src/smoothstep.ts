import { smoothStep as op } from "@thi.ng/math/step";
import type { VecOpVVV } from "@thi.ng/vec-api";

/**
 * Componentwise computes GLSL `smoothstep()` for given 4D vector `c` and using
 * "edge" vectors `a` and `b`.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 */
export const smoothStep4: VecOpVVV = (o,e1,e2,a)=>{!o&&(o=a);o[0]=op(e1[0],e2[0],a[0]);o[1]=op(e1[1],e2[1],a[1]);o[2]=op(e1[2],e2[2],a[2]);o[3]=op(e1[3],e2[3],a[3]);return o;};