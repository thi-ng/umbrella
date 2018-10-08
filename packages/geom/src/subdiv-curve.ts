import { comp } from "@thi.ng/transducers/func/comp";
import { wrap } from "@thi.ng/transducers/iter/wrap";
import { push } from "@thi.ng/transducers/rfn/push";
import { transduce } from "@thi.ng/transducers/transduce";
import { indexed } from "@thi.ng/transducers/xform/indexed";
import { mapcat } from "@thi.ng/transducers/xform/mapcat";
import { partition } from "@thi.ng/transducers/xform/partition";
import { IVector } from "@thi.ng/vectors/api";
import { SubdivKernel } from "./api";

export const subdivKernel2 =
    ([ua, ub]: number[], [va, vb]: number[]) =>
        <T extends IVector<T>>([a, b]: T[]) => [
            a.copy().mulN(ua).maddN(b, ub),
            a.copy().mulN(va).maddN(b, vb)
        ];

export const subdivKernel3 =
    ([ua, ub, uc]: number[], [va, vb, vc]: number[]) =>
        <T extends IVector<T>>([a, b, c]: T[]) => [
            a.copy().mulN(ua).maddN(b, ub).maddN(c, uc),
            a.copy().mulN(va).maddN(b, vb).maddN(c, vc)
        ];

export const subdivKernel5 =
    ([ua, ub, uc, ud, ue]: number[], [va, vb, vc, vd, ve]: number[]) =>
        <T extends IVector<T>>([a, b, c, d, e]: T[]) => [
            a.copy().mulN(ua).maddN(b, ub).maddN(c, uc).maddN(d, ud).maddN(e, ue),
            a.copy().mulN(va).maddN(b, vb).maddN(c, vc).maddN(d, vd).maddN(e, ve)
        ];

export const subdivideCurve =
    <T extends IVector<T>>(
        { fn, size }: SubdivKernel<T>,
        pts: T[],
        iter = 1,
        closed = false) => {

        while (--iter >= 0) {
            const nump = pts.length;
            pts = transduce<T, T, T[]>(
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

const CHAIKIN_FIRST = subdivKernel3([1 / 2, 1 / 2, 0], [0, 3 / 4, 1 / 4]);
const CHAIKIN_MAIN = subdivKernel3([1 / 4, 3 / 4, 0], [0, 3 / 4, 1 / 4]);
const CHAIKIN_LAST = subdivKernel3([1 / 4, 3 / 4, 0], [0, 1 / 2, 1 / 2]);

const CUBIC_BEZIER_MAIN = subdivKernel3([1 / 8, 3 / 4, 1 / 8], [0, 1 / 2, 1 / 2]);

export const CHAIKIN_CLOSED: SubdivKernel<any> = {
    fn: CHAIKIN_MAIN,
    size: 3
};

export const CHAIKIN_OPEN: SubdivKernel<any> = {
    fn: (pts, i, n) =>
        i == 0 ?
            [pts[0], ...CHAIKIN_FIRST(pts)] :
            i === n - 3 ?
                [...CHAIKIN_LAST(pts), pts[2]] :
                CHAIKIN_MAIN(pts),
    size: 3
};

export const CUBIC_BEZIER_CLOSED: SubdivKernel<any> = {
    fn: CUBIC_BEZIER_MAIN,
    size: 3
};
