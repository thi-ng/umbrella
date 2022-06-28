import type { MultiFn1 } from "@thi.ng/defmulti";
import { DEFAULT, defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape, PCLike } from "@thi.ng/geom-api";
import { neg } from "@thi.ng/vectors/neg";
import type { Arc } from "./api/arc.js";
import type { Group } from "./api/group.js";
import type { Path } from "./api/path.js";
import type { Ray } from "./api/ray.js";
import { __dispatch } from "./internal/dispatch.js";

/**
 * Reverses vertex ordering or general direction (e.g. for {@link Ray}) of given
 * shape.
 *
 * @remarks
 * Currently implemented for:
 *
 * - {@link Arc}
 * - {@link Cubic}
 * - {@link Group} (only eligible shapes)
 * - {@link Line}
 * - {@link Path}
 * - {@link Points}
 * - {@link Points3}
 * - {@link Polygon}
 * - {@link Polyline}
 * - {@link Quad}
 * - {@link Quadratic}
 * - {@link Ray}
 * - {@link Triangle}
 *
 * @param shape
 */
export const flip: MultiFn1<IShape, IShape> = defmulti<any, IShape>(
    __dispatch,
    {
        cubic: "points",
        line: "points",
        points3: "points",
        poly: "points",
        polyline: "points",
        quad: "points",
        quadratic: "points",
        tri: "points",
    },
    {
        [DEFAULT]: (x: IShape) => x,

        arc: ($: Arc) => {
            const t = $.start;
            $.start = $.end;
            $.end = t;
            $.cw = !$.cw;
            return $;
        },

        group: ($: Group) => {
            $.children.forEach(flip);
            return $;
        },

        path: ($: Path) => {
            // TODO
            return $;
        },

        points: ($: PCLike) => {
            $.points.reverse();
            return $;
        },

        ray: ($: Ray) => {
            $.dir = neg(null, $.dir);
            return $;
        },
    }
);
