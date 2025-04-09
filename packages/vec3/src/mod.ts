import { mod as op } from "@thi.ng/math/prec";
import type { VecOpVV } from "@thi.ng/vec-api";

/**
 * Componentwise computes modulo of given 3D vector. Similar to {@link fmod3},
 * {@link remainder3}. Returns `a - b * floor(a / b)` (same as GLSL `mod(a,
 * b)`).
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - input vector
 */
export const mod3: VecOpVV = (o,a,b)=>{!o && (o=a);o[0]=op(a[0],b[0]);o[1]=op(a[1],b[1]);o[2]=op(a[2],b[2]);return o;};