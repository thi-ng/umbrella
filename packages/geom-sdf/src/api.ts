import type { Fn } from "@thi.ng/api";
import type { ReadonlyVec } from "@thi.ng/vectors";

/**
 * Signed Distance Field function. Computes distance from given point `p`,
 * optionally taking into account an already computed `minD` min distance (e.g.
 * used for bounds hierarchies). `minD` defaults to positive ∞.
 */
export type SDFn = (p: ReadonlyVec, minD?: number) => number;

export type SDFCombineOp = "union" | "isec" | "diff";

export type FieldCoeff<T = number> = Fn<ReadonlyVec, T>;

/**
 * Options object to customize geometry -> SDF conversions. Given as value to
 * the special `__sdf` shape attribute.
 *
 * @example
 * ```ts
 * const sdf = asSDF(circle(100, { __sdf: { abs: true } }));
 * ```
 */
export interface SDFAttribs {
    /**
     * If true (default: false), only the absolute (unsigned) distance will be
     * used.
     *
     * @defaultValue false
     */
    abs: boolean;
    /**
     * Only used for `groups()`. Specifies the type of operation used for
     * combining child SDFs. If {@link SDFAttribs.smooth} is != zero, smoothed
     * versions of the operators will be used.
     *
     * @defaultValue "union"
     */
    combine: SDFCombineOp;
    /**
     * If true (default: false), the sign of the resulting distance will be
     * flipped. Useful for boolean operations.
     *
     * @defaultValue false
     */
    flip: boolean;
    /**
     * Subtracts given value from actual distance, thereby creating a rounded
     * offsetting effect. If given as function, it will be called with the
     * current SDF query point and the return value will be used as param.
     *
     * @defaultValue 0
     */
    round: number | FieldCoeff;
    /**
     * Coefficient for smooth union, intersection, difference ops (only
     * supported for `group()` shapes). If given as function, it will be called
     * with the current SDF query point and the return value will be used as
     * param. Ignored if zero (default).
     *
     * @defaultValue 0
     */
    smooth: number | FieldCoeff;
}
