import { ReadonlyVec } from "@thi.ng/vectors";

export const testRectCircle = (
    [rx, ry]: ReadonlyVec,
    [w, h]: ReadonlyVec,
    [cx, cy]: ReadonlyVec,
    r: number
) => axis(cx, rx, w) + axis(cy, ry, h) <= r * r;

export const testAABBSphere = (
    [rx, ry, rz]: ReadonlyVec,
    [w, h, d]: ReadonlyVec,
    [cx, cy, cz]: ReadonlyVec,
    r: number
) => axis(cx, rx, w) + axis(cy, ry, h) + axis(cz, rz, d) <= r * r;

const axis = (a: number, b: number, c: number) =>
    Math.pow(a < b ? a - b : a > b + c ? a - b - c : 0, 2);
