import type { ICopy, IToHiccup } from "@thi.ng/api";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import type { SamplingOpts } from "./sample.js";

export interface Attribs {
	/**
	 * Shape resampling options/resolution.
	 */
	__samples?: SamplingOpts | number;
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
