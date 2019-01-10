import {
    comp,
    indexed,
    mapcat,
    partition,
    push,
    transduce,
    wrap
} from "@thi.ng/transducers";
import {
    addW2,
    addW3,
    addW5,
    ReadonlyVec,
    Vec
} from "@thi.ng/vectors3";
import { SubdivKernel } from "../api";

export const subdivKernel2 =
    ([ua, ub]: number[], [va, vb]: number[]) =>
        ([a, b]: ReadonlyVec[]) => [
            addW2([], a, b, ua, ub),
            addW2([], a, b, va, vb),
        ];

export const subdivKernel3 =
    ([ua, ub, uc]: number[], [va, vb, vc]: number[]) =>
        ([a, b, c]: ReadonlyVec[]) => [
            addW3([], a, b, c, ua, ub, uc),
            addW3([], a, b, c, va, vb, vc),
        ];

export const subdivKernel5 =
    ([ua, ub, uc, ud, ue]: number[], [va, vb, vc, vd, ve]: number[]) =>
        ([a, b, c, d, e]: ReadonlyVec[]) => [
            addW5([], a, b, c, d, e, ua, ub, uc, ud, ue),
            addW5([], a, b, c, d, e, va, vb, vc, vd, ve),
        ];

/**
 * http://algorithmicbotany.org/papers/subgpu.sig2003.pdf
 *
 * @param kernel subdivision scheme
 * @param pts source points
 * @param iter number of iterations
 * @param closed true, if closed input geometry
 */
export const subdivideCurve = (
    { fn, size }: SubdivKernel,
    pts: ReadonlyVec[],
    iter = 1,
    closed = false) => {

    while (--iter >= 0) {
        const nump = pts.length;
        pts = transduce<ReadonlyVec, ReadonlyVec, Vec[]>(
            comp(
                partition(size, 1),
                indexed(),
                mapcat(([i, pts]) => fn(pts, i, nump))
            ),
            push(),
            closed ?
                wrap(pts, size >> 1, true, true) :
                pts
        );
    }
    return pts;
};
