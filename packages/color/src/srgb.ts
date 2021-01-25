import { declareIndices, IVector } from "@thi.ng/vectors";
import type { Color, ColorMode } from "./api";
import { AColor } from "./internal/acolor";
import { ensureArgs } from "./internal/ensure-args";

export function srgb(col: Color, offset?: number, stride?: number): SRGB;
export function srgb(r?: number, g?: number, b?: number, a?: number): SRGB;
export function srgb(...args: any[]) {
    return new SRGB(...ensureArgs(args));
}

export class SRGB extends AColor<SRGB> implements IVector<SRGB> {
    r!: number;
    g!: number;
    b!: number;
    alpha!: number;

    get mode(): ColorMode {
        return "srgb";
    }

    copy() {
        return new SRGB(this.deref());
    }

    copyView() {
        return new SRGB(this.buf, this.offset, this.stride);
    }

    empty() {
        return new SRGB();
    }
}

declareIndices(SRGB.prototype, ["r", "g", "b", "alpha"]);
