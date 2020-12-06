import type { IObjectOf } from "@thi.ng/api";
import { defmulti, Implementation2 } from "@thi.ng/defmulti";
import { IHiccupShape, IShape, Type } from "@thi.ng/geom-api";
import { add2, add3, ReadonlyVec, set2, set3 } from "@thi.ng/vectors";
import { AABB } from "../api/aabb";
import type { Arc } from "../api/arc";
import { Circle } from "../api/circle";
import { Cubic } from "../api/cubic";
import { Ellipse } from "../api/ellipse";
import { Group } from "../api/group";
import { Line } from "../api/line";
import { Path } from "../api/path";
import { Points, Points3 } from "../api/points";
import { Polygon } from "../api/polygon";
import { Polyline } from "../api/polyline";
import { Quad } from "../api/quad";
import { Quadratic } from "../api/quadratic";
import { Ray } from "../api/ray";
import { Rect } from "../api/rect";
import { Sphere } from "../api/sphere";
import { Text } from "../api/text";
import { Triangle } from "../api/triangle";
import { copyAttribs } from "../internal/copy-attribs";
import { dispatch } from "../internal/dispatch";
import { translatedShape as tx } from "../internal/translate-points";

export const translate = defmulti<IShape, ReadonlyVec, IShape>(dispatch);

translate.addAll(<IObjectOf<Implementation2<unknown, ReadonlyVec, IShape>>>{
    [Type.AABB]: ($: AABB, delta) =>
        new AABB(add3([], $.pos, delta), set3([], $.size), copyAttribs($)),

    [Type.ARC]: ($: Arc, delta) => {
        const a = $.copy();
        add2(null, a.pos, delta);
        return a;
    },

    [Type.CIRCLE]: ($: Circle, delta) =>
        new Circle(add2([], $.pos, delta), $.r, copyAttribs($)),

    [Type.CUBIC]: tx(Cubic),

    [Type.ELLIPSE]: ($: Ellipse, delta) =>
        new Ellipse(add2([], $.pos, delta), set2([], $.r), copyAttribs($)),

    [Type.GROUP]: ($: Group, delta) =>
        new Group(
            copyAttribs($),
            $.children.map((s) => <IHiccupShape>translate(s, delta))
        ),

    [Type.LINE]: tx(Line),

    [Type.PATH]: ($: Path, delta: ReadonlyVec) =>
        new Path(
            $.segments.map((s) =>
                s.geo
                    ? {
                          type: s.type,
                          geo: <any>translate(s.geo, delta),
                      }
                    : {
                          type: s.type,
                          point: add2([], s.point!, delta),
                      }
            ),
            copyAttribs($)
        ),

    [Type.POINTS]: tx(Points),

    [Type.POINTS3]: tx(Points3),

    [Type.POLYGON]: tx(Polygon),

    [Type.POLYLINE]: tx(Polyline),

    [Type.QUAD]: tx(Quad),

    [Type.QUADRATIC]: tx(Quadratic),

    [Type.RAY]: ($: Ray, delta) =>
        new Ray(add2([], $.pos, delta), $.dir, copyAttribs($)),

    [Type.RECT]: ($: Rect, delta) =>
        new Rect(add2([], $.pos, delta), set2([], $.size), copyAttribs($)),

    [Type.SPHERE]: ($: Sphere, delta) =>
        new Sphere(add3([], $.pos, delta), $.r, copyAttribs($)),

    [Type.TEXT]: ($: Text, delta) =>
        new Text(add2([], $.pos, delta), $.body, copyAttribs($)),

    [Type.TRIANGLE]: tx(Triangle),
});
