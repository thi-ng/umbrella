import { defmulti, Implementation2O, MultiFn2O } from "@thi.ng/defmulti";
import { IShape, Type } from "@thi.ng/geom-api";
import { madd, mixBilinear, ReadonlyVec, Vec } from "@thi.ng/vectors";
import { Quad } from "../api/quad";
import { Rect } from "../api/rect";
import { dispatch } from "../internal/dispatch";
import type { IObjectOf } from "@thi.ng/api";

/**
 * Projects given point `uv` (normalized coords) into the target space
 * defined by `shape` and writes result to `out` (or returns new
 * vector). See {@link mapPoint} for reverse operation. Both functions
 * together can be used to warp points from one shape into another.
 *
 * Currently only implemented for these shape types:
 *
 * - AABB
 * - Quad
 * - Rect
 *
 * @param shape - shape to operate on
 * @param uv - point to map in UV space
 * @param out - result
 */
export const unmapPoint: MultiFn2O<IShape, ReadonlyVec, Vec, Vec> = defmulti(
    <any>dispatch
);

unmapPoint.addAll(<IObjectOf<Implementation2O<unknown, ReadonlyVec, Vec, Vec>>>{
    [Type.QUAD]: ({ points }: Quad, uv, out = []) =>
        mixBilinear(
            out,
            points[0],
            points[1],
            points[3],
            points[2],
            uv[0],
            uv[1]
        ),

    [Type.RECT]: ($: Rect, uvw: ReadonlyVec, out = []) =>
        madd(out, $.size, uvw, $.pos),
});

unmapPoint.isa(Type.AABB, Type.RECT);
unmapPoint.isa(Type.QUAD3, Type.QUAD);
