import { eqDelta } from "@thi.ng/math";
import {
    dot,
    maddN,
    mulN,
    ReadonlyVec,
    sub,
    Vec,
    zero
} from "@thi.ng/vectors3";

export const toBarycentric =
    (a: ReadonlyVec, b: ReadonlyVec, c: ReadonlyVec, p: ReadonlyVec, out: Vec = []) => {

        const u = sub([], b, a);
        const v = sub([], c, a);
        const w = sub([], p, a);
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
        out[0] = 1 - s - t;
        out[1] = s;
        out[2] = t;
        return out;
    };

export const fromBarycentric =
    (a: ReadonlyVec, b: ReadonlyVec, c: ReadonlyVec, p: ReadonlyVec, out: Vec) =>
        maddN(null, maddN(null, mulN(out, a, p[0]), b, p[1]), c, p[2]);
