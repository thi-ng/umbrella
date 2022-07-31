import type { NumericArray } from "@thi.ng/api";
import type { IRandom } from "@thi.ng/random";
import type { Color, ColorFactory, ReadonlyColor, TypedColor } from "../api.js";
import { defColor } from "../defcolor.js";
import { labLabD65_50 } from "../lab/lab-lab.js";
import { labLch, lchLab } from "../lab/lab-lch.js";
import { labRgb } from "../lab/lab-rgb.js";
import { rgbLab } from "../rgb/rgb-lab.js";
import { xyzLab } from "../xyz/xyz-lab.js";
import { xyzXyzD65_50 } from "../xyz/xyz-xyz.js";

export declare class LCH implements TypedColor<LCH> {
	buf: NumericArray;
	offset: number;
	stride: number;
	l: number;
	c: number;
	h: number;
	alpha: number;
	[id: number]: number;
	readonly mode: "lch";
	readonly length: 4;
	readonly range: [ReadonlyColor, ReadonlyColor];
	[Symbol.iterator](): Iterator<number, any, undefined>;
	clamp(): this;
	copy(): LCH;
	copyView(): LCH;
	deref(): Color;
	empty(): LCH;
	eqDelta(o: LCH, eps?: number): boolean;
	randomize(rnd?: IRandom): this;
	set(src: ReadonlyColor): this;
	toJSON(): number[];
}

/**
 * Luminance Chroma Hue (conversions assume {@link D50} white point, as per CSS
 * spec).
 */
export const lch = <ColorFactory<LCH>>defColor({
	mode: "lch",
	channels: {
		c: { range: [0, 1.312] },
		h: { hue: true },
	},
	order: <const>["l", "c", "h", "alpha"],
	from: {
		rgb: (out, src) => labLch(null, rgbLab(out, src)),
		lab50: labLch,
		lab65: [labLabD65_50, labLch],
		xyz50: [xyzLab, labLch],
		xyz65: [xyzXyzD65_50, xyzLab, labLch],
	},
	toRgb: [lchLab, labRgb],
});
