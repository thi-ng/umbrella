import type { PCLike, PCLikeConstructor } from "@thi.ng/geom-api";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { add } from "@thi.ng/vectors/add";
import { copyAttribs } from "./copy-attribs";

export const translatedPoints = (pts: ReadonlyVec[], delta: ReadonlyVec) =>
    pts.map((x) => add([], x, delta));

export const translatedShape =
    (ctor: PCLikeConstructor) => ($: PCLike, delta: ReadonlyVec) =>
        new ctor(translatedPoints($.points, delta), copyAttribs($));
