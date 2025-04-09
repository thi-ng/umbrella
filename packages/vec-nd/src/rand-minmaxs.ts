import { type IRandom } from "@thi.ng/random";
import { SYSTEM as op } from "@thi.ng/random/system";
import type { VecOpSGVVO } from "@thi.ng/vec-api";

/**
 * Like {@link randMinMax} but for nD strided vectors.
 *
 * @param a - vector
 * @param b - input vector (min. bounds)
 * @param c - input vector (max. bounds)
 * @param rnd - PRNG instance
 */
export const randMinMaxS: VecOpSGVVO<IRandom> = (o,a,b,k,rnd=op,io=0,ia=0,ib=0,so=1,sa=1,sb=1)=>{!o&&(o=a);while(k-->0) {o[io+k*so]=rnd.minmax(a[ia+k*sa],b[ib+k*sb]);}return o;};