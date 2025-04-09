import { type IRandom } from "@thi.ng/random";
import { SYSTEM as op } from "@thi.ng/random/system";
import type { VecOpOOO } from "@thi.ng/vec-api";

/**
 * Sets `a` to random vector, with each component in the semi-open interval
 * `[b,c)`. If no `rnd` instance is given, uses
 * [`SYSTEM`](https://docs.thi.ng/umbrella/random/variables/SYSTEM.html).
 * Creates new vector if `a` is null.
 * 
 * **IMPORTANT:** The non-fixed sized version of this function can ONLY be used
 * if `a` is given and initialized to the desired size/length.
 *
 * @param a - vector
 * @param b - scalar (min. bounds, default: -1)
 * @param c - scalar (max. bounds, default: 1)
 * @param rnd - PRNG instance
 */
export const random3: VecOpOOO<number, number, IRandom> = (a,n=-1,m=1,rnd=op)=>{!a&&(a=[]);a[0]=rnd.minmax(n,m);a[1]=rnd.minmax(n,m);a[2]=rnd.minmax(n,m);return a;};