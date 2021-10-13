import type { NumericArray } from "@thi.ng/api";
import type { IRandom } from "@thi.ng/random";
import type { Color, ColorFactory, ReadonlyColor, TypedColor } from "../api.js";
import { defColor } from "../defcolor.js";
import { rgbHsi } from "../rgb/rgb-hsi.js";
import { hsiRgb } from "./hsi-rgb.js";

export declare class HSI implements TypedColor<HSI> {
    buf: NumericArray;
    offset: number;
    stride: number;
    h: number;
    s: number;
    i: number;
    alpha: number;
    [id: number]: number;
    readonly mode: "hsi";
    readonly length: 4;
    readonly range: [ReadonlyColor, ReadonlyColor];
    [Symbol.iterator](): Iterator<number, any, undefined>;
    clamp(): this;
    copy(): HSI;
    copyView(): HSI;
    deref(): Color;
    empty(): HSI;
    eqDelta(o: HSI, eps?: number): boolean;
    randomize(rnd?: IRandom): this;
    set(src: ReadonlyColor): this;
    toJSON(): number[];
}

export const hsi = <ColorFactory<HSI>>defColor({
    mode: "hsi",
    order: <const>["h", "s", "i", "alpha"],
    from: { rgb: rgbHsi, srgb: rgbHsi },
    toRgb: hsiRgb,
});
