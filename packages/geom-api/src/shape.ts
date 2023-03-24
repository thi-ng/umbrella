import type { ICopy, IObjectOf, IToHiccup } from "@thi.ng/api";
import type { Vec } from "@thi.ng/vectors";

export type Attribs = IObjectOf<any>;

export interface IAttributed<T> {
	attribs?: Attribs;

	withAttribs(attribs: Attribs): T;
}

export interface IShape<T extends IShape = IShape<any>>
	extends IAttributed<T>,
		ICopy<T> {
	readonly type: number | string;
}

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

export interface PCLikeConstructor {
	new (pts: Vec[], attribs?: Attribs): PCLike;
}

export interface IHiccupShape extends IShape, IToHiccup {}
