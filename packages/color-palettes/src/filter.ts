import { isPrimitive } from "@thi.ng/checks/is-primitive";
import { distEucledian3, distLch } from "@thi.ng/color/distance";
import { hsv } from "@thi.ng/color/hsv/hsv";
import { hue as $hue } from "@thi.ng/color/hue";
import { lch, type LCH } from "@thi.ng/color/lch/lch";
import { luminance } from "@thi.ng/color/luminance";
import { srgb, type SRGB } from "@thi.ng/color/srgb/srgb";
import type {
	ColorPredicate,
	Theme,
	ThemeColor,
	ThemePredicate,
} from "./api.js";

/**
 * Higher order theme filter. Takes a predicate function which will be applied
 * to a single {@link ThemeColor}. Returns a new function which accepts a single
 * {@link Theme} and returns true iff the given predicate succeeds for at least
 * `threshold` colors in the theme (all colors by default).
 *
 * @param pred
 * @param threshold
 */
export const defFilter =
	(pred: ColorPredicate, threshold?: number): ThemePredicate =>
	(theme) => {
		const $thresh = threshold ?? theme.length;
		for (let i = theme.length, n = 0; i-- > 0; ) {
			if (pred(theme[i])) {
				if (++n >= $thresh) return true;
			}
		}
		return false;
	};

/**
 * Higher order theme filter. Takes a number of theme predicate (e.g. those
 * provided by this package) and composes them into a new predicate function
 * which only succeeds if *all* given predicates pass.
 *
 * @example
 * ```ts
 * import { compFilter, chroma, luma, cssThemes } from "@thi.ng/color-palettes";
 *
 * // pre-compose combined query filter
 * const pastels = compFilter(
 *   // require all theme colors to have max 25% chroma
 *   chroma(0, 0.25),
 *   // require at least 3 theme colors to have min 50% luma
 *   luma(0.5, 1, 3)
 * );
 *
 * [...cssThemes(pastels)]
 * // [
 * //   [ '#453f38', '#746b5d', '#b39777', '#c1c2b2', '#e3dccf', '#f1ede7' ],
 * //   [ '#857b84', '#b1a7b0', '#d0c7d0', '#e7e0e8', '#faeceb', '#e4e9fa' ]
 * // ]
 * ```
 *
 * @param filters
= */
export const compFilter = (...filters: ThemePredicate[]): ThemePredicate =>
	filters.length > 1
		? (theme) => filters.every((f) => f(theme))
		: (theme) => filters[0](theme);

/**
 * Theme predicate which ensures colors are within the given normalized hue
 * range ([0..1] interval). See {@link defFilter} for more details.
 *
 * @remarks
 * Since LCH uses different hue values than the more familiar HSV/HSL color
 * wheel, LCH colors too will be first converted to HSV to ensure uniform
 * results.
 *
 * If `max < min`, the filter will consider hues in both the `[min..1] and
 * [0..max]` intervals (i.e. angular wraparound on color wheel).
 *
 * @param min
 * @param max
 * @param threshold
 */
export const hue = (min: number, max: number, threshold?: number) =>
	defFilter((col) => {
		let h = $hue(isPrimitive(col) ? hsv(col) : col);
		h = h - Math.floor(h);
		return min <= max ? h >= min && h <= max : h >= min || h <= max;
	}, threshold);

/**
 * Theme predicate which ensures colors are within the given normalized chroma
 * range ([0..1] interval). See {@link defFilter} for more details.
 *
 * @remarks
 * Internally converts colors to LCH (unless already the case).
 *
 * @param min
 * @param max
 * @param threshold
 */
export const chroma = (min: number, max: number, threshold?: number) =>
	defFilter((col) => {
		const sat = __isLCH(col) ? col[1] : lch(col)[1];
		return sat >= min && sat <= max;
	}, threshold);

/**
 * Theme predicate which ensures colors are within the given normalized
 * luminance range ([0..1] interval). See {@link defFilter} for more details.
 *
 * @param min
 * @param max
 * @param threshold
 */
export const luma = (min: number, max: number, threshold?: number) =>
	defFilter((col) => {
		const l = luminance(col);
		return l >= min && l <= max;
	}, threshold);

/**
 * Theme predicate which ensures colors are within the given normalized distance
 * in LCH space.
 *
 * @remarks
 * Internally converts colors to LCH (unless already the case).
 *
 * See {@link defFilter} &
 * [`distLch()`](https://docs.thi.ng/umbrella/color/functions/distLch.html) for
 * more details.
 *
 * @param min
 * @param max
 * @param threshold
 */
export const proximityLCH = (
	color: ThemeColor,
	eps: number,
	threshold?: number
) => {
	const $color = __isLCH(color) ? color : lch(color);
	return defFilter(
		(x) => distLch($color, __isLCH(x) ? x : lch(x)) < eps,
		threshold
	);
};

/**
 * Theme predicate which ensures colors are within the given normalized distance
 * in RGB space.
 *
 * @remarks
 * Internally converts colors to sRGB (unless already the case).
 *
 * See {@link defFilter} &
 * [`distEucledian3()`](https://docs.thi.ng/umbrella/color/functions/distEucledian3.html)
 * for more details.
 *
 * @param min
 * @param max
 * @param threshold
 */
export const proximityRGB = (
	color: ThemeColor,
	eps: number,
	threshold?: number
) => {
	const $color = __isRGB(color) ? color : srgb(color);
	return defFilter(
		(x) => distEucledian3($color, __isRGB(x) ? x : srgb(x)) < eps,
		threshold
	);
};

/** @internal */
const __isLCH = (x: ThemeColor): x is LCH =>
	!isPrimitive(x) && x.mode === "lch";

/** @internal */
const __isRGB = (x: ThemeColor): x is SRGB =>
	!isPrimitive(x) && x.mode === "srgb";
