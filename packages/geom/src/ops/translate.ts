import { IObjectOf } from "@thi.ng/api";
import { defmulti, Implementation2 } from "@thi.ng/defmulti";
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
import { AABB } from "../api/aabb";
import { Arc } from "../api/arc";
import { Circle } from "../api/circle";
import { Ellipse } from "../api/ellipse";
import { Group } from "../api/group";
import { Line } from "../api/line";
import { Path } from "../api/path";
import { Points } from "../api/points";
import { Polygon } from "../api/polygon";
import { Polyline } from "../api/polyline";
import { Quad } from "../api/quad";
import { Ray } from "../api/ray";
import { Rect } from "../api/rect";
import { Sphere } from "../api/sphere";
import { Triangle } from "../api/triangle";
import { dispatch } from "../internal/dispatch";
import { translatedPoints } from "../internal/translate-points";

const tx = (ctor: PCLikeConstructor) => ($: PCLike, mat: ReadonlyVec) =>
    new ctor(translatedPoints($.points, mat), { ...$.attribs });

export const translate = defmulti<IShape, ReadonlyVec, IShape>(dispatch);

translate.addAll(<IObjectOf<Implementation2<unknown, ReadonlyVec, IShape>>>{
    [Type.AABB]: ($: AABB, delta) =>
        new AABB(add3([], $.pos, delta), set3([], $.size), { ...$.attribs }),

    [Type.ARC]: ($: Arc, delta) => {
        const a = $.copy();
        add2(null, a.pos, delta);
        return a;
    },

    [Type.CIRCLE]: ($: Circle, delta) =>
        new Circle(add2([], $.pos, delta), $.r, { ...$.attribs }),

    [Type.ELLIPSE]: ($: Ellipse, delta) =>
        new Ellipse(add2([], $.pos, delta), set2([], $.r), { ...$.attribs }),

    [Type.GROUP]: ($: Group, delta) =>
        new Group(
            { ...$.attribs },
            $.children.map((s) => <IHiccupShape>translate(s, delta))
        ),

    [Type.LINE]: tx(Line),

    [Type.PATH]: ($: Path, delta: ReadonlyVec) =>
        new Path(
            $.segments.map((s) =>
                s.geo
                    ? {
                          type: s.type,
                          geo: <any>translate(s.geo, delta)
                      }
                    : {
                          type: s.type,
                          point: add2([], s.point!, delta)
                      }
            ),
            { ...$.attribs }
        ),

    [Type.POINTS]: tx(Points),

    [Type.POLYGON]: tx(Polygon),

    [Type.POLYLINE]: tx(Polyline),

    [Type.QUAD]: tx(Quad),

    [Type.RAY]: ($: Ray, delta) =>
        new Ray(add2([], $.pos, delta), $.dir, { ...$.attribs }),

    [Type.RECT]: ($: Rect, delta) =>
        new Rect(add2([], $.pos, delta), set2([], $.size), { ...$.attribs }),

    [Type.SPHERE]: ($: Sphere, delta) =>
        new Sphere(add3([], $.pos, delta), $.r, { ...$.attribs }),

    [Type.TRIANGLE]: tx(Triangle)
});
