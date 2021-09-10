import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { addW3 } from "@thi.ng/vectors/addw";
import { dot } from "@thi.ng/vectors/dot";
import { magSq } from "@thi.ng/vectors/magsq";
import { setC3 } from "@thi.ng/vectors/setc";
import { sub } from "@thi.ng/vectors/sub";

export const toBarycentric = (
    a: ReadonlyVec,
    b: ReadonlyVec,
    c: ReadonlyVec,
    p: ReadonlyVec,
    out: Vec = []
) => {
    const u = sub([], b, a);
    const v = sub([], c, a);
    const w = sub([], p, a);
    const uu = magSq(u);
    const vv = magSq(v);
    const uv = dot(u, v);
    const uw = dot(u, w);
    const vw = dot(v, w);
    const d = 1 / (uv * uv - uu * vv);
    const s = d * (uv * vw - vv * uw);
    const t = d * (uv * uw - uu * vw);
    return setC3(out, 1 - (s + t), s, t);
};

export const fromBarycentric = (
    a: ReadonlyVec,
    b: ReadonlyVec,
    c: ReadonlyVec,
    p: ReadonlyVec,
    out: Vec = []
) => addW3(out, a, b, c, p[0], p[1], p[2]);
