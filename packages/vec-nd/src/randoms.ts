import { type IRandom } from "@thi.ng/random";
import { SYSTEM as op } from "@thi.ng/random/system";
import type { VecOpSGOOO } from "@thi.ng/vec-api";

/**
 * Like {@link random} but for nD strided vectors
 *
 * @param a - output vector
 * @param n - min bounds (default: -1)
 * @param m - max bounds (default: 1)
 * @param rnd - PRNG instance
 * @param ia - index (default: 0)
 * @param sa - stride (default: 1)
 */
export const randomS: VecOpSGOOO<number, number, IRandom> = (a,k,n=-1,m=1,rnd=op,ia=0,sa=1)=>{!a&&(a=[]);while(k-->0) {a[ia+k*sa]=rnd.minmax(n,m);}return a;};