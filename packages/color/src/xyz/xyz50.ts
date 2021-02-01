import type { NumericArray } from "@thi.ng/api";
import type { IRandom } from "@thi.ng/random";
import type { Color, ColorFactory, ReadonlyColor, TypedColor } from "../api";
import { D50 } from "../api/constants";
import { defColor } from "../defcolor";
import { labXyz, labXyzD65 } from "../lab/lab-xyz";
import { oklabXyzD65 } from "../oklab/oklab-xyz";
import { rgbXyz } from "../rgb/rgb-xyz";
import { xyyXyz } from "../xyy/xyy-xyz";
import { xyzXyzD65_50 } from "./xyz-xyz";

export declare class XYZD50 implements TypedColor<XYZD50> {
    buf: NumericArray;
    offset: number;
    stride: number;
    x: number;
    y: number;
    z: number;
    alpha: number;
    [id: number]: number;
    readonly mode: "xyz50";
    readonly length: 4;
    [Symbol.iterator](): Iterator<number, any, undefined>;
    clamp(): this;
    copy(): XYZD50;
    copyView(): XYZD50;
    deref(): Color;
    empty(): XYZD50;
    eqDelta(o: XYZD50, eps?: number): boolean;
    randomize(rnd?: IRandom): this;
    set(src: ReadonlyColor): this;
    toJSON(): number[];
}

export const xyzD50 = <ColorFactory<XYZD50>>defColor({
    mode: "xyz50",
    channels: {
        x: { range: [0, D50[0]] },
        y: { range: [0, D50[1]] },
        z: { range: [0, D50[2]] },
    },
    order: <const>["x", "y", "z", "alpha"],
    from: {
        rgb: rgbXyz,
        lab50: labXyz,
        lab65: [labXyzD65, xyzXyzD65_50],
        oklab: [oklabXyzD65, xyzXyzD65_50],
        xyy: xyyXyz,
    },
});
