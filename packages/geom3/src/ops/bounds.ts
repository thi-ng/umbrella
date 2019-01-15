import { defmulti } from "@thi.ng/defmulti";
import {
    copy,
    MAX2,
    MIN2,
    mul2,
    mulN2,
    sub2,
    subN2
} from "@thi.ng/vectors3";
import {
    AABBLike,
    Circle,
    Ellipse,
    Group,
    IShape,
    Line,
    PCLike,
    Rect,
    Type
} from "../api";
import { rectFromMinMax } from "../ctors/rect";
import { boundsRaw } from "../internal/bounds";
import { collBounds } from "../internal/coll-bounds";
import { dispatch } from "../internal/dispatch";

export const bounds = defmulti<IShape, AABBLike>(dispatch);

bounds.addAll({

    [Type.CIRCLE]:
        ($: Circle) =>
            new Rect(
                subN2([], $.pos, $.r),
                mulN2(null, [2, 2], $.r)
            ),

    [Type.ELLIPSE]:
        ($: Ellipse) =>
            new Rect(
                sub2([], $.pos, $.r),
                mul2(null, [2, 2], $.r)
            ),

    [Type.GROUP]:
        ($: Group) =>
            new Rect(...collBounds($.children, bounds)),

    [Type.LINE]:
        ({ points }: Line) =>
            rectFromMinMax(points[0], points[1]),

    [Type.POINTS]:
        ($: PCLike) =>
            rectFromMinMax(...boundsRaw($.points, copy(MAX2), copy(MIN2))),

    [Type.RECT]:
        ($: IShape) => <AABBLike>$.copy(),

});

bounds.isa(Type.AABB, Type.RECT);
bounds.isa(Type.POLYGON, Type.POINTS);
bounds.isa(Type.POLYLINE, Type.POINTS);
bounds.isa(Type.TRIANGLE, Type.POINTS);
bounds.isa(Type.QUAD, Type.POINTS);
