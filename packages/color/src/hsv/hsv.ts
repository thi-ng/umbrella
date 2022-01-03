import type { NumericArray } from "@thi.ng/api";
import type { IRandom } from "@thi.ng/random";
import type { Color, ColorFactory, ReadonlyColor, TypedColor } from "../api.js";
import { defColor } from "../defcolor.js";
import { hslHsv } from "../hsl/hsl-hsv.js";
import { lchLab } from "../lab/lab-lch.js";
import { labRgb } from "../lab/lab-rgb.js";
import { rgbHsv } from "../rgb/rgb-hsv.js";
import { rgbSrgb } from "../rgb/rgb-srgb.js";
import { hsvRgb } from "./hsv-rgb.js";

export declare class HSV implements TypedColor<HSV> {
    buf: NumericArray;
    offset: number;
    stride: number;
    h: number;
    s: number;
    v: number;
    alpha: number;
    [id: number]: number;
    readonly mode: "hsv";
    readonly length: 4;
    readonly range: [ReadonlyColor, ReadonlyColor];
    [Symbol.iterator](): Iterator<number, any, undefined>;
    clamp(): this;
    copy(): HSV;
    copyView(): HSV;
    deref(): Color;
    empty(): HSV;
    eqDelta(o: HSV, eps?: number): boolean;
    randomize(rnd?: IRandom): this;
    set(src: ReadonlyColor): this;
    toJSON(): number[];
}

export const hsv = <ColorFactory<HSV>>defColor({
    mode: "hsv",
    channels: { h: { hue: true } },
    order: <const>["h", "s", "v", "alpha"],
    from: {
        rgb: rgbHsv,
        srgb: rgbHsv,
        hsl: hslHsv,
        lch: [lchLab, labRgb, rgbSrgb, rgbHsv],
    },
    toRgb: hsvRgb,
});
