import { declareIndices, IVector } from "@thi.ng/vectors";
import type { Color, ColorMode } from "./api";
import { AColor } from "./internal/acolor";
import { ensureArgs } from "./internal/ensure-args";

export function srgba(col: Color, offset?: number, stride?: number): SRGBA;
export function srgba(r?: number, g?: number, b?: number, a?: number): SRGBA;
export function srgba(...args: any[]) {
    return new SRGBA(...ensureArgs(args));
}

export class SRGBA extends AColor<SRGBA> implements IVector<SRGBA> {
    r!: number;
    g!: number;
    b!: number;
    a!: number;

    get mode(): ColorMode {
        return "srgb";
    }

    copy() {
        return new SRGBA(this.deref());
    }

    copyView() {
        return new SRGBA(this.buf, this.offset, this.stride);
    }

    empty() {
        return new SRGBA();
    }
}

declareIndices(SRGBA.prototype, ["r", "g", "b", "a"]);
