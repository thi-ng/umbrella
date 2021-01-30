import type { IRandom } from "@thi.ng/random";
import type { Vec } from "@thi.ng/vectors";
import type { Color, ColorFactory, ReadonlyColor, TypedColor } from "../api";
import { defColor } from "../defcolor";
import { rgbSrgb } from "../rgb/rgb-srgb";

export declare class SRGB implements TypedColor<SRGB> {
    buf: Vec;
    offset: number;
    stride: number;
    r: number;
    g: number;
    b: number;
    alpha: number;
    [id: number]: number;
    readonly mode: "srgb";
    readonly length: 4;
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
    from: { rgb: rgbSrgb },
});
