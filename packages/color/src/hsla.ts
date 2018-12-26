import { IDeref } from "@thi.ng/api/api";
import { EPS } from "@thi.ng/math/api";
import { IVector, Vec } from "@thi.ng/vectors3/api";
import { eqDelta4 } from "@thi.ng/vectors3/eqdelta";
import { declareIndices } from "@thi.ng/vectors3/internal/accessors";
import { AVec } from "@thi.ng/vectors3/internal/avec";
import { values } from "@thi.ng/vectors3/internal/vec-utils";
import { Color, ColorMode, IColor } from "./api";
import { ensureArgs } from "./internal/ctor-args";

export function hsla(rgba: Color): HSLA
export function hsla(h: number, s: number, l: number, a?: number): HSLA;
export function hsla(...args: any[]) {
    return new HSLA(ensureArgs(args));
}

export class HSLA extends AVec implements
    IColor,
    IDeref<Color>,
    IVector<HSLA> {

    h: number;
    s: number;
    l: number;
    a: number;
    [id: number]: number;

    constructor(buf?: Vec, offset = 0, stride = 1) {
        super(buf || [0, 0, 0, 0], offset, stride);
    }

    [Symbol.iterator]() {
        return values(this.buf, 4, this.offset, this.stride);
    }

    get mode() {
        return ColorMode.HSLA;
    }

    get length() {
        return 4;
    }

    copy() {
        return new HSLA(this.deref());
    }

    copyView() {
        return new HSLA(this.buf, this.offset, this.stride);
    }

    deref(): Color {
        return [this[0], this[1], this[2], this[3]];
    }

    empty() {
        return new HSLA();
    }

    eqDelta(o: HSLA, eps = EPS): boolean {
        return eqDelta4(this, o, eps);
    }
}

declareIndices(HSLA.prototype, ["h", "s", "l", "a"]);
