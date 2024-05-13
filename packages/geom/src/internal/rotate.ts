import type { PCLike, PCLikeConstructor } from "@thi.ng/geom-api";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { rotate } from "@thi.ng/vectors/rotate";
import { rotateAroundAxis3 } from "@thi.ng/vectors/rotate-around-axis";
import { __copyAttribs } from "./copy.js";

export const __rotatedPoints = (pts: ReadonlyVec[], theta: number) =>
	pts.map((x) => rotate([], x, theta));

export const __rotatedPoints3 = (
	pts: ReadonlyVec[],
	axis: ReadonlyVec,
	theta: number
) => pts.map((x) => rotateAroundAxis3([], x, axis, theta));

export const __rotatedShape =
	<T extends PCLike>(ctor: PCLikeConstructor<T>) =>
	($: T, theta: number) =>
		<T>new ctor(__rotatedPoints($.points, theta), __copyAttribs($));

export const __rotatedShape3 =
	<T extends PCLike>(ctor: PCLikeConstructor<T>) =>
	($: T, axis: ReadonlyVec, theta: number) =>
		<T>new ctor(__rotatedPoints3($.points, axis, theta), __copyAttribs($));
