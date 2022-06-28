import type { MultiFn2 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IHiccupShape, IShape, PathSegment } from "@thi.ng/geom-api";
import type { ReadonlyMat } from "@thi.ng/matrices";
import { mulV } from "@thi.ng/matrices/mulv";
import { map } from "@thi.ng/transducers/map";
import { Cubic } from "./api/cubic.js";
import type { Group } from "./api/group.js";
import { Line } from "./api/line.js";
import { Path } from "./api/path.js";
import { Points, Points3 } from "./api/points.js";
import { Polygon } from "./api/polygon.js";
import { Polyline } from "./api/polyline.js";
import { Quad } from "./api/quad.js";
import { Quadratic } from "./api/quadratic.js";
import type { Rect } from "./api/rect.js";
import { Text } from "./api/text.js";
import { Triangle } from "./api/triangle.js";
import { asPath } from "./as-path.js";
import { __copyAttribs } from "./internal/copy.js";
import { __dispatch } from "./internal/dispatch.js";
import {
    __transformedShape as tx,
    __transformedShape3 as tx3,
} from "./internal/transform.js";
import { vertices } from "./vertices.js";

/**
 * Transforms given shape with provided matrix.
 *
 * @remarks
 * A 2x3 transform matrix is assumed for 2D shapes and 4x4 matrix for 3D shapes.
 * Some shape types will be automatically converted to other types prior to
 * transformation because they cannot be reliably represented in their original
 * type anymore, this includes:
 *
 * - {@link Arc} => {@link Path} (cubics)
 * - {@link Circle} => {@link Path} (cubics)
 * - {@link Ellipse} => {@link Path} (cubics)
 * - {@link Rect} => {@link Quad}
 *
 * Currently implemented for:
 *
 * - {@link Arc}
 * - {@link Circle}
 * - {@link Cubic}
 * - {@link Ellipse}
 * - {@link Group}
 * - {@link Line}
 * - {@link Path}
 * - {@link Points}
 * - {@link Points3}
 * - {@link Polygon}
 * - {@link Polyline}
 * - {@link Quad}
 * - {@link Quadratic}
 * - {@link Ray}
 * - {@link Rect}
 * - {@link Text}
 * - {@link Triangle}
 *
 * @param shape
 * @param mat
 */
export const transform: MultiFn2<IShape, ReadonlyMat, IShape> = defmulti<
    any,
    ReadonlyMat,
    IShape
>(
    __dispatch,
    {
        circle: "arc",
        ellipse: "circle",
    },
    {
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
                __copyAttribs($)
            ),

        points: tx(Points),

        points3: tx3(Points3),

        poly: tx(Polygon),

        polyline: tx(Polyline),

        quad: tx(Quad),

        quadratic: tx(Quadratic),

        rect: ($: Rect, mat) =>
            transform(new Quad(vertices($), __copyAttribs($)), mat),

        text: ($: Text, mat) =>
            new Text(mulV([], mat, $.pos!), $.body, __copyAttribs($)),

        tri: tx(Triangle),
    }
);
