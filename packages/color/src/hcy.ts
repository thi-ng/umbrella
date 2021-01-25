import { declareIndices, IVector } from "@thi.ng/vectors";
import type { Color, ColorMode } from "./api";
import { AColor } from "./internal/acolor";
import { ensureArgs } from "./internal/ensure-args";

export function hcy(col: Color, offset?: number, stride?: number): HCY;
export function hcy(h?: number, c?: number, y?: number, a?: number): HCY;
export function hcy(...args: any[]) {
    return new HCY(...ensureArgs(args));
}

export class HCY extends AColor<HCY> implements IVector<HCY> {
    h!: number;
    c!: number;
    y!: number;
    alpha!: number;

    get mode(): ColorMode {
        return "hcy";
    }

    copy() {
        return new HCY(this.deref());
    }

    copyView() {
        return new HCY(this.buf, this.offset, this.stride);
    }

    empty() {
        return new HCY();
    }
}

declareIndices(HCY.prototype, ["h", "c", "y", "alpha"]);
