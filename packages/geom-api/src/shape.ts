import type { ICopy, IObjectOf, IToHiccup } from "@thi.ng/api";
import type { Vec } from "@thi.ng/vectors";

export type Attribs = IObjectOf<any>;

export interface IShape extends ICopy<IShape> {
    readonly type: number | string;
    attribs?: Attribs;
}

export interface AABBLike extends IShape {
    pos: Vec;
    size: Vec;

    max(): Vec;
    offset(x: number): this;
}

export interface SphereLike extends IShape {
    pos: Vec;
    r: number;
}

export interface IHiccupShape extends IShape, IToHiccup {}

export interface PCLike extends IShape {
    points: Vec[];
}

export interface PCLikeConstructor {
    new (pts: Vec[], attribs: Attribs): PCLike;
}
