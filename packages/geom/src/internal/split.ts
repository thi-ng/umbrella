import { splitCubicNearPoint } from "@thi.ng/geom-splines/cubic-split";
import { quadraticSplitNearPoint } from "@thi.ng/geom-splines/quadratic-split";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import { mixN } from "@thi.ng/vectors/mixn";
import type { Attribs, PCLike, PCLikeConstructor } from "../api.js";
import { __pointArraysAsShapes } from "./points-as-shape.js";

export const __splitCubicNear = <T extends PCLike>(
	ctor: PCLikeConstructor<T>,
	p: ReadonlyVec,
	points: ReadonlyVec[],
	attribs?: Attribs
) =>
	__pointArraysAsShapes(
		ctor,
		splitCubicNearPoint(p, points[0], points[1], points[2], points[3]),
		attribs,
		false
	);

export const __splitLineAt = <T extends PCLike>(
	ctor: PCLikeConstructor<T>,
	[a, b]: Vec[],
	t: number,
	attribs?: Attribs
) => {
	const p = mixN([], a, b, t);
	return __pointArraysAsShapes(
		ctor,
		[
			[a, p],
			[p, b],
		],
		attribs
	);
};

export const __splitQuadraticNear = <T extends PCLike>(
	ctor: PCLikeConstructor<T>,
	p: ReadonlyVec,
	points: ReadonlyVec[],
	attribs?: Attribs
) =>
	__pointArraysAsShapes(
		ctor,
		quadraticSplitNearPoint(p, points[0], points[1], points[2]),
		attribs,
		false
	);
