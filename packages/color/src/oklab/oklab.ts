import type { NumericArray } from "@thi.ng/api";
import type { IRandom } from "@thi.ng/random";
import type { Color, ColorFactory, ReadonlyColor, TypedColor } from "../api.js";
import { defColor } from "../defcolor.js";
import { lchLab } from "../lab/lab-lch.js";
import { labXyz, labXyzD65 } from "../lab/lab-xyz.js";
import { rgbOklab } from "../rgb/rgb-oklab.js";
import { xyzOklab } from "../xyz/xyz-oklab.js";
import { xyzXyzD50_65 } from "../xyz/xyz-xyz.js";
import { oklabRgb } from "./oklab-rgb.js";

export declare class Oklab implements TypedColor<Oklab> {
	buf: NumericArray;
	offset: number;
	stride: number;
	l: number;
	a: number;
	b: number;
	alpha: number;
	[id: number]: number;
	readonly mode: "oklab";
	readonly length: 4;
	readonly range: [ReadonlyColor, ReadonlyColor];
	readonly xyz: [number, number, number];
	[Symbol.iterator](): Iterator<number, any, undefined>;
	clamp(): this;
	copy(): Oklab;
	copyView(): Oklab;
	deref(): Color;
	empty(): Oklab;
	eqDelta(o: Oklab, eps?: number): boolean;
	randomize(rnd?: IRandom): this;
	set(src: ReadonlyColor): this;
	toJSON(): number[];
}

/**
 * Oklab color type. Conversions assume {@link D65} white point).
 *
 * @remarks
 * Reference: https://bottosson.github.io/posts/oklab/
 */
export const oklab = <ColorFactory<Oklab>>defColor({
	mode: "oklab",
	channels: {
		a: { range: [-0.2339, 0.2762] },
		b: { range: [-0.3115, 0.1986] },
	},
	order: <const>["l", "a", "b", "alpha"],
	from: {
		lab50: [labXyz, xyzXyzD50_65, xyzOklab],
		lab65: [labXyzD65, xyzOklab],
		lch: [lchLab, labXyzD65, xyzOklab],
		rgb: rgbOklab,
		xyz50: [xyzXyzD50_65, xyzOklab],
		xyz65: xyzOklab,
	},
	toRgb: oklabRgb,
});
