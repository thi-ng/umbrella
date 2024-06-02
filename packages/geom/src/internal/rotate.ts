import type { PCLike, PCLikeConstructor } from "@thi.ng/geom-api";
import { mulV22, mulV33 } from "@thi.ng/matrices/mulv";
import { rotation22 } from "@thi.ng/matrices/rotation";
import { rotationAroundAxis33 } from "@thi.ng/matrices/rotation-around-axis";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { __copyAttribs } from "./copy.js";

export const __rotatedPoints = (pts: ReadonlyVec[], theta: number) => {
	const mat = rotation22([], theta);
	return pts.map((x) => mulV22([], mat, x));
};

export const __rotatedPoints3 = (
	pts: ReadonlyVec[],
	axis: ReadonlyVec,
	theta: number
) => {
	const mat = rotationAroundAxis33([], axis, theta);
	return pts.map((x) => mulV33([], mat, x));
};

export const __rotatedShape =
	<T extends PCLike>(ctor: PCLikeConstructor<T>) =>
	($: T, theta: number) =>
		<T>new ctor(__rotatedPoints($.points, theta), __copyAttribs($.attribs));

export const __rotatedShape3 =
	<T extends PCLike>(ctor: PCLikeConstructor<T>) =>
	($: T, axis: ReadonlyVec, theta: number) =>
		<T>(
			new ctor(
				__rotatedPoints3($.points, axis, theta),
				__copyAttribs($.attribs)
			)
		);
