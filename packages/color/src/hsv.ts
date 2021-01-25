import { declareIndices, IVector } from "@thi.ng/vectors";
import type { Color, ColorMode } from "./api";
import { AColor } from "./internal/acolor";
import { ensureArgs } from "./internal/ensure-args";

export function hsv(col: Color, offset?: number, stride?: number): HSV;
export function hsv(h?: number, s?: number, v?: number, a?: number): HSV;
export function hsv(...args: any[]) {
    return new HSV(...ensureArgs(args));
}

export class HSV extends AColor<HSV> implements IVector<HSV> {
    h!: number;
    s!: number;
    v!: number;
    alpha!: number;

    get mode(): ColorMode {
        return "hsv";
    }

    copy() {
        return new HSV(this.deref());
    }

    copyView() {
        return new HSV(this.buf, this.offset, this.stride);
    }

    empty() {
        return new HSV();
    }
}

declareIndices(HSV.prototype, ["h", "s", "v", "alpha"]);
