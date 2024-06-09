import type { ICopy, IToHiccup } from "@thi.ng/api";
import * as isec from "@thi.ng/geom-isec/api";
import * as sample from "@thi.ng/geom-resample/api";
import type * as sdc from "@thi.ng/geom-subdiv-curve";
import type * as tess from "@thi.ng/geom-tessellate";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";

export type IntersectionResult = isec.IntersectionResult;
export const IntersectionType = isec.IntersectionType;

export const NONE = isec.NONE;

/**
 * Sets number of default samples for all operations involving shape sampling
 * (e.g. {@link vertices}, {@link asPolygon}, {@link asPolyline}).
 *
 * @param num
 */
export const setDefaultSamples = sample.setDefaultSamples;

export type SamplingOpts = sample.SamplingOpts;
export type SubdivKernel = sdc.SubdivKernel;
export type Tessellator = tess.Tessellator;
export type Tessellation = tess.Tessellation;

export interface Attribs {
	/**
	 * Shape resampling options/resolution.
	 */
	__samples?: Partial<SamplingOpts> | number;
	/**
	 * Control attribute to define the number of fractional digits for numeric
	 * values in the serialized SVG string.
	 *
	 * @defaultValue 3
	 */
	__prec?: number;
	/**
	 * 2D rotation angle (in radians)
	 */
	rotate?: number;
	/**
	 * 3D X rotation angle (in radians)
	 */
	rotateX?: number;
	/**
	 * 3D Y rotation angle (in radians)
	 */
	rotateY?: number;
	/**
	 * 3D Z rotation angle (in radians)
	 */
	rotateZ?: number;
	/**
	 * Uniform or non-uniform scale factor.
	 */
	scale?: number | ReadonlyVec;
	/**
	 * Translation offset.
	 */
	translate?: ReadonlyVec;
	/**
	 * Transformation matrix (2x3 for 2D, 4x4 for 3D).
	 */
	transform?: ReadonlyVec;
	/**
	 * Fill color
	 */
	fill?: any;
	/**
	 * Stroke color
	 */
	stroke?: any;
	/**
	 * Stroke weight
	 */
	weight?: number;
	[id: string]: any;
}

export interface GroupAttribs extends Attribs {
	/**
	 * Currently only used by thi.ng/hiccup-canvas. Canvas background color,
	 * should only should be used for a root group.
	 */
	__background?: any;
	/**
	 * Only used by thi.ng/hiccup-canvas. Force clearing of the canvas before
	 * drawing. Takes priority over {@link GroupAttribs.__background} and should
	 * only should be used for a root group.
	 *
	 * @defaultValue false
	 */
	__clear?: boolean;
	/**
	 * Only used for SVG serialization. Inkscape payer name
	 */
	__inkscapeLayer?: string;
}

export interface IAttributed<T> {
	attribs?: Attribs;

	withAttribs(attribs: Attribs): T;
}

export interface IShape<T extends IShape = IShape<any>>
	extends IAttributed<T>,
		ICopy<T> {
	readonly type: number | string;
	readonly dim: number;
}

export type IShape2<T extends IShape2 = IShape2<any>> = IShape<T> & {
	readonly dim: 2;
};

export type IShape3<T extends IShape3 = IShape3<any>> = IShape<T> & {
	readonly dim: 3;
};

export interface AABBLike extends IShape<AABBLike> {
	pos: Vec;
	size: Vec;

	max(): Vec;
	offset(x: number): this;
}

export interface SphereLike extends IShape<SphereLike> {
	pos: Vec;
	r: number;
}

export interface PCLike extends IShape<PCLike> {
	points: Vec[];
}

export interface PCLikeConstructor<T extends PCLike = PCLike> {
	new (pts: Vec[], attribs?: Attribs): T;
}

export interface IHiccupShape extends IShape, IToHiccup {}

export type IHiccupShape2<T extends IHiccupShape2 = IHiccupShape2<any>> =
	IHiccupShape & IShape2<T>;

export type IHiccupShape3<T extends IHiccupShape3 = IHiccupShape3<any>> =
	IHiccupShape & IShape3<T>;

export type SegmentType2 =
	| "m" // move
	| "l" // line
	| "p" // polyline
	| "a" // arc
	| "c" // cubic
	| "q" // quadratic
	| "z"; // close

/**
 * Currently no 3D arc segments supported
 */
export type SegmentType3 = Exclude<SegmentType2, "a">;

export type PathSegment = PathSegment2 | PathSegment3;

export interface PathSegment2 {
	type: SegmentType2;
	point?: Vec;
	geo?: IShape2 & IHiccupPathSegment;
}

export interface PathSegment3 {
	type: SegmentType3;
	point?: Vec;
	geo?: IShape3 & IHiccupPathSegment;
}

export interface IHiccupPathSegment {
	toHiccupPathSegments(): HiccupPathSegment[];
}

export type HiccupPathSegment = [string, ...any[]];

export interface CubicOpts {
	/**
	 * Controls behavior of curve conversion/interpolation:
	 *
	 * - `default`: Original vertices are used control points (see
	 *   [`closedCubicFromControlPoints()`](https://docs.thi.ng/umbrella/geom-splines/functions/closedCubicFromControlPoints.html))
	 * - `break`: Original vertices are used as curve points, tangents are
	 *   computed automatically (see
	 *   [`closedCubicFromBreakPoints()`](https://docs.thi.ng/umbrella/geom-splines/functions/closedCubicFromBreakPoints.html))
	 * - `hobby`: Use John Hobby's interpolation algorithm (see
	 *   [`cubicHobby2()`](https://docs.thi.ng/umbrella/geom-splines/functions/cubicHobby2.html))
	 */
	mode: "default" | "break" | "hobby";
	/**
	 * True, to enable uniform tangent scaling. If false (default), each
	 * tangent will be also scaled by the length of its related parent
	 * edge in the source shape.
	 *
	 * @remarks
	 * Unused for `hobby` mode.
	 */
	uniform: boolean;
	/**
	 * Tangent scale factor. Actual length in uniform scaling mode.
	 */
	scale: number;
}
