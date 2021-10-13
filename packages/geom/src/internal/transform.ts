import type { Fn } from "@thi.ng/api";
import type { PCLike, PCLikeConstructor } from "@thi.ng/geom-api";
import type { MatOpMV, ReadonlyMat } from "@thi.ng/matrices";
import { mulV, mulV344 } from "@thi.ng/matrices/mulv";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { __copyAttribs } from "./copy.js";

export const __transformPoints = (
    pts: ReadonlyVec[],
    mat: ReadonlyMat,
    op: MatOpMV = mulV
) => (pts.forEach((p) => op(null, mat, p)), pts);

export const __transformedPoints = (
    pts: ReadonlyVec[],
    mat: ReadonlyMat,
    op: MatOpMV = mulV
) => pts.map((p) => op([], mat, p));

export const __transformPointsWith = (
    pts: ReadonlyVec[],
    fn: Fn<ReadonlyVec, ReadonlyMat>,
    op: MatOpMV = mulV
) => (pts.forEach((p) => op(null, fn(p), p)!), pts);

export const __transformedPointsWith = (
    pts: ReadonlyVec[],
    fn: Fn<ReadonlyVec, ReadonlyMat>,
    op: MatOpMV = mulV
) => pts.map((p) => op([], fn(p), p)!);

export const __transformedShape =
    (ctor: PCLikeConstructor) => ($: PCLike, mat: ReadonlyMat) =>
        new ctor(__transformedPoints($.points, mat), __copyAttribs($));

export const __transformedShapePoints =
    (ctor: PCLikeConstructor) =>
    ($: PCLike, fn: Fn<ReadonlyVec, ReadonlyMat>) =>
        new ctor(__transformedPointsWith($.points, fn), __copyAttribs($));

// 3d versions

export const __transformPoints3 = (pts: ReadonlyVec[], mat: ReadonlyMat) =>
    __transformPoints(pts, mat, <any>mulV344);

export const __transformedPoints3 = (pts: ReadonlyVec[], mat: ReadonlyMat) =>
    __transformedPoints(pts, mat, <any>mulV344);

export const __transformedPointsWith3 = (
    pts: ReadonlyVec[],
    fn: Fn<ReadonlyVec, ReadonlyMat>
) => __transformedPointsWith(pts, fn, <any>mulV344);

export const __transformedShape3 =
    (ctor: PCLikeConstructor) => ($: PCLike, mat: ReadonlyMat) =>
        new ctor(__transformedPoints3($.points, mat), __copyAttribs($));

export const __transformedShapePoints3 =
    (ctor: PCLikeConstructor) =>
    ($: PCLike, fn: Fn<ReadonlyVec, ReadonlyMat>) =>
        new ctor(__transformedPointsWith3($.points, fn), __copyAttribs($));
