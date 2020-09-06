import { declareIndices, IVector } from "@thi.ng/vectors";
import type { Color } from "./api";
import { ColorMode } from "./constants";
import { AColor } from "./internal/acolor";
import { ensureArgs } from "./internal/ensure-args";

export function xyza(col: Color, offset?: number, stride?: number): XYZA;
export function xyza(x?: number, y?: number, z?: number, a?: number): XYZA;
export function xyza(...args: any[]) {
    return new XYZA(...ensureArgs(args));
}

export class XYZA extends AColor<XYZA> implements IVector<XYZA> {
    x!: number;
    y!: number;
    z!: number;
    a!: number;

    get mode() {
        return ColorMode.XYZA;
    }

    copy() {
        return new XYZA(this.deref());
    }

    copyView() {
        return new XYZA(this.buf, this.offset, this.stride);
    }

    empty() {
        return new XYZA();
    }
}

declareIndices(XYZA.prototype, ["x", "y", "z", "a"]);
