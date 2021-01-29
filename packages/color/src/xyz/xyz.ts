import type { IRandom } from "@thi.ng/random";
import type { Vec } from "@thi.ng/vectors";
import type { Color, ColorFactory, ReadonlyColor, TypedColor } from "../api";
import { D50 } from "../api/constants";
import { defColor } from "../defcolor";
import { labXyz } from "../lab/lab-xyz";
import { oklabXyz } from "../oklab/oklab-xyz";
import { rgbXyz } from "../rgb/rgb-xyz";
import { xyyXyz } from "../xyy/xyy-xyz";

export declare class XYZ implements TypedColor<XYZ> {
    buf: Vec;
    offset: number;
    stride: number;
    x: number;
    y: number;
    z: number;
    alpha: number;
    [id: number]: number;
    readonly mode: "xyz";
    readonly length: 4;
    [Symbol.iterator](): Iterator<number, any, undefined>;
    copy(): XYZ;
    copyView(): XYZ;
    deref(): Color;
    empty(): XYZ;
    eqDelta(o: XYZ, eps?: number): boolean;
    random(rnd?: IRandom): this;
    set(src: ReadonlyColor): this;
    toJSON(): number[];
}

export const xyz = <ColorFactory<XYZ>>defColor({
    mode: "xyz",
    channels: {
        x: { range: [0, D50[0]] },
        y: { range: [0, D50[1]] },
        z: { range: [0, D50[2]] },
        alpha: { default: 1 },
    },
    order: <const>["x", "y", "z", "alpha"],
    from: { rgb: rgbXyz, lab: labXyz, oklab: oklabXyz, xyy: xyyXyz },
});
