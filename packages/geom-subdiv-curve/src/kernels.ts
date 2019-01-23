import {
    addW2,
    addW3,
    addW5,
    ReadonlyVec
} from "@thi.ng/vectors";

export const kernel2 =
    ([ua, ub]: number[], [va, vb]: number[]) =>
        ([a, b]: ReadonlyVec[]) => [
            addW2([], a, b, ua, ub),
            addW2([], a, b, va, vb),
        ];

export const kernel3 =
    ([ua, ub, uc]: number[], [va, vb, vc]: number[]) =>
        ([a, b, c]: ReadonlyVec[]) => [
            addW3([], a, b, c, ua, ub, uc),
            addW3([], a, b, c, va, vb, vc),
        ];

export const kernel5 =
    ([ua, ub, uc, ud, ue]: number[], [va, vb, vc, vd, ve]: number[]) =>
        ([a, b, c, d, e]: ReadonlyVec[]) => [
            addW5([], a, b, c, d, e, ua, ub, uc, ud, ue),
            addW5([], a, b, c, d, e, va, vb, vc, vd, ve),
        ];
