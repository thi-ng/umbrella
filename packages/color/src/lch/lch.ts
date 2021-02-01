import type { NumericArray } from "@thi.ng/api";
import type { IRandom } from "@thi.ng/random";
import type { Color, ColorFactory, ReadonlyColor, TypedColor } from "../api";
import { defColor } from "../defcolor";
import { labLch } from "../lab/lab-lch";
import { rgbLab } from "../rgb/rgb-lab";

export declare class LCH implements TypedColor<LCH> {
    buf: NumericArray;
    offset: number;
    stride: number;
    l: number;
    c: number;
    h: number;
    alpha: number;
    [id: number]: number;
    readonly mode: "lch";
    readonly length: 4;
    [Symbol.iterator](): Iterator<number, any, undefined>;
    clamp(): this;
    copy(): LCH;
    copyView(): LCH;
    deref(): Color;
    empty(): LCH;
    eqDelta(o: LCH, eps?: number): boolean;
    randomize(rnd?: IRandom): this;
    set(src: ReadonlyColor): this;
    toJSON(): number[];
}

export const lch = <ColorFactory<LCH>>defColor({
    mode: "lch",
    channels: {
        // l: {},
        c: { range: [0, 1.312] },
        // h: {},
        // alpha: {},
    },
    order: <const>["l", "c", "h", "alpha"],
    from: {
        rgb: (out, src) => labLch(null, rgbLab(out, src)),
        lab50: labLch,
        lab65: labLch,
    },
});
