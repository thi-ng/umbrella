import type { IRandom } from "@thi.ng/random";
import type { Vec } from "@thi.ng/vectors";
import type { Color, ColorFactory, ReadonlyColor, TypedColor } from "../api";
import { defColor } from "../defcolor";
import { hslHsv } from "../hsl/hsl-hsv";
import { rgbHsv } from "../rgb/rgb-hsv";

// export function hsv(col: Color, offset?: number, stride?: number): HSV;
// export function hsv(h?: number, s?: number, v?: number, a?: number): HSV;
// export function hsv(...args: any[]) {
//     return new HSV(...ensureArgs(args));
// }

// export class HSV extends AColor<HSV> implements IVector<HSV> {
//     h!: number;
//     s!: number;
//     v!: number;
//     alpha!: number;

//     get mode(): ColorMode {
//         return "hsv";
//     }

//     copy() {
//         return new HSV(this.deref());
//     }

//     copyView() {
//         return new HSV(this.buf, this.offset, this.stride);
//     }

//     empty() {
//         return new HSV();
//     }
// }

// declareIndices(HSV.prototype, ["h", "s", "v", "alpha"]);

export declare class HSV implements TypedColor<HSV> {
    buf: Vec;
    offset: number;
    stride: number;
    h: number;
    s: number;
    v: number;
    alpha: number;
    [id: number]: number;
    readonly mode: "hsv";
    readonly length: 4;
    [Symbol.iterator](): Iterator<number, any, undefined>;
    copy(): HSV;
    copyView(): HSV;
    deref(): Color;
    empty(): HSV;
    eqDelta(o: HSV, eps?: number): boolean;
    random(rnd?: IRandom): this;
    set(src: ReadonlyColor): this;
    toJSON(): number[];
}

export const hsv = <ColorFactory<HSV>>defColor({
    mode: "hsv",
    channels: {
        h: {},
        s: {},
        v: {},
        alpha: { default: 1 },
    },
    order: <const>["h", "s", "v", "alpha"],
    from: { rgb: rgbHsv, hsl: hslHsv },
});
