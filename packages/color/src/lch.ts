import { declareIndices, IVector } from "@thi.ng/vectors";
import type { Color, ColorMode } from "./api";
import { AColor } from "./internal/acolor";
import { ensureArgs } from "./internal/ensure-args";

export function lch(col: Color, offset?: number, stride?: number): LCH;
export function lch(l?: number, a?: number, b?: number, alpha?: number): LCH;
export function lch(...args: any[]) {
    return new LCH(...ensureArgs(args));
}

export class LCH extends AColor<LCH> implements IVector<LCH> {
    l!: number;
    a!: number;
    b!: number;
    alpha!: number;

    get mode(): ColorMode {
        return "lch";
    }

    copy() {
        return new LCH(this.deref());
    }

    copyView() {
        return new LCH(this.buf, this.offset, this.stride);
    }

    empty() {
        return new LCH();
    }
}

declareIndices(LCH.prototype, ["l", "c", "h", "alpha"]);
