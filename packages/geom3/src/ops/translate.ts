import { defmulti } from "@thi.ng/defmulti";
import {
    add2,
    add3,
    ReadonlyVec,
    set2,
    set3
} from "@thi.ng/vectors3";
import {
    AABB,
    Circle,
    Ellipse,
    Group,
    HiccupShape,
    IShape,
    Line,
    PCLike,
    PCLikeConstructor,
    Points,
    Polygon,
    Polyline,
    Quad,
    Ray,
    Rect,
    Sphere,
    Triangle,
    Type
} from "../api";
import { dispatch } from "../internal/dispatch";
import { translatedPoints } from "../internal/translate-points";

const tx = (ctor: PCLikeConstructor) =>
    ($: PCLike, mat: ReadonlyVec) =>
        new ctor(translatedPoints($.points, mat), { ...$.attribs });

export const translate = defmulti<IShape, ReadonlyVec, IShape>(dispatch);

translate.addAll({

    [Type.AABB]:
        ($: Rect, delta) =>
            new AABB(
                add3([], $.pos, delta), set3([], $.size),
                { ...$.attribs }
            ),

    [Type.CIRCLE]:
        ($: Circle, delta) =>
            new Circle(
                add2([], $.pos, delta), $.r,
                { ...$.attribs }
            ),

    [Type.ELLIPSE]:
        ($: Ellipse, delta) =>
            new Ellipse(
                add2([], $.pos, delta), set2([], $.r),
                { ...$.attribs }
            ),

    [Type.GROUP]:
        ($: Group, delta) =>
            new Group(
                $.children.map((s) => <HiccupShape>translate(s, delta)),
                { ...$.attribs }
            ),

    [Type.LINE]: tx(Line),

    [Type.POINTS]: tx(Points),

    [Type.POLYGON]: tx(Polygon),

    [Type.POLYLINE]: tx(Polyline),

    [Type.QUAD]: tx(Quad),

    [Type.RAY]:
        ($: Ray, delta) =>
            new Ray(
                add2([], $.pos, delta), $.dir,
                { ...$.attribs }
            ),

    [Type.RECT]:
        ($: Rect, delta) =>
            new Rect(
                add2([], $.pos, delta), set2([], $.size),
                { ...$.attribs }
            ),

    [Type.SPHERE]:
        ($: Sphere, delta) =>
            new Sphere(
                add3([], $.pos, delta), $.r,
                { ...$.attribs }
            ),

    [Type.TRIANGLE]: tx(Triangle),

});
