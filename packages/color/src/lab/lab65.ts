import type { NumericArray } from "@thi.ng/api";
import type { IRandom } from "@thi.ng/random";
import type { Color, ColorFactory, ReadonlyColor, TypedColor } from "../api";
import { defColor } from "../defcolor";
import { rgbLabD65 } from "../rgb/rgb-lab";
import { xyzLabD65 } from "../xyz/xyz-lab";
import { xyzXyzD50_65 } from "../xyz/xyz-xyz";
import { labLabD50_65 } from "./lab-lab";
import { lchLab } from "./lab-lch";
import { labRgbD65 } from "./lab-rgb";

export declare class LabD65 implements TypedColor<LabD65> {
    buf: NumericArray;
    offset: number;
    stride: number;
    l: number;
    a: number;
    b: number;
    alpha: number;
    [id: number]: number;
    readonly mode: "lab65";
    readonly length: 4;
    readonly range: [ReadonlyColor, ReadonlyColor];
    [Symbol.iterator](): Iterator<number, any, undefined>;
    clamp(): this;
    copy(): LabD65;
    copyView(): LabD65;
    deref(): Color;
    empty(): LabD65;
    eqDelta(o: LabD65, eps?: number): boolean;
    randomize(rnd?: IRandom): this;
    set(src: ReadonlyColor): this;
    toJSON(): number[];
}

export const labD65 = <ColorFactory<LabD65>>defColor({
    mode: "lab65",
    channels: {
        a: { range: [-0.8618, 0.9823] },
        b: { range: [-1.0786, 0.9448] },
    },
    order: <const>["l", "a", "b", "alpha"],
    from: {
        rgb: rgbLabD65,
        lch: [lchLab, labLabD50_65],
        lab50: labLabD50_65,
        xyz50: [xyzXyzD50_65, xyzLabD65],
        xyz65: xyzLabD65,
    },
    toRgb: labRgbD65,
});
