import type { MultiFn2O } from "@thi.ng/defmulti";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { IShape } from "@thi.ng/geom-api";
import {
    classifyPointInCircle,
    classifyPointInTriangle2,
} from "@thi.ng/geom-isec/point";
import { sign } from "@thi.ng/math/abs";
import { EPS } from "@thi.ng/math/api";
import type { ReadonlyVec } from "@thi.ng/vectors";
import { dot } from "@thi.ng/vectors/dot";
import type { Circle } from "./api/circle.js";
import type { Plane } from "./api/plane.js";
import type { Triangle } from "./api/triangle.js";
import { __dispatch } from "./internal/dispatch.js";

/**
 * Classifies point `p` with respect to given shape. Returns -1 if `p` is
 * inside, 1 if outside  or 0 if `p` is on the shape boundary (using optional
 * tolerance `eps`, default: 1e-6).
 *
 * @remarks
 * Currently only implemented for:
 *
 * - {@link Circle}
 * - {@link Plane}
 * - {@link Sphere}
 * - {@link Triangle}
 *
 * The {@link @thi.ng/geom-sdf#} package provides a much more comprehensive
 * feature set (incl. support for more shapes) to perform similar checks as this
 * function.
 *
 * Also see {@link pointInside}.
 *
 * @param shape
 * @param p
 * @param eps
 */
export const classifyPoint: MultiFn2O<IShape, ReadonlyVec, number, number> =
    defmulti<any, ReadonlyVec, number | undefined, number>(
        __dispatch,
        { sphere: "circle" },
        {
            circle: ($: Circle, p, eps = EPS) =>
                classifyPointInCircle(p, $.pos, $.r, eps),

            plane: ($: Plane, p, eps) => sign(dot($.normal, p) - $.w, eps),

            tri: ({ points }: Triangle, p: ReadonlyVec, eps = EPS) =>
                classifyPointInTriangle2(
                    p,
                    points[0],
                    points[1],
                    points[2],
                    eps
                ),
        }
    );
