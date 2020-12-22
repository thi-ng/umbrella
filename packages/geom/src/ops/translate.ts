import type { IObjectOf } from "@thi.ng/api";
import { defmulti, Implementation2 } from "@thi.ng/defmulti";
import type { IHiccupShape, IShape } from "@thi.ng/geom-api";
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
    aabb: ($: AABB, delta) =>
        new AABB(add3([], $.pos, delta), set3([], $.size), copyAttribs($)),

    arc: ($: Arc, delta) => {
        const a = $.copy();
        add2(null, a.pos, delta);
        return a;
    },

    circle: ($: Circle, delta) =>
        new Circle(add2([], $.pos, delta), $.r, copyAttribs($)),

    cubic: tx(Cubic),

    ellipse: ($: Ellipse, delta) =>
        new Ellipse(add2([], $.pos, delta), set2([], $.r), copyAttribs($)),

    group: ($: Group, delta) =>
        new Group(
            copyAttribs($),
            $.children.map((s) => <IHiccupShape>translate(s, delta))
        ),

    line: tx(Line),

    path: ($: Path, delta: ReadonlyVec) =>
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

    points: tx(Points),

    points3: tx(Points3),

    poly: tx(Polygon),

    polyline: tx(Polyline),

    quad: tx(Quad),

    quadratic: tx(Quadratic),

    ray: ($: Ray, delta) =>
        new Ray(add2([], $.pos, delta), $.dir, copyAttribs($)),

    rect: ($: Rect, delta) =>
        new Rect(add2([], $.pos, delta), set2([], $.size), copyAttribs($)),

    sphere: ($: Sphere, delta) =>
        new Sphere(add3([], $.pos, delta), $.r, copyAttribs($)),

    text: ($: Text, delta) =>
        new Text(add2([], $.pos, delta), $.body, copyAttribs($)),

    tri: tx(Triangle),
});
