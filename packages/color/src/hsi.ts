import { declareIndices, IVector } from "@thi.ng/vectors";
import type { Color, ColorMode } from "./api";
import { AColor } from "./internal/acolor";
import { ensureArgs } from "./internal/ensure-args";

export function hsi(col: Color, offset?: number, stride?: number): HSI;
export function hsi(h?: number, s?: number, i?: number, a?: number): HSI;
export function hsi(...args: any[]) {
    return new HSI(...ensureArgs(args));
}

export class HSI extends AColor<HSI> implements IVector<HSI> {
    h!: number;
    s!: number;
    i!: number;
    alpha!: number;

    get mode(): ColorMode {
        return "hsi";
    }

    copy() {
        return new HSI(this.deref());
    }

    copyView() {
        return new HSI(this.buf, this.offset, this.stride);
    }

    empty() {
        return new HSI();
    }
}

declareIndices(HSI.prototype, ["h", "s", "i", "alpha"]);
