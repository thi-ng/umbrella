import { mixBilinear as op } from "@thi.ng/math/mix";
import type { VecOpVVVVNN } from "@thi.ng/vec-api";

/**
 * Componentwise nD vector bilinear interpolation.
 *
 * @param o - output vector
 * @param a - input vector
 * @param b - lower-left boundary
 * @param c - lower-right boundary
 * @param d - upper-left boundary
 * @param e - upper-right boundary
 * @param u - 1st interpolation factor in U direction (along `[b,c]` and `[d,e]`)
 * @param v - 2nd interpolation factor in V direction
 */
export const mixBilinear: VecOpVVVVNN = (o,a,b,c,d,u,v)=>{!o && (o=a);for(let i=a.length;--i>=0;) {o[i]=op(a[i],b[i],c[i],d[i],u,v);}return o;};