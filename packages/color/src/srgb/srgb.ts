import type { NumericArray } from "@thi.ng/api";
import type { IRandom } from "@thi.ng/random";
import type { Color, ColorFactory, ReadonlyColor, TypedColor } from "../api";
import { defColor } from "../defcolor";
import { hcyRgb } from "../hcy/hcy-rgb";
import { hsiRgb } from "../hsi/hsi-rgb";
import { hslRgb } from "../hsl/hsl-rgb";
import { hsvRgb } from "../hsv/hsv-rgb";
import { intAbgr32Srgb, intArgb32Srgb } from "../int/int-srgb";
import { rgbSrgb } from "../rgb/rgb-srgb";
import { srgbRgb } from "./srgb-rgb";

export declare class SRGB implements TypedColor<SRGB> {
    buf: NumericArray;
    offset: number;
    stride: number;
    r: number;
    g: number;
    b: number;
    alpha: number;
    [id: number]: number;
    readonly mode: "srgb";
    readonly length: 4;
    readonly range: [ReadonlyColor, ReadonlyColor];
    [Symbol.iterator](): Iterator<number, any, undefined>;
    clamp(): this;
    copy(): SRGB;
    copyView(): SRGB;
    deref(): Color;
    empty(): SRGB;
    eqDelta(o: SRGB, eps?: number): boolean;
    randomize(rnd?: IRandom): this;
    set(src: ReadonlyColor): this;
    toJSON(): number[];
}

export const srgb = <ColorFactory<SRGB>>defColor({
    mode: "srgb",
    order: <const>["r", "g", "b", "alpha"],
    from: {
        abgr32: (out, src) => intAbgr32Srgb(out, src[0]),
        argb32: (out, src) => intArgb32Srgb(out, src[0]),
        hcy: hcyRgb,
        hsi: hsiRgb,
        hsl: hslRgb,
        hsv: hsvRgb,
        rgb: rgbSrgb,
    },
    toRgb: srgbRgb,
});
