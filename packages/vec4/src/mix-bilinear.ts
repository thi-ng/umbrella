import { mixBilinear as op } from "@thi.ng/math/mix";
import type { VecOpVVVVNN } from "@thi.ng/vec-api";

/**
 * Componentwise 4D vector bilinear interpolation.
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
export const mixBilinear4: VecOpVVVVNN = (o,a,b,c,d,u,v)=>{!o && (o=a);o[0]=op(a[0],b[0],c[0],d[0],u,v);o[1]=op(a[1],b[1],c[1],d[1],u,v);o[2]=op(a[2],b[2],c[2],d[2],u,v);o[3]=op(a[3],b[3],c[3],d[3],u,v);return o;};