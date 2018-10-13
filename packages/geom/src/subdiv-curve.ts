import { comp } from "@thi.ng/transducers/func/comp";
import { wrap } from "@thi.ng/transducers/iter/wrap";
import { push } from "@thi.ng/transducers/rfn/push";
import { transduce } from "@thi.ng/transducers/transduce";
import { indexed } from "@thi.ng/transducers/xform/indexed";
import { mapcat } from "@thi.ng/transducers/xform/mapcat";
import { partition } from "@thi.ng/transducers/xform/partition";
import { IVector } from "@thi.ng/vectors/api";
import { SubdivKernel } from "./api";

const madd2 =
    <T extends IVector<T>>
        (a: Readonly<T>, b: Readonly<T>, ua: number, ub: number) =>
        a.mulNewN(ua).maddN(b, ub);

const madd3 =
    <T extends IVector<T>>
        (a: Readonly<T>, b: Readonly<T>, c: Readonly<T>, ua: number, ub: number, uc: number) =>
        a.mulNewN(ua).maddN(b, ub).maddN(c, uc);

const madd5 =
    <T extends IVector<T>>
        (a: Readonly<T>, b: Readonly<T>, c: Readonly<T>, d: Readonly<T>, e: Readonly<T>,
        ua: number, ub: number, uc: number, ud: number, ue: number) =>
        a.mulNewN(ua).maddN(b, ub).maddN(c, uc).maddN(d, ud).maddN(e, ue);

export const subdivKernel2 =
    ([ua, ub]: number[], [va, vb]: number[]) =>
        <T extends IVector<T>>([a, b]: T[]) => [
            madd2(a, b, ua, ub),
            madd2(a, b, va, vb),
        ];

export const subdivKernel3 =
    ([ua, ub, uc]: number[], [va, vb, vc]: number[]) =>
        <T extends IVector<T>>([a, b, c]: T[]) => [
            madd3(a, b, c, ua, ub, uc),
            madd3(a, b, c, va, vb, vc),
        ];

export const subdivKernel5 =
    ([ua, ub, uc, ud, ue]: number[], [va, vb, vc, vd, ve]: number[]) =>
        <T extends IVector<T>>([a, b, c, d, e]: T[]) => [
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

const CUBIC_MAIN = subdivKernel3([1 / 8, 3 / 4, 1 / 8], [0, 1 / 2, 1 / 2]);

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

export const CUBIC_CLOSED: SubdivKernel<any> = {
    fn: CUBIC_MAIN,
    size: 3
};
