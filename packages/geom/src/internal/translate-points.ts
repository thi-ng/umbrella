import { add, ReadonlyVec } from "@thi.ng/vectors";
import { copyAttribs } from "./copy-attribs";
import type { PCLike, PCLikeConstructor } from "@thi.ng/geom-api";

export const translatedPoints = (pts: ReadonlyVec[], delta: ReadonlyVec) =>
    pts.map((x) => add([], x, delta));

export const translatedShape = (ctor: PCLikeConstructor) => (
    $: PCLike,
    delta: ReadonlyVec
) => new ctor(translatedPoints($.points, delta), copyAttribs($));
