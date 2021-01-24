import { declareIndices, IVector } from "@thi.ng/vectors";
import type { Color, ColorMode } from "./api";
import { AColor } from "./internal/acolor";
import { ensureArgs } from "./internal/ensure-args";

export function hsia(col: Color, offset?: number, stride?: number): HSIA;
export function hsia(h?: number, s?: number, i?: number, a?: number): HSIA;
export function hsia(...args: any[]) {
    return new HSIA(...ensureArgs(args));
}

export class HSIA extends AColor<HSIA> implements IVector<HSIA> {
    h!: number;
    s!: number;
    i!: number;
    a!: number;

    get mode(): ColorMode {
        return "hsi";
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
}

declareIndices(HSIA.prototype, ["h", "s", "i", "a"]);
