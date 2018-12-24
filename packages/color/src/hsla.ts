import { EPS } from "@thi.ng/math/api";
import { IVector, Vec } from "@thi.ng/vectors3/api";
import { eqDelta4 } from "@thi.ng/vectors3/eqdelta";
import { declareIndices } from "@thi.ng/vectors3/internal/accessors";
import { AVec } from "@thi.ng/vectors3/internal/avec";
import { ColorMode, IColor } from "./api";

export class HSLA extends AVec implements
    IColor,
    IVector<HSLA> {

    h: number;
    s: number;
    l: number;
    a: number;
    [id: number]: number;

    constructor(buf?: Vec, i = 0, s = 1) {
        super(buf || [0, 0, 0, 0], i, s);
    }

    *[Symbol.iterator]() {
        yield this[0];
        yield this[1];
        yield this[2];
        yield this[3];
    }

    get mode() {
        return ColorMode.HSLA;
    }

    get length() {
        return 4;
    }

    copy() {
        return new HSLA([this[0], this[1], this[2], this[3]]);
    }

    copyView() {
        return new HSLA(this.buf, this.offset, this.stride);
    }

    empty() {
        return new HSLA();
    }

    eqDelta(o: HSLA, eps = EPS): boolean {
        return eqDelta4(this, o, eps);
    }
}

declareIndices(HSLA.prototype, ["h", "s", "v", "a"]);
