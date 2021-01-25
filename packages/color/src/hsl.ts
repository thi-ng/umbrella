import { declareIndices, IVector } from "@thi.ng/vectors";
import type { Color, ColorMode } from "./api";
import { AColor } from "./internal/acolor";
import { ensureArgs } from "./internal/ensure-args";

export function hsl(col: Color, offset?: number, stride?: number): HSL;
export function hsl(h?: number, s?: number, l?: number, a?: number): HSL;
export function hsl(...args: any[]) {
    return new HSL(...ensureArgs(args));
}

export class HSL extends AColor<HSL> implements IVector<HSL> {
    h!: number;
    s!: number;
    l!: number;
    alpha!: number;

    get mode(): ColorMode {
        return "hsl";
    }

    copy() {
        return new HSL(this.deref());
    }

    copyView() {
        return new HSL(this.buf, this.offset, this.stride);
    }

    empty() {
        return new HSL();
    }
}

declareIndices(HSL.prototype, ["h", "s", "l", "alpha"]);
