import { mulV, mulV344, ReadonlyMat } from "@thi.ng/matrices";
import { copyAttribs } from "./copy-attribs";
import type { PCLike, PCLikeConstructor } from "@thi.ng/geom-api";
import type { ReadonlyVec } from "@thi.ng/vectors";

export const transformPoints = (pts: ReadonlyVec[], mat: ReadonlyMat) => (
    pts.forEach((p) => mulV(null, mat, p)), pts
);

export const transformedPoints = (pts: ReadonlyVec[], mat: ReadonlyMat) =>
    pts.map((p) => mulV([], mat, p));

export const transformPoints3 = (pts: ReadonlyVec[], mat: ReadonlyMat) => (
    pts.forEach((p) => mulV344(null, mat, p)!), pts
);

export const transformedPoints3 = (pts: ReadonlyVec[], mat: ReadonlyMat) =>
    pts.map((p) => mulV344([], mat, p)!);

export const transformedShape = (ctor: PCLikeConstructor) => (
    $: PCLike,
    mat: ReadonlyMat
) => new ctor(transformedPoints($.points, mat), copyAttribs($));

export const transformedShape3 = (ctor: PCLikeConstructor) => (
    $: PCLike,
    mat: ReadonlyMat
) => new ctor(transformedPoints3($.points, mat), copyAttribs($));
