import { declareIndices, IVector } from "@thi.ng/vectors";
import type { Color } from "./api";
import { ColorMode } from "./constants";
import { AColor } from "./internal/acolor";
import { ensureArgs } from "./internal/ensure-args";

export function hsva(col: Color, offset?: number, stride?: number): HSVA;
export function hsva(h?: number, s?: number, v?: number, a?: number): HSVA;
export function hsva(...args: any[]) {
    return new HSVA(...ensureArgs(args));
}

export class HSVA extends AColor<HSVA> implements IVector<HSVA> {
    h!: number;
    s!: number;
    v!: number;
    a!: number;

    get mode() {
        return ColorMode.HSVA;
    }

    copy() {
        return new HSVA(this.deref());
    }

    copyView() {
        return new HSVA(this.buf, this.offset, this.stride);
    }

    empty() {
        return new HSVA();
    }
}

declareIndices(HSVA.prototype, ["h", "s", "v", "a"]);
