import { type IRandom } from "@thi.ng/random";
import { SYSTEM as op } from "@thi.ng/random/system";
import type { VecOpSVVO } from "@thi.ng/vec-api";

/**
 * Like {@link randMinMax2} but for 2D strided vectors.
 *
 * @param a - vector
 * @param b - input vector (min. bounds)
 * @param c - input vector (max. bounds)
 * @param rnd - PRNG instance
 */
export const randMinMaxS2: VecOpSVVO<IRandom> = (o,a,b,rnd=op,io=0,ia=0,ib=0,so=1,sa=1,sb=1)=>{!o && (o=a);o[io]=rnd.minmax(a[ia],b[ib]);o[io+so]=rnd.minmax(a[ia+sa],b[ib+sb]);return o;};