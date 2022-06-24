import type { PCLike, PCLikeConstructor } from "@thi.ng/geom-api";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { rotate } from "@thi.ng/vectors/rotate";
import { __copyAttribs } from "./copy.js";

export const __rotatedPoints = (pts: ReadonlyVec[], delta: number) =>
    pts.map((x) => rotate([], x, delta));

export const __rotatedShape =
    (ctor: PCLikeConstructor) => ($: PCLike, delta: number) =>
        new ctor(__rotatedPoints($.points, delta), __copyAttribs($));
