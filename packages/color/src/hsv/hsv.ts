import type { NumericArray } from "@thi.ng/api";
import type { IRandom } from "@thi.ng/random";
import type { Color, ColorFactory, ReadonlyColor, TypedColor } from "../api";
import { defColor } from "../defcolor";
import { hslHsv } from "../hsl/hsl-hsv";
import { rgbHsv } from "../rgb/rgb-hsv";
import { hsvRgb } from "./hsv-rgb";

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
    order: <const>["h", "s", "v", "alpha"],
    from: { rgb: rgbHsv, srgb: rgbHsv, hsl: hslHsv },
    toRgb: hsvRgb,
});
