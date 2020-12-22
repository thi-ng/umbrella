import type { IObjectOf } from "@thi.ng/api";
import { defmulti, Implementation2 } from "@thi.ng/defmulti";
import { IHiccupShape, IShape, PathSegment, Type } from "@thi.ng/geom-api";
import { mulV, ReadonlyMat } from "@thi.ng/matrices";
import { map } from "@thi.ng/transducers";
import { Cubic } from "../api/cubic";
import { Group } from "../api/group";
import { Line } from "../api/line";
import { Path } from "../api/path";
import { Points, Points3 } from "../api/points";
import { Polygon } from "../api/polygon";
import { Polyline } from "../api/polyline";
import { Quad } from "../api/quad";
import { Quadratic } from "../api/quadratic";
import type { Rect } from "../api/rect";
import { Text } from "../api/text";
import { Triangle } from "../api/triangle";
import { copyAttribs } from "../internal/copy-attribs";
import { dispatch } from "../internal/dispatch";
import {
    transformedShape as tx,
    transformedShape3 as tx3,
} from "../internal/transform-points";
import { asPath } from "./as-path";
import { asPolygon } from "./as-polygon";

/**
 * Transforms given shape with provided matrix. Some shape types will be
 * automatically converted to other types prior to transformation because they
 * cannot be reliably represented in their original type anymore, this
 * includes:
 *
 * - Arc => Path (cubics)
 * - Circle => Path (cubics)
 * - Ellipse => Path (cubics)
 * - Rect => Polygon
 */
export const transform = defmulti<IShape, ReadonlyMat, IShape>(dispatch);

transform.addAll(<IObjectOf<Implementation2<unknown, ReadonlyMat, IShape>>>{
    [Type.ARC]: ($: IShape, mat) => transform(asPath($), mat),

    [Type.CUBIC]: tx(Cubic),

    [Type.GROUP]: ($: Group, mat) =>
        new Group(
            copyAttribs($),
            $.children.map((x) => <IHiccupShape>transform(x, mat))
        ),

    [Type.LINE]: tx(Line),

    [Type.PATH]: ($: Path, mat) =>
        new Path(
            [
                ...map(
                    (s) =>
                        s.type === "m"
                            ? <PathSegment>{
                                  type: s.type,
                                  point: mulV([], mat, s.point!),
                              }
                            : <PathSegment>{
                                  type: s.type,
                                  geo: transform(s.geo!, mat),
                              },
                    $.segments
                ),
            ],
            copyAttribs($)
        ),

    [Type.POINTS]: tx(Points),

    [Type.POINTS3]: tx3(Points3),

    [Type.POLYGON]: tx(Polygon),

    [Type.POLYLINE]: tx(Polyline),

    [Type.QUAD]: tx(Quad),

    [Type.QUADRATIC]: tx(Quadratic),

    [Type.RECT]: ($: Rect, mat) => transform(asPolygon($), mat),

    [Type.TEXT]: ($: Text, mat) =>
        new Text(mulV([], mat, $.pos!), $.body, copyAttribs($)),

    [Type.TRIANGLE]: tx(Triangle),
});

transform.isa(Type.CIRCLE, Type.ARC);
transform.isa(Type.ELLIPSE, Type.CIRCLE);
