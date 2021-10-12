import type { MultiFn2 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IHiccupShape, IShape } from "@thi.ng/geom-api";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { add2, add3 } from "@thi.ng/vectors/add";
import { set2, set3 } from "@thi.ng/vectors/set";
import { AABB } from "./api/aabb";
import type { Arc } from "./api/arc";
import { Circle } from "./api/circle";
import { Cubic } from "./api/cubic";
import { Ellipse } from "./api/ellipse";
import type { Group } from "./api/group";
import { Line } from "./api/line";
import { Path } from "./api/path";
import { Points, Points3 } from "./api/points";
import { Polygon } from "./api/polygon";
import { Polyline } from "./api/polyline";
import { Quad } from "./api/quad";
import { Quadratic } from "./api/quadratic";
import { Ray } from "./api/ray";
import { Rect } from "./api/rect";
import { Sphere } from "./api/sphere";
import { Text } from "./api/text";
import { Triangle } from "./api/triangle";
import { __copyAttribs } from "./internal/copy";
import { __dispatch } from "./internal/dispatch";
import { __translatedShape as tx } from "./internal/translate";

export const translate: MultiFn2<IShape, ReadonlyVec, IShape> = defmulti<
    any,
    ReadonlyVec,
    IShape
>(
    __dispatch,
    {},
    {
        aabb: ($: AABB, delta) =>
            new AABB(
                add3([], $.pos, delta),
                set3([], $.size),
                __copyAttribs($)
            ),

        arc: ($: Arc, delta) => {
            const a = $.copy();
            add2(null, a.pos, delta);
            return a;
        },

        circle: ($: Circle, delta) =>
            new Circle(add2([], $.pos, delta), $.r, __copyAttribs($)),

        cubic: tx(Cubic),

        ellipse: ($: Ellipse, delta) =>
            new Ellipse(
                add2([], $.pos, delta),
                set2([], $.r),
                __copyAttribs($)
            ),

        group: ($: Group, delta) =>
            $.copyTransformed((x) => <IHiccupShape>translate(x, delta)),

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
                __copyAttribs($)
            ),

        points: tx(Points),

        points3: tx(Points3),

        poly: tx(Polygon),

        polyline: tx(Polyline),

        quad: tx(Quad),

        quadratic: tx(Quadratic),

        ray: ($: Ray, delta) =>
            new Ray(add2([], $.pos, delta), $.dir, __copyAttribs($)),

        rect: ($: Rect, delta) =>
            new Rect(
                add2([], $.pos, delta),
                set2([], $.size),
                __copyAttribs($)
            ),

        sphere: ($: Sphere, delta) =>
            new Sphere(add3([], $.pos, delta), $.r, __copyAttribs($)),

        text: ($: Text, delta) =>
            new Text(add2([], $.pos, delta), $.body, __copyAttribs($)),

        tri: tx(Triangle),
    }
);
