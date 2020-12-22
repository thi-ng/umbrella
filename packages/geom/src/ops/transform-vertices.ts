import type { Fn, IObjectOf } from "@thi.ng/api";
import { defmulti, Implementation2 } from "@thi.ng/defmulti";
import { IHiccupShape, IShape, PathSegment, Type } from "@thi.ng/geom-api";
import { mulV, ReadonlyMat } from "@thi.ng/matrices";
import { map } from "@thi.ng/transducers";
import type { ReadonlyVec } from "@thi.ng/vectors";
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
import { Triangle } from "../api/triangle";
import { copyAttribs } from "../internal/copy-attribs";
import { dispatch } from "../internal/dispatch";
import {
    transformedShapePoints as tx,
    transformedShapePoints3 as tx3,
} from "../internal/transform-points";
import { asPolygon } from "./as-polygon";
import { asPolyline } from "./as-polyline";

/**
 * Transforms vertices of given shape with provided function, which is
 * being called for each vertex individually and should produce a
 * transformation matrix. Some shape types will be automatically
 * converted to other types prior to transformation because they cannot
 * be reliably represented in their original type anymore, this
 * includes:
 *
 * - Arc => Path (cubics)
 * - Circle => Path (cubics)
 * - Ellipse => Path (cubics)
 * - Rect => Polygon
 */
export const transformVertices = defmulti<
    IShape,
    Fn<ReadonlyVec, ReadonlyMat>,
    IShape
>(dispatch);

transformVertices.addAll(<
    IObjectOf<Implementation2<unknown, Fn<ReadonlyVec, ReadonlyMat>, IShape>>
>{
    [Type.ARC]: ($: IShape, fn) => transformVertices(asPolyline($), fn),

    [Type.CUBIC]: tx(Cubic),

    [Type.GROUP]: ($: Group, fn) =>
        new Group(
            copyAttribs($),
            $.children.map((x) => <IHiccupShape>transformVertices(x, fn))
        ),

    [Type.LINE]: tx(Line),

    [Type.PATH]: ($: Path, fn) =>
        new Path(
            [
                ...map(
                    (s) =>
                        s.type === "m"
                            ? <PathSegment>{
                                  type: s.type,
                                  point: mulV([], fn(s.point!), s.point!),
                              }
                            : <PathSegment>{
                                  type: s.type,
                                  geo: transformVertices(s.geo!, fn),
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

    [Type.RECT]: ($: Rect, fn) => transformVertices(asPolygon($), fn),

    [Type.TRIANGLE]: tx(Triangle),
});

transformVertices.isa(Type.CIRCLE, Type.RECT);
transformVertices.isa(Type.ELLIPSE, Type.CIRCLE);
