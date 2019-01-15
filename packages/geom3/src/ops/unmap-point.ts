import { defmulti, MultiFn2O } from "@thi.ng/defmulti";
import {
    madd,
    mixBilinear,
    ReadonlyVec,
    Vec
} from "@thi.ng/vectors3";
import {
    IShape,
    Quad,
    Rect,
    Type
} from "../api";
import { dispatch } from "../internal/dispatch";

/**
 * Projects given point `uv` (normalized coords) into the target space
 * defined by `shape` and writes result to `out` (or returns new
 * vector). See `mapPoint` for reverse operation. Both functions
 * together can be used to warp points from one shape into another.
 *
 * Currently only implemented for these shape types:
 *
 * - AABB
 * - Quad
 * - Rect
 *
 * @param shape
 * @param uv
 * @param out
 */
export const unmapPoint: MultiFn2O<IShape, ReadonlyVec, Vec, Vec> = defmulti(dispatch);

unmapPoint.addAll({

    [Type.QUAD]:
        ({ points }: Quad, uv, out = []) =>
            mixBilinear(out, points[0], points[1], points[3], points[2], uv[0], uv[1]),

    [Type.RECT]:
        ($: Rect, uv: ReadonlyVec, out = []) =>
            madd(out, $.pos, $.size, uv),

});

unmapPoint.isa(Type.AABB, Type.RECT);
unmapPoint.isa(Type.QUAD3, Type.QUAD);
