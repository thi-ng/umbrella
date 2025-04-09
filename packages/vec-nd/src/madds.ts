import type { VecOpSGVVV } from "@thi.ng/vec-api";

/**
 * Componentwise nD strided vector multiply-add.
 * `o = a * b + c`
 *
 * @param out - output vector
 * @param a - input vector
 * @param b - input vector
 * @param c - input vector
 * @param size - vector size
 * @param io - index (default: 0)
 * @param ia - index (default: 0)
 * @param ib - index (default: 0)
 * @param ic - index (default: 0)
 * @param so - stride (default: 1)
 * @param sa - stride (default: 1)
 * @param sb - stride (default: 1)
 * @param sc - stride (default: 1)
 */
export const maddS: VecOpSGVVV = (o,a,b,c,k,io=0,ia=0,ib=0,ic=0,so=1,sa=1,sb=1,sc=1) => {
!o&&(o=a);while(k-->0) {o[io+k*so]=(a[ia+k*sa]*b[ib+k*sb])+c[ic+k*sc];}return o;
};