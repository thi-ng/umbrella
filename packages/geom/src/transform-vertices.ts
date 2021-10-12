import type { Fn } from "@thi.ng/api";
import type { MultiFn2 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IHiccupShape, IShape, PathSegment } from "@thi.ng/geom-api";
import type { ReadonlyMat } from "@thi.ng/matrices";
import { mulV } from "@thi.ng/matrices/mulv";
import { map } from "@thi.ng/transducers/map";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { Cubic } from "./api/cubic";
import type { Group } from "./api/group";
import { Line } from "./api/line";
import { Path } from "./api/path";
import { Points, Points3 } from "./api/points";
import { Polygon } from "./api/polygon";
import { Polyline } from "./api/polyline";
import { Quad } from "./api/quad";
import { Quadratic } from "./api/quadratic";
import type { Rect } from "./api/rect";
import { Triangle } from "./api/triangle";
import { asPolygon } from "./as-polygon";
import { asPolyline } from "./as-polyline";
import { __copyAttribs } from "./internal/copy";
import { __dispatch } from "./internal/dispatch";
import {
    __transformedShapePoints as tx,
    __transformedShapePoints3 as tx3,
} from "./internal/transform";

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
export const transformVertices: MultiFn2<
    IShape,
    Fn<ReadonlyVec, ReadonlyMat>,
    IShape
> = defmulti<any, Fn<ReadonlyVec, ReadonlyMat>, IShape>(
    __dispatch,
    {
        circle: "rect",
        ellipse: "circle",
    },
    {
        arc: ($: IShape, fn) => transformVertices(asPolyline($), fn),

        cubic: tx(Cubic),

        group: ($: Group, fn) =>
            $.copyTransformed((x) => <IHiccupShape>transformVertices(x, fn)),

        line: tx(Line),

        path: ($: Path, fn) =>
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
                __copyAttribs($)
            ),

        points: tx(Points),

        points3: tx3(Points3),

        poly: tx(Polygon),

        polyline: tx(Polyline),

        quad: tx(Quad),

        quadratic: tx(Quadratic),

        rect: ($: Rect, fn) => transformVertices(asPolygon($), fn),

        tri: tx(Triangle),
    }
);
