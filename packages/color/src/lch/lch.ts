import type { IRandom } from "@thi.ng/random";
import type { Vec } from "@thi.ng/vectors";
import type { Color, ColorFactory, ReadonlyColor, TypedColor } from "../api";
import { defColor } from "../defcolor";
import { labLch, lchLab } from "../lab/lab-lch";
import { rgbLab } from "../rgb/rgb-lab";

export declare class LCH implements TypedColor<LCH> {
    buf: Vec;
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
        l: {},
        c: {},
        h: {},
        alpha: { default: 1 },
    },
    order: <const>["l", "c", "h", "alpha"],
    from: { rgb: (out, src) => labLch(null, rgbLab(out, src)), lch: lchLab },
});
