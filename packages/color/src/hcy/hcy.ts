import type { NumericArray } from "@thi.ng/api";
import type { IRandom } from "@thi.ng/random";
import type { Color, ColorFactory, ReadonlyColor, TypedColor } from "../api.js";
import { defColor } from "../defcolor.js";
import { lchLab } from "../lab/lab-lch.js";
import { labRgb } from "../lab/lab-rgb.js";
import { rgbHcy } from "../rgb/rgb-hcy.js";
import { rgbSrgb } from "../rgb/rgb-srgb.js";
import { hcyRgb } from "./hcy-rgb.js";

export declare class HCY implements TypedColor<HCY> {
	buf: NumericArray;
	offset: number;
	stride: number;
	h: number;
	c: number;
	y: number;
	alpha: number;
	[id: number]: number;
	readonly mode: "hcy";
	readonly length: 4;
	readonly range: [ReadonlyColor, ReadonlyColor];
	[Symbol.iterator](): Iterator<number, any, undefined>;
	clamp(): this;
	copy(): HCY;
	copyView(): HCY;
	deref(): Color;
	empty(): HCY;
	eqDelta(o: HCY, eps?: number): boolean;
	randomize(rnd?: IRandom): this;
	set(src: ReadonlyColor): this;
	toJSON(): number[];
}

export const hcy = <ColorFactory<HCY>>defColor({
	mode: "hcy",
	channels: { h: { hue: true } },
	order: <const>["h", "c", "y", "alpha"],
	from: { rgb: rgbHcy, srgb: rgbHcy, lch: [lchLab, labRgb, rgbSrgb, rgbHcy] },
	toRgb: hcyRgb,
});
