import type { PCLike, PCLikeConstructor } from "@thi.ng/geom-api";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { add } from "@thi.ng/vectors/add";
import { __copyAttribs } from "./copy.js";

export const __translatedPoints = (pts: ReadonlyVec[], delta: ReadonlyVec) =>
	pts.map((x) => add([], x, delta));

export const __translatedShape =
	(ctor: PCLikeConstructor) => ($: PCLike, delta: ReadonlyVec) =>
		new ctor(__translatedPoints($.points, delta), __copyAttribs($));
