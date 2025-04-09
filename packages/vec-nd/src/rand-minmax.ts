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
export const randMinMax: VecOpVVO<IRandom> = (o,a,b,rnd=op)=>{!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=rnd.minmax(a[i],b[i]);}return o;};