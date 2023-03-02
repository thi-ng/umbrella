import type { IDeref } from "@thi.ng/api";
import { rotateRight } from "@thi.ng/binary/rotate";
import { interleave4_12_24, interleave4_16_32 } from "@thi.ng/binary/splat";
import { isString } from "@thi.ng/checks/is-string";
import { assert } from "@thi.ng/errors/assert";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { unsupported } from "@thi.ng/errors/unsupported";
import { TAU } from "@thi.ng/math/api";
import { clamp01 } from "@thi.ng/math/interval";
import { fract } from "@thi.ng/math/prec";
import { IParsedColor, ParsedColor } from "../api.js";
import { INV8BIT } from "../api/constants.js";
import { CSS_NAMES } from "../api/names.js";
import { CSS_SYSTEM_COLORS } from "../api/system.js";
import { intArgb32Srgb } from "../int/int-srgb.js";

/**
 * Attempts to parse given CSS color into an interim {@link ParsedColor} type
 * with {@link srgb}, {@link hsl}, {@link labD50} or {@link lch} color modes.
 * Throws an error if any of the validations during parsing failed.
 *
 * @remarks
 * The following syntax versions are supported:
 *
 * - CSS named colors
 * - CSS system colors @see {@link CSS_SYSTEM_COLORS}
 * - hex3/4/6/8
 * - `rgb(r% g% b% / a%?)`
 * - `rgb(r g b / a?)`
 * - `rgb(r,g,b)`
 * - `rgba(r,g,b,a)`
 * - `hsl(h s% l% / a%?)`
 * - `hsl(h,s%,l%)`
 * - `hsla(h,s%,l%,a)`
 * - `lab(l a b / alpha?)`
 * - `lab(l% a% b% / alpha?)`
 * - `lch(l c h / alpha?)`
 * - `lch(l% c% h / alpha?)`
 * - `oklab(l a b / alpha?)`
 * - `oklab(l% a% b% / alpha?)`
 * - `oklch(l c h / alpha?)`
 * - `oklch(l% c% h / alpha?)`
 *
 * Hue values can be given according to CSS Color L4 spec (raw, deg, rad, grad,
 * turn): https://www.w3.org/TR/css-color-4/#typedef-hue
 *
 * For (ok)lab/(ok)lch color channel values given as percentages, the scale
 * ranges defined in the spec are used:
 * https://www.w3.org/TR/css-color-4/#specifying-lab-lch
 *
 * If no alpha channel is given, it will default to 1.0 (fully opaque).
 *
 * Note that any named or system CSS colors, hex colors and any RGB colors will
 * be returned as sRGB instance. In former versions of this library (pre 3.0.0),
 * there was only a single RGB type with undefined behaviour re: linear or
 * gamma-encoded versions. Since v3.0.0, {@link rgb} is only used for _linear_
 * and {@link srgb} for non-linear (gamma encoded) RGB colors (CSS uses sRGB by
 * default).
 *
 * @param src -
 */
export const parseCss = (src: string | IDeref<string>): IParsedColor => {
	src = (isString(src) ? src : src.deref()).toLowerCase();
	const named = (<any>CSS_NAMES)[src] || (<any>CSS_SYSTEM_COLORS)[src];
	if (named || src[0] === "#")
		return new ParsedColor(
			"srgb",
			intArgb32Srgb([], parseHex(named || src))
		);
	const parts = src.split(/[(),/ ]+/);
	const [mode, a, b, c, d] = parts;
	assert(parts.length === 5 || parts.length === 6, `invalid color: ${src}`);
	switch (mode) {
		case "rgb":
		case "rgba":
			return new ParsedColor("srgb", [
				__numOrPercent(a, 1, INV8BIT, true),
				__numOrPercent(b, 1, INV8BIT, true),
				__numOrPercent(c, 1, INV8BIT, true),
				__alpha(d),
			]);
		case "hsl":
		case "hsla":
			return new ParsedColor("hsl", [
				__hue(a),
				__percent(b),
				__percent(c),
				__alpha(d),
			]);
		case "lab":
			return new ParsedColor("lab50", [
				__numOrPercent(a),
				__numOrPercent(b, 1.25),
				__numOrPercent(c, 1.25),
				__alpha(d),
			]);
		case "lch":
			return new ParsedColor(mode, [
				__numOrPercent(a),
				__numOrPercent(b, 1.5),
				__hue(c),
				__alpha(d),
			]);
		case "oklab":
			return new ParsedColor(mode, [
				__numOrPercent(a, 1, 1),
				__numOrPercent(b, 0.4, 1),
				__numOrPercent(c, 0.4, 1),
				__alpha(d),
			]);
		case "oklch":
			return new ParsedColor(mode, [
				__numOrPercent(a, 1, 1),
				__numOrPercent(b, 0.4, 1),
				__hue(c),
				__alpha(d),
			]);
		default:
			unsupported(`color mode: ${mode}`);
	}
};

/**
 * Scale factors for various CSS angle units
 *
 * @remarks
 * Reference:
 * - https://www.w3.org/TR/css-values-4/#angle-value
 *
 * @internal
 */
const HUE_NORMS: Record<string, number> = {
	rad: TAU,
	grad: 400,
	turn: 1,
	deg: 360,
};

/** @internal */
const __hue = (x: string) => {
	const match = /^(-?[0-9.]+)(deg|rad|grad|turn)?$/.exec(x);
	assert(!!match, `expected hue, got: ${x}`);
	return fract(parseFloat(match![1]) / (HUE_NORMS[match![2]] || 360));
};

/** @internal */
const __alpha = (x?: string) => (x ? __numOrPercent(x, 1, 1, true) : 1);

/** @internal */
const __percent = (x: string, clamp = true) => {
	assert(/^([0-9.]+)%$/.test(x), `expected percentage, got: ${x}`);
	const res = parseFloat(x) / 100;
	return clamp ? clamp01(res) : res;
};

/** @internal */
const __numOrPercent = (
	x: string,
	scalePerc = 1,
	scale = 0.01,
	clamp = false
) => {
	assert(/^-?[0-9.]+%?$/.test(x), `expected number or percentage, got: ${x}`);
	const res = parseFloat(x) * (x.endsWith("%") ? 0.01 * scalePerc : scale);
	return clamp ? clamp01(res) : res;
};

/**
 * Parses a CSS hex color string into an uint32. Throws an error if given string
 * doesn't conform to any of the supported formats.
 *
 * @remarks
 * Supports the following input formats (`#` always optional and each letter a
 * hex digit):
 *
 * - `#rgb`
 * - `#rgba`
 * - `#rrggbb`
 * - `#rrggbbaa`
 *
 * @param src
 */
export const parseHex = (src: string): number => {
	const match = /^#?([0-9a-f]{3,8})$/i.exec(src);
	if (match) {
		const hex = match[1];
		const val = parseInt(hex, 16);
		switch (hex.length) {
			case 3:
				return (interleave4_12_24(val) | 0xff000000) >>> 0;
			case 4:
				return rotateRight(interleave4_16_32(val), 8);
			case 6:
				return (val | 0xff000000) >>> 0;
			case 8:
				return rotateRight(val, 8);
			default:
		}
	}
	return illegalArgs(`invalid hex color: "${src}"`);
};
