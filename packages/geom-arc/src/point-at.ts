import { cossin, fit01 } from "@thi.ng/math";
import {
    add2,
    mul2,
    ReadonlyVec,
    rotateZ,
    Vec
} from "@thi.ng/vectors";

export const pointAt = (
    pos: ReadonlyVec,
    r: ReadonlyVec,
    axis: number,
    start: number,
    end: number,
    t: number,
    out: Vec = []
) =>
    pointAtTheta(pos, r, axis, fit01(t, start, end), out);

export const pointAtTheta = (
    pos: ReadonlyVec,
    r: ReadonlyVec,
    axis: number,
    theta: number,
    out: Vec = []
) =>
    add2(null, rotateZ(null, mul2(out, cossin(theta), r), axis), pos);
