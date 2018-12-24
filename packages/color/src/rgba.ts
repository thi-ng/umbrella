import { EPS } from "@thi.ng/math/api";
import { IVector, Vec } from "@thi.ng/vectors3/api";
import { eqDelta4 } from "@thi.ng/vectors3/eqdelta";
import { declareIndices } from "@thi.ng/vectors3/internal/accessors";
import { AVec } from "@thi.ng/vectors3/internal/avec";
import { ColorMode, IColor } from "./api";

export class RGBA extends AVec implements
    IColor,
    IVector<RGBA> {

    r: number;
    g: number;
    b: number;
    a: number;
    [id: number]: number;

    constructor(buf?: Vec, offset = 0, stride = 1) {
        super(buf || [0, 0, 0, 0], offset, stride);
    }

    *[Symbol.iterator]() {
        yield* [this.r, this.g, this.b, this.a];
    }

    get mode() {
        return ColorMode.RGBA;
    }

    get length() {
        return 4;
    }

    copy() {
        return new RGBA([this.r, this.g, this.b, this.a]);
    }

    copyView() {
        return new RGBA(this.buf, this.offset, this.stride);
    }

    empty() {
        return new RGBA();
    }

    eqDelta(o: RGBA, eps = EPS): boolean {
        return eqDelta4(this, o, eps);
    }
}

declareIndices(RGBA.prototype, ["r", "g", "b", "a"]);
