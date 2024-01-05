import type { Fn } from "@thi.ng/api";
import type { ReadonlyVec } from "@thi.ng/vectors";

/**
 * Signed Distance Field function. Computes distance from given point `p`,
 * optionally taking into account an already computed `minD` min distance (e.g.
 * used for bounding hierarchies). `minD` defaults to positive ∞.
 */
export type SDFn = (p: ReadonlyVec, minD?: number) => number;

export type SDFCombineOp = "union" | "isec" | "diff";

export type FieldCoeff<T = number> = Fn<ReadonlyVec, T>;

/**
 * Modifier options for {@link withSDFModifiers} and basis for
 * {@link SDFAttribs}.
 */
export interface SDFModifiers {
	/**
	 * If true, only the absolute (unsigned) distance will be used. For closed
	 * shapes the default is false, for lines/curves the default is true (since
	 * there's no real interior).
	 *
	 * @remarks
	 * See {@link withSDFModifiers} for order of application.
	 *
	 * @defaultValue false
	 */
	abs: boolean;
	/**
	 * If true (default: false), the sign of the resulting distance will be
	 * flipped. Useful for boolean operations.
	 *
	 * @remarks
	 * See {@link withSDFModifiers} for order of application.
	 *
	 * @defaultValue false
	 */
	flip: boolean;
	/**
	 * Subtracts given value from actual distance, thereby creating an
	 * offsetting effect. If given as function, it will be called with the
	 * current SDF query point and the return value will be used as param.
	 *
	 * @remarks
	 * See {@link withSDFModifiers} for order of application.
	 *
	 * @defaultValue 0
	 */
	offset: number | FieldCoeff;
	/**
	 * If given, the actual distance will be clamped to this value as lower
	 * bound.
	 *
	 * @remarks
	 * See {@link withSDFModifiers} for order of application.
	 *
	 * @defaultValue -Infinity
	 */
	min: number;
	/**
	 * If given, the actual distance will be clamped to this value as upper
	 * bound.
	 *
	 * @remarks
	 * See {@link withSDFModifiers} for order of application.
	 *
	 * @defaultValue Infinity
	 */
	max: number;
}

/**
 * Options object to customize geometry -> SDF conversions. Given as value to
 * the special `__sdf` shape attribute. Also see {@link asSDF},
 * {@link withSDFAttribs}.
 *
 * @example
 * ```ts
 * const sdf = asSDF(circle(100, { __sdf: { abs: true } }));
 * ```
 */
export interface SDFAttribs extends SDFModifiers {
	/**
	 * Advanced usage only. If true (default: false), the SDF will be wrapped
	 * with a bounding box pre-check.
	 *
	 * @remarks
	 * Currently only supported by some shape types and only usable in some
	 * circumstances, hence disabled by default.
	 */
	bounds: boolean;
	/**
	 * Only used for `groups()`. Specifies the type of operation used for
	 * combining child SDFs. If {@link SDFAttribs.smooth} is != zero, smoothed
	 * versions of the operators will be used.
	 *
	 * @defaultValue "union"
	 */
	combine: SDFCombineOp;
	/**
	 * Coefficient for smooth union, intersection, difference ops (only
	 * supported for `group()` shapes). If given as function, it will be called
	 * with the current SDF query point and the return value will be used as
	 * param. Ignored if zero (default).
	 *
	 * @defaultValue 0
	 */
	smooth: number | FieldCoeff;
	/**
	 * Radius coefficient for chamfered union, intersection, difference ops
	 * (only supported for `group()` shapes). If given as function, it will be
	 * called with the current SDF query point and the return value will be used
	 * as param. Ignored if zero (default).
	 *
	 * @defaultValue 0
	 */
	chamfer: number | FieldCoeff;
	/**
	 * Radius coefficient for rounded union, intersection, difference ops (only
	 * supported for `group()` shapes). If given as function, it will be called
	 * with the current SDF query point and the return value will be used as
	 * param. Ignored if zero (default).
	 *
	 * @defaultValue 0
	 */
	round: number | FieldCoeff;
	/**
	 * Coefficient tuple of `[radius, num]` used for stepped union,
	 * intersection, difference ops (only supported for `group()` shapes). If
	 * given as function, it will be called with the current SDF query point and
	 * the return value will be used as param. Ignored if zero (default).
	 */
	steps?: [number, number] | FieldCoeff<[number, number]>;
	/**
	 * If given, this value is used to control the number of samples used for
	 * converting the original geometry to a polygon or polyline. See
	 * {@link asSDF} for more details.
	 */
	samples?: number;
}
