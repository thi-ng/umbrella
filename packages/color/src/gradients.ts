import type { NumericArray } from "@thi.ng/api";
import { tween } from "@thi.ng/transducers/tween";
import { setS4 } from "@thi.ng/vectors/sets";
import type { TypedColor } from "./api.js";
import type { GradientOpts } from "./api/gradients.js";
import { intArgb32Abgr32 } from "./int/int-int.js";
import { argb32 } from "./int/int.js";
import { mix as $mix } from "./mix.js";

/**
 * Similar to {@link multiCosineGradient}, but using any number of gradient
 * color stops and isn't limited to RGB, but for arbitrary color types. The
 * optional `isABGR` boolean arg can be used to auto-convert resulting colors
 * into packed ARGB (false) or ABGR (true) integers. If that arg is given, an
 * array of numbers will be returned.
 *
 * @remarks
 * See
 * [`tween()`](https://docs.thi.ng/umbrella/transducers/functions/tween.html)
 *
 * @example
 * ```ts tangle:../export/multi-color-gradient.ts
 * import { lch, multiColorGradient, swatchesH } from "@thi.ng/color";
 * import { serialize } from "@thi.ng/hiccup";
 * import { svg } from "@thi.ng/hiccup-svg";
 * import { writeFileSync } from "node:fs";
 *
 * const gradient = multiColorGradient({
 *   num: 100,
 *   // LCH color stops
 *   stops: [
 *     // pink red
 *     [0, lch(0.8, 0.8, 0)],
 *     // green
 *     [1 / 3, lch(0.8, 0.8, 1 / 3)],
 *     // blue
 *     [2 / 3, lch(0.8, 0.8, 2 / 3)],
 *     // gray
 *     [1, lch(0.8, 0, 1)],
 *   ]
 * });
 *
 * // write gradient as SVG swatches
 * writeFileSync(
 *   `lch-multigradient.svg`,
 *   serialize(
 *     svg(
 *       { width: 500, height: 50, __convert: true },
 *       swatchesH(gradient, 5, 50)
 *     )
 *   )
 * );
 * ```
 *
 * @param opts -
 * @param isABGR -
 */
export function multiColorGradient<T extends TypedColor<any>>(
	opts: GradientOpts<T>
): T[];
export function multiColorGradient<T extends TypedColor<any>>(
	opts: GradientOpts<T>,
	isABGR: boolean
): number[];
export function multiColorGradient<T extends TypedColor<any>>(
	opts: GradientOpts<T>,
	isABGR?: boolean
) {
	const cols = [...gradient(opts)];
	if (isABGR === undefined) return cols;
	const rgba = cols.map((x) => argb32(x)[0]);
	return isABGR ? rgba.map(intArgb32Abgr32) : rgba;
}

/**
 * Similar to {@link multiColorGradient}, but writes results into `buffer` from
 * given `offset` and component/element strides. Returns buffer.
 *
 * @remarks
 * Intended use case for this function: 1D texturemap/tonemap generation, e.g.
 * for dataviz etc. Also @see {@link cosineGradientBuffer}.
 *
 * @param opts -
 * @param buffer - target buffer/array
 * @param offset - start index (default: 0)
 * @param cstride - channel stride (default: 1)
 * @param estride - element stride (default: 4)
 */
export const multiColorGradientBuffer = <T extends TypedColor<any>>(
	opts: GradientOpts<T>,
	buffer: NumericArray = [],
	offset = 0,
	cstride = 1,
	estride = 4
) => {
	for (let col of gradient(opts)) {
		setS4(buffer, col, offset, 0, cstride);
		offset += estride;
	}
	return buffer;
};

/** @internal */
const gradient = <T extends TypedColor<any>>({
	num,
	stops,
	easing,
	mix,
}: GradientOpts<T>): Iterable<T> =>
	tween<T, T[], T>({
		num: num - 1,
		stops,
		easing,
		min: 0,
		max: 1,
		init: (a, b) => [a, b],
		mix: mix
			? ([a, b], t) => <T>mix(a.empty(), a, b, t)
			: ([a, b], t) => <T>$mix(a.empty(), a, b, t),
	});
