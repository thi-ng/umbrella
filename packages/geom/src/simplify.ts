import { peek } from "@thi.ng/arrays/peek";
import type { MultiFn2 } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape, PathSegment } from "@thi.ng/geom-api";
import { simplify as _simplify } from "@thi.ng/geom-resample/simplify";
import type { Vec } from "@thi.ng/vectors";
import { Path } from "./api/path.js";
import { Polygon } from "./api/polygon.js";
import { Polyline } from "./api/polyline.js";
import { __copyAttribs } from "./internal/copy.js";
import { __dispatch } from "./internal/dispatch.js";
import { vertices } from "./vertices.js";

/**
 * Simplifies given 2D shape boundary using Douglas-Peucker algorithm
 * (implemented by {@link @thi.ng/geom-resample#simplify}) and given `threshold`
 * distance (default: 0, which removes only co-linear vertices).
 *
 * @remarks
 * Currently only implemented for:
 *
 * - {@link Path}
 * - {@link Polygon}
 * - {@link Polyline}
 *
 * Use {@link asPath}, {@link asPolygon} or {@link asPolyline} to convert other
 * shape types first.
 *
 * @param shape
 * @param threshold
 */
export const simplify: MultiFn2<IShape, number, IShape> = defmulti<
    any,
    number,
    IShape
>(
    __dispatch,
    {},
    {
        path: ($: Path, eps = 0) => {
            const res: PathSegment[] = [];
            const orig = $.segments;
            const n = orig.length;
            let points!: Vec[] | null;
            let lastP!: Vec;
            for (let i = 0; i < n; i++) {
                const s = orig[i];
                if (s.type === "l" || s.type === "p") {
                    points = points
                        ? points.concat(vertices(s.geo!))
                        : vertices(s.geo!);
                    lastP = peek(points);
                } else if (points) {
                    points.push(lastP);
                    res.push({
                        geo: new Polyline(_simplify(points, eps)),
                        type: "p",
                    });
                    points = null;
                } else {
                    res.push({ ...s });
                }
            }
            if (points) {
                points.push(lastP);
                res.push({
                    geo: new Polyline(points),
                    type: "p",
                });
            }
            return new Path(res, __copyAttribs($));
        },

        poly: ($: Polygon, eps = 0) =>
            new Polygon(_simplify($.points, eps, true), __copyAttribs($)),

        polyline: ($: Polyline, eps = 0) =>
            new Polyline(_simplify($.points, eps), __copyAttribs($)),
    }
);
