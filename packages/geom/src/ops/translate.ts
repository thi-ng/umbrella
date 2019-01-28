import { defmulti } from "@thi.ng/defmulti";
import {
    IHiccupShape,
    IShape,
    PCLike,
    PCLikeConstructor,
    Type
} from "@thi.ng/geom-api";
import {
    add2,
    add3,
    ReadonlyVec,
    set2,
    set3
} from "@thi.ng/vectors";
import {
    AABB,
    Arc,
    Circle,
    Ellipse,
    Group,
    Line,
    Path,
    Points,
    Polygon,
    Polyline,
    Quad,
    Ray,
    Rect,
    Sphere,
    Triangle
} from "../api";
import { dispatch } from "../internal/dispatch";
import { translatedPoints } from "../internal/translate-points";

const tx = (ctor: PCLikeConstructor) =>
    ($: PCLike, mat: ReadonlyVec) =>
        new ctor(translatedPoints($.points, mat), { ...$.attribs });

export const translate = defmulti<IShape, ReadonlyVec, IShape>(dispatch);

translate.addAll({

    [Type.AABB]:
        ($: AABB, delta) =>
            new AABB(
                add3([], $.pos, delta), set3([], $.size),
                { ...$.attribs }
            ),

    [Type.ARC]:
        ($: Arc, delta) => {
            const a = $.copy();
            add2(null, a.pos, delta);
            return a;
        },

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
                { ...$.attribs },
                $.children.map((s) => <IHiccupShape>translate(s, delta))
            ),

    [Type.LINE]: tx(Line),

    [Type.PATH]:
        ($: Path, delta: ReadonlyVec) =>
            new Path(
                $.segments.map((s) =>
                    s.geo ?
                        {
                            type: s.type,
                            geo: <any>translate(s.geo, delta)
                        } :
                        {
                            type: s.type,
                            point: add2([], s.point, delta)
                        }
                ),
                { ...$.attribs }
            ),

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
