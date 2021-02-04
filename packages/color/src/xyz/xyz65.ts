import type { NumericArray } from "@thi.ng/api";
import type { IRandom } from "@thi.ng/random";
import type { Color, ColorFactory, ReadonlyColor, TypedColor } from "../api";
import { D65 } from "../api/constants";
import { defColor } from "../defcolor";
import { labXyzD65 } from "../lab/lab-xyz";
import { oklabXyzD65 } from "../oklab/oklab-xyz";
import { rgbXyzD65 } from "../rgb/rgb-xyz";
import { xyyXyz } from "../xyy/xyy-xyz";

export declare class XYZD65 implements TypedColor<XYZD65> {
    buf: NumericArray;
    offset: number;
    stride: number;
    x: number;
    y: number;
    z: number;
    alpha: number;
    [id: number]: number;
    readonly mode: "xyz65";
    readonly length: 4;
    readonly range: [ReadonlyColor, ReadonlyColor];
    [Symbol.iterator](): Iterator<number, any, undefined>;
    clamp(): this;
    copy(): XYZD65;
    copyView(): XYZD65;
    deref(): Color;
    empty(): XYZD65;
    eqDelta(o: XYZD65, eps?: number): boolean;
    randomize(rnd?: IRandom): this;
    set(src: ReadonlyColor): this;
    toJSON(): number[];
}

export const xyzD65 = <ColorFactory<XYZD65>>defColor({
    mode: "xyz65",
    channels: {
        x: { range: [0, D65[0]] },
        y: { range: [0, D65[1]] },
        z: { range: [0, D65[2]] },
    },
    order: <const>["x", "y", "z", "alpha"],
    from: { rgb: rgbXyzD65, lab65: labXyzD65, oklab: oklabXyzD65, xyy: xyyXyz },
});
