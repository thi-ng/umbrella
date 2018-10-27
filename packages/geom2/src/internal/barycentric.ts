import {
    dot,
    maddN,
    magSq,
    mulNewN,
    ReadonlyVec,
    setS,
    subNew,
    Vec
} from "@thi.ng/vectors2/api";

export const toBarycentric =
    (a: ReadonlyVec, b: ReadonlyVec, c: ReadonlyVec, p: ReadonlyVec, out: Vec) => {

        const u = subNew(b, a);
        const v = subNew(c, a);
        const w = subNew(p, a);
        const uu = magSq(u);
        const vv = magSq(v);
        const uv = dot(u, v);
        const uw = dot(u, w);
        const vw = dot(v, w);
        const d = 1 / (uv * uv - uu * vv);
        const s = d * (uv * vw - vv * uw);
        const t = d * (uv * uw - uu * vw);

        return setS(out, 1 - (s + t), s, t);
    };

export const fromBarycentric =
    (a: ReadonlyVec, b: ReadonlyVec, c: ReadonlyVec, p: ReadonlyVec, out: Vec) =>
        maddN(maddN(mulNewN(a, p[0], out), b, p[1]), c, p[2]);
