import type { MultiFn1O } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { AABBLike, IShape, PCLike } from "@thi.ng/geom-api";
import { centerOfWeight2 } from "@thi.ng/geom-poly-utils/center-of-weight";
import { centroid as _centroid } from "@thi.ng/geom-poly-utils/centroid";
import type { Vec } from "@thi.ng/vectors";
import { add } from "@thi.ng/vectors/add";
import { addmN } from "@thi.ng/vectors/addmn";
import { maddN } from "@thi.ng/vectors/maddn";
import { mixN } from "@thi.ng/vectors/mixn";
import { mulN } from "@thi.ng/vectors/muln";
import { set } from "@thi.ng/vectors/set";
import type { Circle } from "./api/circle.js";
import type { Group } from "./api/group.js";
import type { Line } from "./api/line.js";
import type { Plane } from "./api/plane.js";
import type { Polygon } from "./api/polygon.js";
import type { Triangle } from "./api/triangle.js";
import { bounds } from "./bounds.js";
import { __dispatch } from "./internal/dispatch.js";

/**
 * Computes centroid of given shape, writes result in optionally provided output
 * vector (or creates new one if omitted).
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
 * - {@link Group}
 * - {@link Line}
 * - {@link Path}
 * - {@link Polygon}
 * - {@link Polyline}
 * - {@link Points}
 * - {@link Points3}
 * - {@link Quad}
 * - {@link Quadratic}
 * - {@link Text} - (no way to compute size, only position & any margin)
 *
 * @param shape
 * @param out
 */
export const centroid: MultiFn1O<IShape, Vec, Vec | undefined> = defmulti<
    any,
    Vec | undefined,
    Vec | undefined
>(
    __dispatch,
    {
        arc: "circle",
        aabb: "rect",
        bpatch: "points",
        ellipse: "circle",
        line3: "line",
        points3: "points",
        polyline: "points",
        quad: "poly",
        sphere: "circle",
        text: "circle",
        tri3: "tri",
    },
    {
        circle: ($: Circle, out?) => set(out || [], $.pos),

        group: ($: Group, out?) => {
            const b = bounds($);
            return b ? centroid(b, out) : undefined;
        },

        line: ({ points }: Line, out?) =>
            mixN(out || [], points[0], points[1], 0.5),

        points: ($: PCLike, out?) => _centroid($.points, out),

        plane: ($: Plane, out?) => mulN(out || [], $.normal, $.w),

        poly: ($: Polygon, out?) => centerOfWeight2($.points, out),

        rect: ($: AABBLike, out?) => maddN(out || [], $.size, 0.5, $.pos),

        tri: ({ points }: Triangle, out?) =>
            addmN(null, add(out || [], points[0], points[1]), points[2], 1 / 3),
    }
);
