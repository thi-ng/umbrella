import type { IRandom } from "@thi.ng/random";
import { set4, Vec } from "@thi.ng/vectors";
import type { Color, ColorFactory, ReadonlyColor, TypedColor } from "../api";
import { defColor } from "../defcolor";
import { hcyRgb } from "../hcy/hcy-rgb";
import { hsiRgb } from "../hsi/hsi-rgb";
import { hslRgb } from "../hsl/hsl-rgb";
import { hsvRgb } from "../hsv/hsv-rgb";
import { lchLab } from "../lab/lab-lch";
import { labRgb, labRgbD65 } from "../lab/lab-rgb";
import { oklabRgb } from "../oklab/oklab-rgb";
import { srgbRgb } from "../srgb/srgb-rgb";
import { xyyXyz } from "../xyy/xyy-xyz";
import { xyzRgb, xyzRgbD65 } from "../xyz/xyz-rgb";
import { yccRgb } from "../ycc/ycc-rgb";

export declare class RGB implements TypedColor<RGB> {
    buf: Vec;
    offset: number;
    stride: number;
    r: number;
    g: number;
    b: number;
    alpha: number;
    [id: number]: number;
    readonly mode: "rgb";
    readonly length: 4;
    [Symbol.iterator](): Iterator<number, any, undefined>;
    clamp(): this;
    copy(): RGB;
    copyView(): RGB;
    deref(): Color;
    empty(): RGB;
    eqDelta(o: RGB, eps?: number): boolean;
    randomize(rnd?: IRandom): this;
    set(src: ReadonlyColor): this;
    toJSON(): number[];
}

export const rgb = <ColorFactory<RGB>>defColor({
    mode: "rgb",
    order: <const>["r", "g", "b", "alpha"],
    from: {
        hcy: hcyRgb,
        hsi: hsiRgb,
        hsl: hslRgb,
        hsv: hsvRgb,
        lab50: labRgb,
        lab65: labRgbD65,
        lch: [lchLab, labRgbD65],
        oklab: oklabRgb,
        rgb: set4,
        srgb: srgbRgb,
        xyy: [xyyXyz, xyzRgbD65],
        xyz50: xyzRgb,
        xyz65: xyzRgbD65,
        ycc: yccRgb,
    },
});
