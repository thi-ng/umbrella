import { TAU } from "@thi.ng/math/api";
import { atan2Abs, cossin } from "@thi.ng/math/angle";
import { ReadonlyVec, Vec, maddNew } from "@thi.ng/vectors2/api";

export const arcVertices = (
    o: ReadonlyVec,
    a: ReadonlyVec,
    b: ReadonlyVec,
    r: ReadonlyVec,
    verts: Vec[] = [],
    outwards = false,
    res = 8) => {

    const ta = atan2Abs(a[1] - o[1], a[0] - o[0]);
    const tb = atan2Abs(b[1] - o[1], b[0] - o[0]);
    const theta = ta > tb ? ta - tb : ta + TAU - tb;
    const ts = (outwards ? -theta : TAU - theta) / res;
    verts.push(a);
    for (let i = 1; i < res; i++) {
        verts.push(maddNew(o, cossin(ta + ts * i), r));
    }
    verts.push(b);
    return verts;
};
