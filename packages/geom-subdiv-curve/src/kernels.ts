import type { ReadonlyVec } from "@thi.ng/vectors";
import { addW2, addW3, addW5 } from "@thi.ng/vectors/addw";

/**
 * HOF subdiv kernel function for computing 2 split points from 2 source
 * points, using weighted summation (thi.ng/vectors/addW2)
 *
 * @param u - split coeffs
 * @param v - split coeffs
 */
export const kernel2 =
    ([ua, ub]: number[], [va, vb]: number[]) =>
    ([a, b]: ReadonlyVec[]) =>
        [addW2([], a, b, ua, ub), addW2([], a, b, va, vb)];

/**
 * HOF subdiv kernel function for computing 2 split points from 3 source
 * points, using weighted summation (thi.ng/vectors/addW3)
 *
 * @param u - split coeffs
 * @param v - split coeffs
 */
export const kernel3 =
    ([ua, ub, uc]: number[], [va, vb, vc]: number[]) =>
    ([a, b, c]: ReadonlyVec[]) =>
        [addW3([], a, b, c, ua, ub, uc), addW3([], a, b, c, va, vb, vc)];

/**
 * HOF subdiv kernel function for computing 2 split points from 5 source
 * points, using weighted summation (thi.ng/vectors/addW5)
 *
 * @param u - split coeffs
 * @param v - split coeffs
 */
export const kernel5 =
    ([ua, ub, uc, ud, ue]: number[], [va, vb, vc, vd, ve]: number[]) =>
    ([a, b, c, d, e]: ReadonlyVec[]) =>
        [
            addW5([], a, b, c, d, e, ua, ub, uc, ud, ue),
            addW5([], a, b, c, d, e, va, vb, vc, vd, ve),
        ];
