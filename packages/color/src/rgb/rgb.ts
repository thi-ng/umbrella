import type { NumericArray } from "@thi.ng/api";
import type { IRandom } from "@thi.ng/random";
import { set4 } from "@thi.ng/vectors/set";
import type { Color, ColorFactory, ReadonlyColor, TypedColor } from "../api.js";
import { defColor } from "../defcolor.js";
import { hcyRgb } from "../hcy/hcy-rgb.js";
import { hsiRgb } from "../hsi/hsi-rgb.js";
import { hslRgb } from "../hsl/hsl-rgb.js";
import { hsvRgb } from "../hsv/hsv-rgb.js";
import { intAbgr32Rgb, intArgb32Rgb } from "../int/int-rgb.js";
import { lchLab } from "../lab/lab-lch.js";
import { labRgb, labRgbD65 } from "../lab/lab-rgb.js";
import { oklabRgb } from "../oklab/oklab-rgb.js";
import { srgbRgb } from "../srgb/srgb-rgb.js";
import { xyyXyz } from "../xyy/xyy-xyz.js";
import { xyzRgb, xyzRgbD65 } from "../xyz/xyz-rgb.js";
import { yccRgb } from "../ycc/ycc-rgb.js";

export declare class RGB implements TypedColor<RGB> {
	buf: NumericArray;
	offset: number;
	stride: number;
	r: number;
	g: number;
	b: number;
	alpha: number;
	[id: number]: number;
	readonly mode: "rgb";
	readonly length: 4;
	readonly range: [ReadonlyColor, ReadonlyColor];
	[Symbol.iterator](): Iterator<number, any, undefined>;
	clamp(): this;
	copy(): RGB;
	copyView(): RGB;
	deref(): Color;
	empty(): RGB;
	eqDelta(o: RGB, eps?: number): boolean;
	randomize(rnd?: IRandom): this;
	set(src: ReadonlyColor): this;
	toJSON(): number[];
}

export const rgb = <ColorFactory<RGB>>defColor({
	mode: "rgb",
	order: <const>["r", "g", "b", "alpha"],
	from: {
		abgr32: (out, src) => intAbgr32Rgb(out, src[0]),
		argb32: (out, src) => intArgb32Rgb(out, src[0]),
		hcy: hcyRgb,
		hsi: hsiRgb,
		hsl: hslRgb,
		hsv: hsvRgb,
		lab50: labRgb,
		lab65: labRgbD65,
		lch: [lchLab, labRgb],
		oklab: oklabRgb,
		rgb: set4,
		srgb: srgbRgb,
		xyy: [xyyXyz, xyzRgbD65],
		xyz50: xyzRgb,
		xyz65: xyzRgbD65,
		ycc: yccRgb,
	},
	toRgb: set4,
});
