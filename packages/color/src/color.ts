import { isString } from "@thi.ng/checks/is-string";
import type {
	Color,
	ColorFactory,
	ColorMode,
	ParsedColor,
	TypedColor,
} from "./api.js";
import { parseCss } from "./css/parse-css.js";
import { hcy } from "./hcy/hcy.js";
import { hsi } from "./hsi/hsi.js";
import { hsl } from "./hsl/hsl.js";
import { hsv } from "./hsv/hsv.js";
import { argb32, abgr32 } from "./int/int.js";
import { labD50 } from "./lab/lab50.js";
import { labD65 } from "./lab/lab65.js";
import { lch } from "./lch/lch.js";
import { oklab } from "./oklab/oklab.js";
import { oklch } from "./oklch/oklch.js";
import { rgb } from "./rgb/rgb.js";
import { srgb } from "./srgb/srgb.js";
import { xyy } from "./xyy/xyy.js";
import { xyzD50 } from "./xyz/xyz50.js";
import { xyzD65 } from "./xyz/xyz65.js";
import { ycc } from "./ycc/ycc.js";

const FACTORIES: Record<ColorMode, ColorFactory<any>> = {
	argb32,
	abgr32,
	hcy,
	hsi,
	hsl,
	hsv,
	lab50: labD50,
	lab65: labD65,
	lch,
	oklab,
	oklch,
	rgb,
	srgb,
	xyy,
	xyz50: xyzD50,
	xyz65: xyzD65,
	ycc,
};

/**
 * Takes an CSS color string or the result of {@link parseCss} or a
 * {@link ColorMode} and raw buffer and returns a suitable typed color wrapper
 * for it (potentially by first parsing the color).
 *
 * @example
 * ```ts
 * color("springgreen");
 * // $Color [srgb] { offset: 0, stride: 1, buf: [ 0, 1, 0.498, 1 ] }
 *
 * color("#ff0")
 * // $Color [srgb] { offset: 0, stride: 1, buf: [ 1, 1, 0, 1 ] }
 *
 * color("oklch(60% 0.15 50)");
 * // $Color [oklch] { offset: 0, stride: 1, buf: [ 0.6, 0.0015, 0.139, 1 ] }
 *
 * color("hsv", [0.5, 1, 1, 1])
 * // $Color [hsv] { offset: 0, stride: 1, buf: [ 0.5, 1, 1, 1 ] }
 * ```
 *
 * @param src
 */
export function color(src: string): TypedColor<any>;
export function color(
	src: ParsedColor,
	buf?: Color,
	idx?: number,
	stride?: number
): TypedColor<any>;
export function color(
	mode: ColorMode,
	buf: Color,
	idx?: number,
	stride?: number
): TypedColor<any>;
export function color(
	src: any,
	buf?: any,
	idx?: number,
	stride?: number
): TypedColor<any> {
	if (isString(src))
		return buf
			? FACTORIES[<ColorMode>src](buf, idx, stride)
			: color(<ParsedColor>parseCss(src));
	if (buf) {
		const res = FACTORIES[(<ParsedColor>src).mode](buf, idx, stride);
		res.set(src.deref());
		return res;
	}
	return FACTORIES[(<ParsedColor>src).mode](src.deref());
}
