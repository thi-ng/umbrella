import type { IRandom } from "@thi.ng/random";
import type { Vec } from "@thi.ng/vectors";
import type { Color, ColorFactory, ReadonlyColor, TypedColor } from "../api";
import { defColor } from "../defcolor";
import { rgbOklab } from "../rgb/rgb-oklab";
import { xyzOklab } from "../xyz/xyz-oklab";

export declare class Oklab implements TypedColor<Oklab> {
    buf: Vec;
    offset: number;
    stride: number;
    l: number;
    a: number;
    b: number;
    alpha: number;
    [id: number]: number;
    readonly mode: "oklab";
    readonly length: 4;
    [Symbol.iterator](): Iterator<number, any, undefined>;
    copy(): Oklab;
    copyView(): Oklab;
    deref(): Color;
    empty(): Oklab;
    eqDelta(o: Oklab, eps?: number): boolean;
    random(rnd?: IRandom): this;
    set(src: ReadonlyColor): this;
    toJSON(): number[];
}

export const oklab = <ColorFactory<Oklab>>defColor({
    mode: "oklab",
    channels: {
        l: {},
        a: { range: [-1, 1] },
        b: { range: [-1, 1] },
        alpha: { default: 1 },
    },
    order: <const>["l", "a", "b", "alpha"],
    from: { rgb: rgbOklab, xyz: xyzOklab },
});
