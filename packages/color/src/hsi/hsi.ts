import type { IRandom } from "@thi.ng/random";
import type { Vec } from "@thi.ng/vectors";
import type { Color, ColorFactory, ReadonlyColor, TypedColor } from "../api";
import { defColor } from "../defcolor";
import { rgbHsi } from "../rgb/rgb-hsi";

export declare class HSI implements TypedColor<HSI> {
    buf: Vec;
    offset: number;
    stride: number;
    h: number;
    s: number;
    i: number;
    alpha: number;
    [id: number]: number;
    readonly mode: "hsi";
    readonly length: 4;
    [Symbol.iterator](): Iterator<number, any, undefined>;
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
    channels: {
        // h: {},
        // s: {},
        // i: {},
        // alpha: { default: 1 },
    },
    order: <const>["h", "s", "i", "alpha"],
    from: { rgb: rgbHsi },
});
