import { PCLike, PCLikeConstructor } from "@thi.ng/geom-api";
import { mulV, ReadonlyMat } from "@thi.ng/matrices";
import { ReadonlyVec } from "@thi.ng/vectors";
import { copyAttribs } from "./copy-attribs";

export const transformPoints = (pts: ReadonlyVec[], mat: ReadonlyMat) => (
    pts.forEach((p) => mulV(null, mat, p)), pts
);

export const transformedPoints = (pts: ReadonlyVec[], mat: ReadonlyMat) =>
    pts.map((p) => mulV([], mat, p));

export const transformedShape = (ctor: PCLikeConstructor) => (
    $: PCLike,
    mat: ReadonlyMat
) => new ctor(transformedPoints($.points, mat), copyAttribs($));
