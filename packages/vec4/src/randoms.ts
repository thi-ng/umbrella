import { type IRandom } from "@thi.ng/random";
import { SYSTEM as op } from "@thi.ng/random/system";
import type { VecOpSOOO } from "@thi.ng/vec-api";

/**
 * Like {@link random4} but for 4D strided vectors
 *
 * @param a - output vector
 * @param n - min bounds (default: -1)
 * @param m - max bounds (default: 1)
 * @param rnd - PRNG instance
 * @param ia - index (default: 0)
 * @param sa - stride (default: 1)
 */
export const randomS4: VecOpSOOO<number, number, IRandom> = (a,n=-1,m=1,rnd=op,ia=0,sa=1)=>{!a&&(a=[]);a[ia]=rnd.minmax(n,m);a[ia+sa]=rnd.minmax(n,m);a[ia+2*sa]=rnd.minmax(n,m);a[ia+3*sa]=rnd.minmax(n,m);return a;};