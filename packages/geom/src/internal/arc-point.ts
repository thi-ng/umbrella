import { cossin, fit01 } from "@thi.ng/math";
import {
    add2,
    mul2,
    ReadonlyVec,
    rotateZ,
    Vec
} from "@thi.ng/vectors3";

export const arcPointAt = (
    pos: ReadonlyVec,
    r: ReadonlyVec,
    axis: number,
    start: number,
    end: number,
    t: number,
    out: Vec = []
) =>
    arcPointAtTheta(pos, r, axis, fit01(t, start, end), out);

export const arcPointAtTheta = (
    pos: ReadonlyVec,
    r: ReadonlyVec,
    axis: number,
    theta: number,
    out: Vec = []
) =>
    add2(null, rotateZ(null, mul2(out, cossin(theta), r), axis), pos);
