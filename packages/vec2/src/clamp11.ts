import { clamp11 as op } from "@thi.ng/math/interval";
import type { VecOpV } from "@thi.ng/vec-api";

/**
 * Componentwise constrains given 2D vector `a` to the closed [-1,1] interval.
 *
 * @param o - output vector
 * @param a - input vector
 */
export const clamp11_2: VecOpV = (o,a)=>{!o && (o=a);o[0]=op(a[0]);o[1]=op(a[1]);return o;};