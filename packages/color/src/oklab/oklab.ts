import type { NumericArray } from "@thi.ng/api";
import type { IRandom } from "@thi.ng/random";
import type { Color, ColorFactory, ReadonlyColor, TypedColor } from "../api";
import { defColor } from "../defcolor";
import { rgbOklab } from "../rgb/rgb-oklab";
import { xyzOklab } from "../xyz/xyz-oklab";
import { xyzXyzD50_65 } from "../xyz/xyz-xyz";

export declare class Oklab implements TypedColor<Oklab> {
    buf: NumericArray;
    offset: number;
    stride: number;
    l: number;
    a: number;
    b: number;
    alpha: number;
    [id: number]: number;
    readonly mode: "oklab";
    readonly length: 4;
    readonly range: [ReadonlyColor, ReadonlyColor];
    [Symbol.iterator](): Iterator<number, any, undefined>;
    clamp(): this;
    copy(): Oklab;
    copyView(): Oklab;
    deref(): Color;
    empty(): Oklab;
    eqDelta(o: Oklab, eps?: number): boolean;
    randomize(rnd?: IRandom): this;
    set(src: ReadonlyColor): this;
    toJSON(): number[];
}

export const oklab = <ColorFactory<Oklab>>defColor({
    mode: "oklab",
    channels: {
        a: { range: [-0.2339, 0.2763] },
        b: { range: [-0.3116, 0.1985] },
    },
    order: <const>["l", "a", "b", "alpha"],
    from: {
        rgb: rgbOklab,
        xyz50: [xyzXyzD50_65, xyzOklab],
        xyz65: xyzOklab,
    },
});
