import type { Fn, Fn2 } from "@thi.ng/api";
import type { MultiFn1 } from "@thi.ng/defmulti";
import { DEFAULT, defmulti } from "@thi.ng/defmulti/defmulti";
import { assert } from "@thi.ng/errors/assert";
import { unsupported } from "@thi.ng/errors/unsupported";
import type {
    Circle,
    Ellipse,
    Group,
    Line,
    Path,
    Points,
    Polygon,
    Polyline,
    Quadratic,
    Rect,
} from "@thi.ng/geom";
import type { Attribs, IShape } from "@thi.ng/geom-api";
import { asPolygon } from "@thi.ng/geom/as-polygon";
import { asPolyline } from "@thi.ng/geom/as-polyline";
import { simplify } from "@thi.ng/geom/simplify";
import { __dispatch } from "@thi.ng/geom/internal/dispatch";
import { add2 } from "@thi.ng/vectors/add";
import { mulN2 } from "@thi.ng/vectors/muln";
import type { FieldCoeff, SDFAttribs, SDFn } from "./api.js";
import {
    chamferDiff,
    chamferIsec,
    chamferUnion,
    diff,
    isec,
    roundDiff,
    roundIsec,
    roundUnion,
    smoothDiff,
    smoothIsec,
    smoothUnion,
    stepDiff,
    stepIsec,
    stepUnion,
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

/** @internal */
interface ParametricOps {
    chamfer: Fn2<number | FieldCoeff, SDFn[], SDFn>;
    round: Fn2<number | FieldCoeff, SDFn[], SDFn>;
    smooth: Fn2<number | FieldCoeff, SDFn[], SDFn>;
    steps: Fn2<[number, number] | FieldCoeff<[number, number]>, SDFn[], SDFn>;
}

/**
 * Takes an {@link @thi.ng/geom-api#IShape} instance (possibly a tree, e.g. via
 * {@link @thi.ng/geom#group}) and converts it into a {@link SDFn}.
 *
 * @remarks
 * Currently supported shape types:
 *
 * - circle
 * - cubic (auto-converted to polyline)
 * - ellipse
 * - group
 * - line
 * - path (auto-converted to polygon/polyline)
 * - points
 * - polygon
 * - polyline
 * - quadratic bezier
 * - rect
 *
 * For shapes which need to be converted to polygons/polylines, the
 * {@link SDFAttribs.samples} attribute can be used to control the resulting
 * number of vertices. If not specified {@link @thi.ng/geom-api#DEFAULT_SAMPLES}
 * will be used (which can be globally set via
 * {@link @thi.ng/geom-api#setDefaultSamples}).
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

        cubic: ($: IShape) =>
            asSDF(
                simplify(
                    asPolyline($, (__sdfAttribs($.attribs) || {}).samples),
                    0
                )
            ),

        ellipse: ($: Ellipse) => ellipse2($.pos, $.r, __sdfAttribs($.attribs)),

        group: ($: Group) => {
            const { attribs, children } = $;
            const attr = { ...DEFAULT_ATTRIBS, ...__sdfAttribs(attribs) };
            __validateAttribs(attr);
            const $children = children.map(asSDF);
            let res: SDFn;
            if ($children.length > 1) {
                switch (attr.combine) {
                    case "diff":
                        res = __selectCombineOp(attr, $children, diff, {
                            chamfer: chamferDiff,
                            round: roundDiff,
                            smooth: smoothDiff,
                            steps: stepDiff,
                        });
                        break;
                    case "isec":
                        res = __selectCombineOp(attr, $children, isec, {
                            chamfer: chamferIsec,
                            round: roundIsec,
                            smooth: smoothIsec,
                            steps: stepIsec,
                        });
                        break;
                    case "union":
                    default: {
                        res = __selectCombineOp(attr, $children, union, {
                            chamfer: chamferUnion,
                            round: roundUnion,
                            smooth: smoothUnion,
                            steps: stepUnion,
                        });
                    }
                }
            } else if ($children.length) {
                res = $children[0];
            } else {
                return attr.flip ? () => -Infinity : () => Infinity;
            }
            return withSDFAttribs(res, attr);
        },

        line: ({ points: [a, b], attribs }: Line) =>
            line2(a, b, __sdfAttribs(attribs)),

        path: ($: Path) => {
            const n = (__sdfAttribs($.attribs) || {}).samples;
            return asSDF(
                simplify($.closed ? asPolygon($, n) : asPolyline($, n), 0)
            );
        },

        points: ($: Points) => points2($.points, __sdfAttribs($.attribs)),

        poly: ($: Polygon) => polygon2($.points, __sdfAttribs($.attribs)),

        polyline: ($: Polyline) => polyline2($.points, __sdfAttribs($.attribs)),

        quadratic: ({ points: [a, b, c], attribs }: Quadratic) =>
            quadratic2(a, b, c, __sdfAttribs(attribs)),

        rect: ({ pos, size, attribs }: Rect) => {
            const s = mulN2([], size, 0.5);
            return box2(add2([], s, pos), s, __sdfAttribs(attribs));
        },
    }
);

/** @internal */
const __sdfAttribs = (attribs?: Attribs): Partial<SDFAttribs> =>
    attribs ? attribs.__sdf : null;

const OPS = <const>["chamfer", "round", "smooth", "steps"];

const __validateAttribs = (attribs: SDFAttribs) =>
    assert(
        OPS.filter((x) => attribs[x]).length < 2,
        "only 1 of these options can be used at once: chamfer, round, smooth"
    );

const __selectCombineOp = (
    attribs: SDFAttribs,
    children: SDFn[],
    op: Fn<SDFn[], SDFn>,
    paramOps: ParametricOps
) => {
    for (let k of OPS) {
        if (attribs[k]) {
            return paramOps[k](<any>attribs[k], children);
        }
    }
    return op(children);
};
