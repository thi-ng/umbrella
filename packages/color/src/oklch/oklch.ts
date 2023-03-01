import type { NumericArray } from "@thi.ng/api";
import type { IRandom } from "@thi.ng/random";
import type { Color, ColorFactory, ReadonlyColor, TypedColor } from "../api.js";
import { defColor } from "../defcolor.js";
import { oklabRgb } from "../oklab/oklab-rgb.js";
import { rgbOklab } from "../rgb/rgb-oklab.js";
import { oklabOklch } from "./oklab-oklch.js";
import { oklchOklab } from "./oklch-oklab.js";

export declare class Oklch implements TypedColor<Oklch> {
	buf: NumericArray;
	offset: number;
	stride: number;
	l: number;
	c: number;
	h: number;
	alpha: number;
	[id: number]: number;
	readonly mode: "oklch";
	readonly length: 4;
	readonly range: [ReadonlyColor, ReadonlyColor];
	[Symbol.iterator](): Iterator<number, any, undefined>;
	clamp(): this;
	copy(): Oklch;
	copyView(): Oklch;
	deref(): Color;
	empty(): Oklch;
	eqDelta(o: Oklch, eps?: number): boolean;
	randomize(rnd?: IRandom): this;
	set(src: ReadonlyColor): this;
	toJSON(): number[];
}

/**
 * Oklch color type aka polar version of {@link oklab}.
 *
 * @remarks
 * Note: As with other hue-based color modes in this package, the hue is stored
 * normalized (in [0..1] interval) and NOT as degrees.
 *
 * Reference: https://bottosson.github.io/posts/oklab/
 */
export const oklch = <ColorFactory<Oklch>>defColor({
	mode: "oklch",
	channels: {
		c: { range: [0, 0.3225] },
	},
	order: <const>["l", "c", "h", "alpha"],
	from: {
		oklab: oklabOklch,
		rgb: (out, src) => oklabOklch(null, rgbOklab(out, src)),
	},
	toRgb: [oklchOklab, oklabRgb],
});
