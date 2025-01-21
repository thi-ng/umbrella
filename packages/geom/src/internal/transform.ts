// SPDX-License-Identifier: Apache-2.0
import type { FnU } from "@thi.ng/api";
import type { MatOpMV, ReadonlyMat } from "@thi.ng/matrices";
import { mulV } from "@thi.ng/matrices/mulv";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import type {
	IShape2,
	IShape3,
	PathSegment,
	PathSegment2,
	TransformVertexFn,
} from "../api.js";

/** @internal */
export const __transformedPoints = (
	pts: ReadonlyVec[],
	mat: ReadonlyMat,
	op: MatOpMV = mulV
) => pts.map((p) => op([], mat, p));

/** @internal */
export const __transformedPointsWith = (
	pts: ReadonlyVec[],
	fn: TransformVertexFn,
	op: MatOpMV = mulV
) => pts.map((p) => op([], fn(p), p)!);

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
