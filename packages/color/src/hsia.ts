import { IDeref } from "@thi.ng/api/api";
import { EPS } from "@thi.ng/math/api";
import { IVector, Vec } from "@thi.ng/vectors3/api";
import { eqDelta4 } from "@thi.ng/vectors3/eqdelta";
import { declareIndices } from "@thi.ng/vectors3/internal/accessors";
import { AVec } from "@thi.ng/vectors3/internal/avec";
import { values } from "@thi.ng/vectors3/internal/vec-utils";
import { Color, ColorMode, IColor } from "./api";
import { ensureArgs } from "./internal/ctor-args";

export function hsia(rgba: Color): HSIA
export function hsia(h: number, s: number, i: number, a?: number): HSIA;
export function hsia(...args: any[]) {
    return new HSIA(ensureArgs(args));
}

export class HSIA extends AVec implements
    IColor,
    IDeref<Color>,
    IVector<HSIA> {

    h: number;
    s: number;
    i: number;
    a: number;
    [id: number]: number;

    constructor(buf?: Vec, offset = 0, stride = 1) {
        super(buf || [0, 0, 0, 0], offset, stride);
    }

    [Symbol.iterator]() {
        return values(this.buf, 4, this.offset, this.stride);
    }

    get mode() {
        return ColorMode.HSIA;
    }

    get length() {
        return 4;
    }

    copy() {
        return new HSIA(this.deref());
    }

    copyView() {
        return new HSIA(this.buf, this.offset, this.stride);
    }

    empty() {
        return new HSIA();
    }

    deref(): Color {
        return [this[0], this[1], this[2], this[3]];
    }

    eqDelta(o: HSIA, eps = EPS): boolean {
        return eqDelta4(this, o, eps);
    }
}

declareIndices(HSIA.prototype, ["h", "s", "i", "a"]);
