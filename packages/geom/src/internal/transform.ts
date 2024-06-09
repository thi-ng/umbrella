// thing:export
import type { Fn, FnU } from "@thi.ng/api";
import type { MatOpMV, ReadonlyMat } from "@thi.ng/matrices";
import { mulV, mulV344 } from "@thi.ng/matrices/mulv";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import type {
	IShape2,
	IShape3,
	PCLike,
	PCLikeConstructor,
	PathSegment,
	PathSegment2,
} from "../api.js";
import { __copyAttribs } from "./copy.js";

/** @internal */
export const __transformPoints = (
	pts: ReadonlyVec[],
	mat: ReadonlyMat,
	op: MatOpMV = mulV
) => (pts.forEach((p) => op(null, mat, p)), pts);

/** @internal */
export const __transformedPoints = (
	pts: ReadonlyVec[],
	mat: ReadonlyMat,
	op: MatOpMV = mulV
) => pts.map((p) => op([], mat, p));

/** @internal */
export const __transformPointsWith = (
	pts: ReadonlyVec[],
	fn: Fn<ReadonlyVec, ReadonlyMat>,
	op: MatOpMV = mulV
) => (pts.forEach((p) => op(null, fn(p), p)!), pts);

/** @internal */
export const __transformedPointsWith = (
	pts: ReadonlyVec[],
	fn: Fn<ReadonlyVec, ReadonlyMat>,
	op: MatOpMV = mulV
) => pts.map((p) => op([], fn(p), p)!);

/** @internal */
export const __transformedShape =
	<T extends PCLike>(ctor: PCLikeConstructor<T>) =>
	($: T, mat: ReadonlyMat) =>
		new ctor(__transformedPoints($.points, mat), __copyAttribs($.attribs));

/** @internal */
export const __transformedShapePoints =
	<T extends PCLike>(ctor: PCLikeConstructor<T>) =>
	($: T, fn: Fn<ReadonlyVec, ReadonlyMat>) =>
		new ctor(
			__transformedPointsWith($.points, fn),
			__copyAttribs($.attribs)
		);

// 3d versions

/** @internal */
export const __transformPoints3 = (pts: ReadonlyVec[], mat: ReadonlyMat) =>
	__transformPoints(pts, mat, <any>mulV344);

/** @internal */
export const __transformedPoints3 = (pts: ReadonlyVec[], mat: ReadonlyMat) =>
	__transformedPoints(pts, mat, <any>mulV344);

/** @internal */
export const __transformedPointsWith3 = (
	pts: ReadonlyVec[],
	fn: Fn<ReadonlyVec, ReadonlyMat>
) => __transformedPointsWith(pts, fn, <any>mulV344);

/** @internal */
export const __transformedShape3 =
	(ctor: PCLikeConstructor) => ($: PCLike, mat: ReadonlyMat) =>
		new ctor(__transformedPoints3($.points, mat), __copyAttribs($.attribs));

/** @internal */
export const __transformedShapePoints3 =
	(ctor: PCLikeConstructor) =>
	($: PCLike, fn: Fn<ReadonlyVec, ReadonlyMat>) =>
		new ctor(
			__transformedPointsWith3($.points, fn),
			__copyAttribs($.attribs)
		);

// path segments

type SegmentShapeMap<T extends PathSegment> = T extends PathSegment2
	? IShape2
	: IShape3;

/** @internal */
export const __segmentTransformer =
	<S extends PathSegment>(
		txGeo: FnU<SegmentShapeMap<S>>,
		txPoint: FnU<Vec>
	) =>
	(segments: S[]) =>
		segments.map(
			(s): S =>
				s.geo
					? <any>{
							type: s.type,
							geo: txGeo(<any>s.geo),
					  }
					: s.point
					? <S>{
							type: s.type,
							point: txPoint(s.point),
					  }
					: <S>{ ...s }
		);
