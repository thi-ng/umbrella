import type { MultiFn1O } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape, SamplingOpts } from "@thi.ng/geom-api";
import type { VecPair } from "@thi.ng/vectors";
import type { AABB } from "./api/aabb.js";
import type { Arc } from "./api/arc.js";
import type { BPatch } from "./api/bpatch.js";
import type { Circle } from "./api/circle.js";
import type { Path } from "./api/path.js";
import type { Polygon } from "./api/polygon.js";
import type { Polyline } from "./api/polyline.js";
import type { Rect } from "./api/rect.js";
import { asPolygon } from "./as-polygon.js";
import { asPolyline } from "./as-polyline.js";
import { __dispatch } from "./internal/dispatch.js";
import { __edges } from "./internal/edges.js";
import { vertices } from "./vertices.js";

/**
 * Extracts the edges of given shape's boundary and returns them as an iterable
 * of vector pairs. Some shapes also support
 * {@link @thi.ng/geom-api#SamplingOpts}.
 *
 * @remarks
 * Currently implemented for:
 *
 * - {@link AABB}
 * - {@link Arc}
 * - {@link BPatch}
 * - {@link Circle}
 * - {@link Cubic}
 * - {@link Ellipse}
 * - {@link Line}
 * - {@link Path}
 * - {@link Polygon}
 * - {@link Polyline}
 * - {@link Quad}
 * - {@link Quadratic}
 * - {@link Rect}
 * - {@link Triangle}
 *
 * @param shape
 * @param opts
 */
export const edges: MultiFn1O<
    IShape,
    number | Partial<SamplingOpts>,
    Iterable<VecPair>
> = defmulti<
    any,
    number | Partial<SamplingOpts> | undefined,
    Iterable<VecPair>
>(
    __dispatch,
    {
        cubic: "arc",
        ellipse: "circle",
        line: "polyline",
        quad: "poly",
        quadratic: "arc",
        tri: "poly",
    },
    {
        aabb: ($: AABB) => {
            const [a, b, c, d, e, f, g, h] = vertices($);
            return [
                [a, b],
                [b, c],
                [c, d],
                [d, a], // bottom
                [e, f],
                [f, g],
                [g, h],
                [h, e], // top
                [a, e],
                [b, f], // left
                [c, g],
                [d, h], // right
            ];
        },

        arc: ($: Arc, opts) => __edges(asPolyline($, opts).points, false),

        bpatch: ($: BPatch) => $.edges(),

        circle: ($: Circle, opts) => __edges(asPolygon($, opts).points, true),

        path: ($: Path, opts) => __edges(asPolygon($, opts).points, $.closed),

        poly: ($: Polygon) => __edges($.points, true),

        polyline: ($: Polyline) => __edges($.points),

        rect: ($: Rect) => __edges(vertices($), true),
    }
);
