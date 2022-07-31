import { isNumber } from "@thi.ng/checks/is-number";
import type { PCLike, PCLikeConstructor } from "@thi.ng/geom-api";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { mul } from "@thi.ng/vectors/mul";
import { mulN } from "@thi.ng/vectors/muln";
import { __copyAttribs } from "./copy.js";

export const __scaledPoints = (
	pts: ReadonlyVec[],
	delta: number | ReadonlyVec
) =>
	pts.map(
		isNumber(delta) ? (x) => mulN([], x, delta) : (x) => mul([], x, delta)
	);

export const __scaledShape =
	(ctor: PCLikeConstructor) => ($: PCLike, delta: number | ReadonlyVec) =>
		new ctor(__scaledPoints($.points, delta), __copyAttribs($));
