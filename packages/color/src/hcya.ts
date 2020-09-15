import { declareIndices, IVector } from "@thi.ng/vectors";
import type { Color } from "./api";
import { ColorMode } from "./constants";
import { AColor } from "./internal/acolor";
import { ensureArgs } from "./internal/ensure-args";

export function hcya(col: Color, offset?: number, stride?: number): HCYA;
export function hcya(h?: number, c?: number, y?: number, a?: number): HCYA;
export function hcya(...args: any[]) {
    return new HCYA(...ensureArgs(args));
}

export class HCYA extends AColor<HCYA> implements IVector<HCYA> {
    h!: number;
    c!: number;
    y!: number;
    a!: number;

    get mode() {
        return ColorMode.HCYA;
    }

    copy() {
        return new HCYA(this.deref());
    }

    copyView() {
        return new HCYA(this.buf, this.offset, this.stride);
    }

    empty() {
        return new HCYA();
    }
}

declareIndices(HCYA.prototype, ["h", "c", "y", "a"]);
