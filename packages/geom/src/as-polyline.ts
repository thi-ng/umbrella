import type { MultiFn1O } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape, SamplingOpts } from "@thi.ng/geom-api";
import { set } from "@thi.ng/vectors/set";
import type { Path } from "./api/path.js";
import { Polyline } from "./api/polyline.js";
import { __copyAttribs } from "./internal/copy.js";
import { __dispatch } from "./internal/dispatch.js";
import { vertices } from "./vertices.js";

/**
 * Converts given shape into a {@link Polyline}, optionally using provided
 * {@link @thi.ng/geom-api#SamplingOpts} or number of target vertices.
 *
 * @remarks
 * Currently implemented for:
 *
 * - {@link Arc}
 * - {@link Circle}
 * - {@link Cubic}
 * - {@link Ellipse}
 * - {@link Line}
 * - {@link Path}
 * - {@link Poly}
 * - {@link Polyline}
 * - {@link Quad}
 * - {@link Quadratic}
 * - {@link Rect}
 * - {@link Triangle}
 *
 * @param shape
 * @param opts
 */
export const asPolyline: MultiFn1O<
    IShape,
    number | Partial<SamplingOpts>,
    Polyline
> = defmulti<any, number | Partial<SamplingOpts> | undefined, Polyline>(
    __dispatch,
    {
        arc: "points",
        circle: "poly",
        cubic: "points",
        ellipse: "poly",
        line: "points",
        polyline: "points",
        quad: "poly",
        quadratic: "points",
        rect: "poly",
        tri: "poly",
    },
    {
        points: ($, opts) => new Polyline(vertices($, opts), __copyAttribs($)),

        path: ($: Path, opts) => {
            const pts = vertices($, opts);
            $.closed && pts.push(set([], pts[0]));
            return new Polyline(pts, __copyAttribs($));
        },

        poly: ($, opts) => {
            const pts = vertices($, opts);
            pts.push(set([], pts[0]));
            return new Polyline(pts, __copyAttribs($));
        },
    }
);
