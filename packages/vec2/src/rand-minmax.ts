import { type IRandom } from "@thi.ng/random";
import { SYSTEM as op } from "@thi.ng/random/system";
import type { VecOpVVO } from "@thi.ng/vec-api";

/**
 * 
 *
 * @param a - vector
 * @param b - input vector (min. bounds)
 * @param c - input vector (max. bounds)
 * @param rnd - PRNG instance
 */
export const randMinMax2: VecOpVVO<IRandom> = (o,a,b,rnd=op)=>{!o && (o=a);o[0]=rnd.minmax(a[0],b[0]);o[1]=rnd.minmax(a[1],b[1]);return o;};