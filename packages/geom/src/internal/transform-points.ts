import type { Fn } from "@thi.ng/api";
import type { PCLike, PCLikeConstructor } from "@thi.ng/geom-api";
import type { MatOpMV, ReadonlyMat } from "@thi.ng/matrices";
import { mulV, mulV344 } from "@thi.ng/matrices/mulv";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { copyAttribs } from "./copy-attribs";

export const transformPoints = (
    pts: ReadonlyVec[],
    mat: ReadonlyMat,
    op: MatOpMV = mulV
) => (pts.forEach((p) => op(null, mat, p)), pts);

export const transformedPoints = (
    pts: ReadonlyVec[],
    mat: ReadonlyMat,
    op: MatOpMV = mulV
) => pts.map((p) => op([], mat, p));

export const transformPointsWith = (
    pts: ReadonlyVec[],
    fn: Fn<ReadonlyVec, ReadonlyMat>,
    op: MatOpMV = mulV
) => (pts.forEach((p) => op(null, fn(p), p)!), pts);

export const transformedPointsWith = (
    pts: ReadonlyVec[],
    fn: Fn<ReadonlyVec, ReadonlyMat>,
    op: MatOpMV = mulV
) => pts.map((p) => op([], fn(p), p)!);

export const transformedShape =
    (ctor: PCLikeConstructor) => ($: PCLike, mat: ReadonlyMat) =>
        new ctor(transformedPoints($.points, mat), copyAttribs($));

export const transformedShapePoints =
    (ctor: PCLikeConstructor) =>
    ($: PCLike, fn: Fn<ReadonlyVec, ReadonlyMat>) =>
        new ctor(transformedPointsWith($.points, fn), copyAttribs($));

// 3d versions

export const transformPoints3 = (pts: ReadonlyVec[], mat: ReadonlyMat) =>
    transformPoints(pts, mat, <any>mulV344);

export const transformedPoints3 = (pts: ReadonlyVec[], mat: ReadonlyMat) =>
    transformedPoints(pts, mat, <any>mulV344);

export const transformedPointsWith3 = (
    pts: ReadonlyVec[],
    fn: Fn<ReadonlyVec, ReadonlyMat>
) => transformedPointsWith(pts, fn, <any>mulV344);

export const transformedShape3 =
    (ctor: PCLikeConstructor) => ($: PCLike, mat: ReadonlyMat) =>
        new ctor(transformedPoints3($.points, mat), copyAttribs($));

export const transformedShapePoints3 =
    (ctor: PCLikeConstructor) =>
    ($: PCLike, fn: Fn<ReadonlyVec, ReadonlyMat>) =>
        new ctor(transformedPointsWith3($.points, fn), copyAttribs($));
