import type { IObjectOf } from "@thi.ng/api";
import { defmulti, Implementation2 } from "@thi.ng/defmulti";
import type { IHiccupShape, IShape, PathSegment } from "@thi.ng/geom-api";
import { mulV, ReadonlyMat } from "@thi.ng/matrices";
import { map } from "@thi.ng/transducers";
import { Cubic } from "../api/cubic";
import type { Group } from "../api/group";
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
    arc: ($: IShape, mat) => transform(asPath($), mat),

    cubic: tx(Cubic),

    group: ($: Group, mat) =>
        $.copyTransformed((x) => <IHiccupShape>transform(x, mat)),

    line: tx(Line),

    path: ($: Path, mat) =>
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

    points: tx(Points),

    points3: tx3(Points3),

    poly: tx(Polygon),

    polyline: tx(Polyline),

    quad: tx(Quad),

    quadratic: tx(Quadratic),

    rect: ($: Rect, mat) => transform(asPolygon($), mat),

    text: ($: Text, mat) =>
        new Text(mulV([], mat, $.pos!), $.body, copyAttribs($)),

    tri: tx(Triangle),
});

transform.isa("circle", "arc");
transform.isa("ellipse", "circle");
