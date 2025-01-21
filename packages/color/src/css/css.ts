// SPDX-License-Identifier: Apache-2.0
import type { Fn, Maybe } from "@thi.ng/api";
import { isNumber } from "@thi.ng/checks/is-number";
import { isString } from "@thi.ng/checks/is-string";
import type {
	ColorMode,
	IParsedColor,
	MaybeColor,
	TypedColor,
} from "../api.js";
import { convert } from "../convert.js";
import { hslCss } from "../hsl/hsl-css.js";
import { hsvCss } from "../hsv/hsv-css.js";
import { intArgb32Css } from "../int/int-css.js";
import { intAbgr32Argb32 } from "../int/int-int.js";
import { labCss } from "../lab/lab-css.js";
import { labLabD65_50 } from "../lab/lab-lab.js";
import { lchLab } from "../lab/lab-lch.js";
import { labRgb, labRgbD65 } from "../lab/lab-rgb.js";
import { lchCss } from "../lch/lch-css.js";
import { oklabCss } from "../oklab/oklab-css.js";
import { oklchCss } from "../oklch/oklch-css.js";
import { rgbCss } from "../rgb/rgb-css.js";
import { rgbSrgb } from "../rgb/rgb-srgb.js";
import { srgbCss } from "../srgb/srgb-css.js";

export type CSSConversions = Partial<Record<ColorMode, Fn<any, string>>>;

/**
 * CSS Color Module Level 3 compatible color conversion rules.
 *
 * @remarks
 * Initial default setting for {@link css}. Also see
 * {@link setDefaultCSSConversions} to change default.
 *
 * Reference:
 * - https://www.w3.org/TR/css-color-3/
 */
export const CSS_LEVEL3: CSSConversions = {
	abgr32: (x) => intArgb32Css(intAbgr32Argb32(x[0])),
	argb32: (x) => intArgb32Css(x[0]),
	hsl: hslCss,
	hsv: hsvCss,
	lab50: (src) => srgbCss(rgbSrgb(null, labRgb([], src))),
	lab65: (src) => srgbCss(rgbSrgb(null, labRgbD65([], src))),
	lch: (src) => srgbCss(rgbSrgb(null, labRgb(null, lchLab([], src)))),
	rgb: rgbCss,
	srgb: srgbCss,
};

/**
 * Extended set of direct CSS conversions for use with CSS Color Module Level 4.
 * Based on {@link CSS_LEVEL3} and used for {@link css}.
 *
 * @remarks
 * Use {@link setDefaultCSSConversions} to use as default.
 *
 * Reference:
 * - https://www.w3.org/TR/css-color-4/
 */
export const CSS_LEVEL4: CSSConversions = {
	...CSS_LEVEL3,
	lab50: labCss,
	lab65: (x) => labCss(labLabD65_50([], x)),
	lch: lchCss,
	oklab: oklabCss,
	oklch: oklchCss,
};

/** @internal */
let CSS_DEFAULT = CSS_LEVEL3;

/**
 * Sets the default set of {@link CSSConversions} functions used by {@link css}.
 * The default is {@link CSS_LEVEL3}, but {@link CSS_LEVEL4} is also available
 * and will provide better (direct) support for newer color spaces like
 * {@link lch}, {@link oklab} or {@link oklch}.
 *
 * @param fns
 */
export const setDefaultCSSConversions = (fns: CSSConversions) =>
	(CSS_DEFAULT = fns);

/**
 * Takes a color in one of the following formats and tries to convert it to a
 * CSS string.
 *
 * @remarks
 * The following input formats are supported:
 *
 * - any {@link TypedColor} instance
 * - raw sRGB(A) vector
 * - number (packed 0xaarrggbb int, MUST provide alpha channel)
 * - string (passthrough)
 *
 * If CSS Color Module Level 4 support is desired, pass {@link CSS_LEVEL4} as
 * 2nd argument or call {@link setDefaultCSSConversions}. If no `cssTarget` is
 * given, uses current configured default (initially {@link CSS_LEVEL3}).
 *
 * If no direct conversion route for a given source color mode exists, the color
 * will be first converted to sRGB and serialized as such.
 *
 * @param col - source color
 * @param cssTarget - CSS conversions
 */
export const css = (
	src: Exclude<MaybeColor, IParsedColor>,
	cssTarget: CSSConversions = CSS_DEFAULT
) => {
	let asCss: Maybe<Fn<any, string>>;
	return isString(src)
		? src
		: isNumber(src)
		? intArgb32Css(src)
		: (<TypedColor<any>>src).mode
		? (asCss = cssTarget[(<TypedColor<any>>src).mode])
			? asCss(src)
			: cssTarget.rgb!(
					convert([], src, "rgb", (<TypedColor<any>>src).mode)
			  )
		: srgbCss(src);
};
