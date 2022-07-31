import { isString } from "@thi.ng/checks/is-string";
import type {
	Color,
	ColorFactory,
	ColorMode,
	ParsedColor,
	TypedColor,
} from "./api.js";
import { hcy } from "./hcy/hcy.js";
import { hsi } from "./hsi/hsi.js";
import { hsl } from "./hsl/hsl.js";
import { hsv } from "./hsv/hsv.js";
import { argb32, abgr32 } from "./int/int.js";
import { labD50 } from "./lab/lab50.js";
import { labD65 } from "./lab/lab65.js";
import { lch } from "./lch/lch.js";
import { oklab } from "./oklab/oklab.js";
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
	rgb,
	srgb,
	xyy,
	xyz50: xyzD50,
	xyz65: xyzD65,
	ycc,
};

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
	if (isString(src)) return FACTORIES[<ColorMode>src](buf, idx, stride);
	if (buf) {
		const res = FACTORIES[(<ParsedColor>src).mode](buf, idx, stride);
		res.set(src.deref());
		return res;
	}
	return FACTORIES[(<ParsedColor>src).mode](src.deref());
}
