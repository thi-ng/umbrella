import type { IRandom } from "@thi.ng/random";
import type { Vec } from "@thi.ng/vectors";
import type { Color, ColorFactory, ReadonlyColor, TypedColor } from "../api";
import { defColor } from "../defcolor";
import { rgbXyz } from "../rgb/rgb-xyz";
import { xyzXyy } from "../xyz/xyz-xyy";

export declare class XYY implements TypedColor<XYY> {
    buf: Vec;
    offset: number;
    stride: number;
    x: number;
    y: number;
    Y: number;
    alpha: number;
    [id: number]: number;
    readonly mode: "xyy";
    readonly length: 4;
    [Symbol.iterator](): Iterator<number, any, undefined>;
    copy(): XYY;
    copyView(): XYY;
    deref(): Color;
    empty(): XYY;
    eqDelta(o: XYY, eps?: number): boolean;
    randomize(rnd?: IRandom): this;
    set(src: ReadonlyColor): this;
    toJSON(): number[];
}

export const xyy = <ColorFactory<XYY>>defColor({
    mode: "xyy",
    channels: {
        x: {},
        y: {},
        Y: {},
        alpha: { default: 1 },
    },
    order: <const>["x", "y", "Y", "alpha"],
    from: { rgb: (out, src) => xyzXyy(null, rgbXyz(out, src)), xyz: xyzXyy },
});
