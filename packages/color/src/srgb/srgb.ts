import type { Vec } from "@thi.ng/vectors";
import type { Color, ColorFactory, ColorType, ReadonlyColor } from "../api";
import { defColor } from "../defcolor";
import { rgbSrgb } from "../rgb/rgb-srgb";

export declare class SRGB implements ColorType<SRGB> {
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
    copy(): SRGB;
    copyView(): SRGB;
    deref(): Color;
    empty(): SRGB;
    eqDelta(o: SRGB, eps?: number): boolean;
    set(src: ReadonlyColor): this;
    toJSON(): number[];
}

export const srgb = <ColorFactory<SRGB>>defColor({
    mode: "srgb",
    channels: {
        r: {},
        g: {},
        b: {},
        alpha: { default: 1 },
    },
    order: <const>["r", "g", "b", "alpha"],
    from: { rgb: rgbSrgb },
});
