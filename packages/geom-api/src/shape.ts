import type { ICopy, IObjectOf, IToHiccup } from "@thi.ng/api";
import type { Vec } from "@thi.ng/vectors";

export enum Type {
    AABB = 1,
    ARC,
    CIRCLE,
    CONE,
    CUBIC,
    CUBIC3,
    CYLINDER,
    ELLIPSE,
    GROUP,
    LINE,
    LINE3,
    PATH,
    PLANE,
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

    TEXT,
    TEXT3,
}

export type Attribs = IObjectOf<any>;

export interface IShape extends ICopy<IShape> {
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

export interface IHiccupShape extends IShape, IToHiccup {}

export interface PCLike extends IShape {
    points: Vec[];
}

export interface PCLikeConstructor {
    new (pts: Vec[], attribs: Attribs): PCLike;
}
