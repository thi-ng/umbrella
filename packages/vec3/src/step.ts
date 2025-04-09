import { step as op } from "@thi.ng/math/step";
import type { VecOpVV } from "@thi.ng/vec-api";

/**
 * Componentwise computes GLSL `step()` for given 3D vector `b` and "edge"
 * vectors `a`.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const step3: VecOpVV = (o,e,a)=>{!o&&(o=a);o[0]=op(e[0],a[0]);o[1]=op(e[1],a[1]);o[2]=op(e[2],a[2]);return o;};