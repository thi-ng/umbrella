import { comp } from "@thi.ng/transducers/func/comp";
import { wrap } from "@thi.ng/transducers/iter/wrap";
import { push } from "@thi.ng/transducers/rfn/push";
import { transduce } from "@thi.ng/transducers/transduce";
import { indexed } from "@thi.ng/transducers/xform/indexed";
import { mapcat } from "@thi.ng/transducers/xform/mapcat";
import { partition } from "@thi.ng/transducers/xform/partition";
import {
    maddN,
    mulNewN,
    ReadonlyVec,
    Vec
} from "@thi.ng/vectors2/api";
import { SubdivKernel } from "../api";

const madd2 =
    (a: ReadonlyVec, b: ReadonlyVec, ua: number, ub: number) =>
        maddN(mulNewN(a, ua), b, ub);

const madd3 =
    (a: ReadonlyVec, b: ReadonlyVec, c: ReadonlyVec, ua: number, ub: number, uc: number) =>
        maddN(maddN(mulNewN(a, ua), b, ub), c, uc);

const madd5 =
    (a: ReadonlyVec, b: ReadonlyVec, c: ReadonlyVec, d: ReadonlyVec, e: ReadonlyVec,
        ua: number, ub: number, uc: number, ud: number, ue: number) =>
        maddN(maddN(maddN(maddN(mulNewN(a, ua), b, ub), c, uc), d, ud), e, ue);

export const subdivKernel2 =
    ([ua, ub]: number[], [va, vb]: number[]) =>
        ([a, b]: ReadonlyVec[]) => [
            madd2(a, b, ua, ub),
            madd2(a, b, va, vb),
        ];

export const subdivKernel3 =
    ([ua, ub, uc]: number[], [va, vb, vc]: number[]) =>
        ([a, b, c]: ReadonlyVec[]) => [
            madd3(a, b, c, ua, ub, uc),
            madd3(a, b, c, va, vb, vc),
        ];

export const subdivKernel5 =
    ([ua, ub, uc, ud, ue]: number[], [va, vb, vc, vd, ve]: number[]) =>
        ([a, b, c, d, e]: ReadonlyVec[]) => [
            madd5(a, b, c, d, e, ua, ub, uc, ud, ue),
            madd5(a, b, c, d, e, va, vb, vc, vd, ve),
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
