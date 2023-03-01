import type { NumericArray } from "@thi.ng/api";
import type { IRandom } from "@thi.ng/random";
import type { Color, ColorFactory, ReadonlyColor, TypedColor } from "../api.js";
import { defColor } from "../defcolor.js";
import { hsvHsl } from "../hsv/hsv-hsl.js";
import { lchLab } from "../lab/lab-lch.js";
import { labRgb } from "../lab/lab-rgb.js";
import { rgbHsl } from "../rgb/rgb-hsl.js";
import { rgbSrgb } from "../rgb/rgb-srgb.js";
import { hslRgb } from "./hsl-rgb.js";

export declare class HSL implements TypedColor<HSL> {
	buf: NumericArray;
	offset: number;
	stride: number;
	h: number;
	s: number;
	l: number;
	alpha: number;
	[id: number]: number;
	readonly mode: "hsl";
	readonly length: 4;
	readonly range: [ReadonlyColor, ReadonlyColor];
	[Symbol.iterator](): Iterator<number, any, undefined>;
	clamp(): this;
	copy(): HSL;
	copyView(): HSL;
	deref(): Color;
	empty(): HSL;
	eqDelta(o: HSL, eps?: number): boolean;
	randomize(rnd?: IRandom): this;
	set(src: ReadonlyColor): this;
	toJSON(): number[];
}

/**
 * @remarks
 * Note: As with other hue-based color modes in this package, the hue is stored
 * normalized (in [0..1] interval) and NOT as degrees.
 */
export const hsl = <ColorFactory<HSL>>defColor({
	mode: "hsl",
	channels: { h: { hue: true } },
	order: <const>["h", "s", "l", "alpha"],
	from: {
		rgb: rgbHsl,
		srgb: rgbHsl,
		hsv: hsvHsl,
		lch: [lchLab, labRgb, rgbSrgb, rgbHsl],
	},
	toRgb: hslRgb,
});
