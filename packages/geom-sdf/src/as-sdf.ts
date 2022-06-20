import type { MultiFn1 } from "@thi.ng/defmulti";
import { DEFAULT, defmulti } from "@thi.ng/defmulti/defmulti";
import { unsupported } from "@thi.ng/errors/unsupported";
import type {
    Circle,
    Ellipse,
    Group,
    Line,
    Points,
    Polygon,
    Polyline,
    Quadratic,
    Rect,
} from "@thi.ng/geom";
import type { Attribs, IShape } from "@thi.ng/geom-api";
import { __dispatch } from "@thi.ng/geom/internal/dispatch";
import { maddN2 } from "@thi.ng/vectors/maddn";
import type { SDFAttribs, SDFn } from "./api.js";
import {
    difference,
    intersection,
    smoothDifference,
    smoothIntersection,
    smoothUnion,
    union,
} from "./ops.js";
import {
    box2,
    circle2,
    DEFAULT_ATTRIBS,
    ellipse2,
    line2,
    points2,
    polygon2,
    polyline2,
    quadratic2,
    withSDFAttribs,
} from "./shapes.js";

/**
 * Takes an {@link @thi.ng/geom-api#IShape} instance (possibly a tree, e.g. via
 * {@link @thi.ng/geom#group}) and converts it into a {@link SDFn}.
 *
 * @remarks
 * Currently supported shape types:
 *
 * - circle
 * - ellipse
 * - group
 * - line
 * - points
 * - polygon
 * - polyline
 * - quadratic bezier
 * - rect
 */
export const asSDF: MultiFn1<IShape, SDFn> = defmulti<any, SDFn>(
    __dispatch,
    {
        quad: "poly",
        tri: "poly",
    },
    {
        [DEFAULT]: ($: IShape) => unsupported(`shape type: ${$.type}`),

        circle: ($: Circle) => circle2($.pos, $.r, __sdfAttribs($.attribs)),

        ellipse: ($: Ellipse) => ellipse2($.pos, $.r, __sdfAttribs($.attribs)),

        group: ({ attribs, children }: Group) => {
            const $attribs = { ...DEFAULT_ATTRIBS, ...__sdfAttribs(attribs) };
            const $children = <[SDFn, ...SDFn[]]>children.map(asSDF);
            let res: SDFn;
            if ($children.length > 1) {
                switch ($attribs.combine) {
                    case "diff":
                        res =
                            $attribs.smooth !== 0
                                ? smoothDifference(
                                      $attribs.smooth,
                                      ...$children
                                  )
                                : difference(...$children);
                        break;
                    case "isec":
                        res =
                            $attribs.smooth !== 0
                                ? smoothIntersection(
                                      $attribs.smooth,
                                      ...$children
                                  )
                                : intersection($children);
                        break;
                    case "union":
                    default: {
                        res =
                            $attribs.smooth !== 0
                                ? smoothUnion($attribs.smooth, ...$children)
                                : union($children);
                    }
                }
            } else if ($children.length) {
                res = $children[0];
            } else {
                return $attribs.flip ? () => -Infinity : () => Infinity;
            }
            return withSDFAttribs(res, $attribs);
        },

        line: ({ points: [a, b], attribs }: Line) =>
            line2(a, b, __sdfAttribs(attribs)),

        points: ($: Points) => points2($.points, __sdfAttribs($.attribs)),

        poly: ($: Polygon) => polygon2($.points, __sdfAttribs($.attribs)),

        polyline: ($: Polyline) => polyline2($.points, __sdfAttribs($.attribs)),

        quadratic: ({ points: [a, b, c], attribs }: Quadratic) =>
            quadratic2(a, b, c, __sdfAttribs(attribs)),

        rect: ({ pos, size, attribs }: Rect) =>
            box2(maddN2([], size, 0.5, pos), size, __sdfAttribs(attribs)),
    }
);

/** @internal */
const __sdfAttribs = (attribs?: Attribs): Partial<SDFAttribs> =>
    attribs ? attribs.__sdf : null;
