import { normal as op } from "@thi.ng/random/distributions/normal";
import type { VecOpFNO } from "@thi.ng/vec-api";

/**
 * Sets `v` to random vector, with each component drawn from given random
 * distribution function (default: gaussian/normal distribution) and scaled to
 * `n` (default: 1). Creates new vector if `v` is null.
 * 
 * @remarks
 * The non-fixed sized version of this function can ONLY be used if `v` is
 * given and initialized to the desired size/length.
 * 
 * References:
 * 
 * - https://docs.thi.ng/umbrella/random/#random-distributions
 * - https://docs.thi.ng/umbrella/random/functions/normal.html
 *
 * @param o - output vector
 * @param rnd - random distribution function
 * @param n - scale factor
 */
export const randDistrib4: VecOpFNO = (a,rnd=op(),n=1)=>{!a&&(a=[]);a[0]=rnd()*n;a[1]=rnd()*n;a[2]=rnd()*n;a[3]=rnd()*n;return a;};