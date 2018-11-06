import {
    dot,
    maddN,
    mulNewN,
    ReadonlyVec,
    setS,
    subNew,
    Vec,
    zero
} from "@thi.ng/vectors2/api";
import { eqDelta } from "@thi.ng/math/eqdelta";

export const toBarycentric =
    (a: ReadonlyVec, b: ReadonlyVec, c: ReadonlyVec, p: ReadonlyVec, out: Vec = []) => {

        const u = subNew(b, a);
        const v = subNew(c, a);
        const w = subNew(p, a);
        const d00 = dot(u, u);
        const d01 = dot(u, v);
        const d11 = dot(v, v);
        const d20 = dot(w, u);
        const d21 = dot(w, v);
        const denom = d00 * d11 - d01 * d01;

        if (eqDelta(denom, 0)) {
            return zero(out);
        }

        const s = (d11 * d20 - d01 * d21) / denom;
        const t = (d00 * d21 - d01 * d20) / denom;
        return setS(out, 1 - s - t, s, t);
    };

export const fromBarycentric =
    (a: ReadonlyVec, b: ReadonlyVec, c: ReadonlyVec, p: ReadonlyVec, out: Vec) =>
        maddN(maddN(mulNewN(a, p[0], out), b, p[1]), c, p[2]);
