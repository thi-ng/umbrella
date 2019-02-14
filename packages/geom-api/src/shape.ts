import { ICopy, IObjectOf, IToHiccup } from "@thi.ng/api";
import { Vec } from "@thi.ng/vectors";

export const enum Type {
    AABB = 1,
    ARC,
    CIRCLE,
    CUBIC,
    CUBIC3,
    ELLIPSE,
    GROUP,
    LINE,
    LINE3,
    PATH,
    POINTS,
    POINTS3,
    POLYGON,
    POLYGON3,
    POLYLINE,
    POLYLINE3,
    QUAD,
    QUAD3,
    QUADRATIC,
    QUADRATIC3,
    RECT,
    SPHERE,
    TRIANGLE,
    TRIANGLE3,
    RAY,
    RAY3,
}

export type Attribs = IObjectOf<any>;

export interface IShape extends
    ICopy<IShape> {

    readonly type: number | string;
    attribs?: Attribs;
}

export interface AABBLike extends IShape {
    pos: Vec;
    size: Vec;

    max(): Vec;
}

export interface SphereLike extends IShape {
    pos: Vec;
    r: number;
}

export interface IHiccupShape extends IShape, IToHiccup {
}

export interface PCLike extends IShape {
    points: Vec[];
}

export interface PCLikeConstructor {
    new(pts: Vec[], attribs: Attribs): PCLike;
}
