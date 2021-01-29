import type { IRandom } from "@thi.ng/random";
import type { Vec } from "@thi.ng/vectors";
import type { Color, ColorFactory, ReadonlyColor, TypedColor } from "../api";
import { defColor } from "../defcolor";
import { rgbLab } from "../rgb/rgb-lab";
import { xyzLab } from "../xyz/xyz-lab";
import { lchLab } from "./lab-lch";

export declare class Lab implements TypedColor<Lab> {
    buf: Vec;
    offset: number;
    stride: number;
    l: number;
    a: number;
    b: number;
    alpha: number;
    [id: number]: number;
    readonly mode: "lab";
    readonly length: 4;
    [Symbol.iterator](): Iterator<number, any, undefined>;
    copy(): Lab;
    copyView(): Lab;
    deref(): Color;
    empty(): Lab;
    eqDelta(o: Lab, eps?: number): boolean;
    randomize(rnd?: IRandom): this;
    set(src: ReadonlyColor): this;
    toJSON(): number[];
}

export const lab = <ColorFactory<Lab>>defColor({
    mode: "lab",
    channels: {
        // l: {},
        // ranges based on sRGB:
        // https://stackoverflow.com/a/19099064
        a: { range: [-0.86185, 0.98254] },
        b: { range: [-1.07863, 0.94482] },
        // alpha: { default: 1 },
    },
    order: <const>["l", "a", "b", "alpha"],
    from: { rgb: rgbLab, lch: lchLab, xyz: xyzLab },
});
