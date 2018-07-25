import { ReadonlyVec, Vec, VecOp } from "./api";

/**
 *
 * @param fn op
 * @param a array to process
 * @param b vector operand
 * @param n num elements
 * @param ia start index `a`
 * @param ib start index `b`
 * @param cstridea component stride `a`
 * @param cstrideb component stride `b`
 * @param estridea element stride `a`
 */
export const sliceOp1 = (fn: VecOp, a: Vec, b: ReadonlyVec, n: number, ia = 0, ib = 0, cstridea = 1, cstrideb = 1, estridea = 2) => {
    for (let i = ia; n > 0; n-- , i += estridea) {
        fn(a, b, i, ib, cstridea, cstrideb);
    }
    return a;
};
