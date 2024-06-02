import type { ICopy, IToHiccup } from "@thi.ng/api";
import type { ReadonlyVec, Vec } from "@thi.ng/vectors";
import type { SamplingOpts } from "./sample.js";

export interface Attribs {
	__samples?: SamplingOpts | number;
	rotate?: number;
	rotateX?: number;
	rotateY?: number;
	rotateZ?: number;
	scale?: number | ReadonlyVec;
	translate?: ReadonlyVec;
	transform?: ReadonlyVec;
	fill?: any;
	stroke?: any;
	weight?: number;
	[id: string]: any;
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
