import { declareIndices, IVector } from "@thi.ng/vectors";
import type { Color } from "./api";
import { ColorMode } from "./constants";
import { AColor } from "./internal/acolor";
import { ensureArgs } from "./internal/ensure-args";

export function rgba(col: Color, offset?: number, stride?: number): RGBA;
export function rgba(r?: number, g?: number, b?: number, a?: number): RGBA;
export function rgba(...args: any[]) {
    return new RGBA(...ensureArgs(args));
}

export class RGBA extends AColor<RGBA> implements IVector<RGBA> {
    r!: number;
    g!: number;
    b!: number;
    a!: number;

    get mode() {
        return ColorMode.RGBA;
    }

    copy() {
        return new RGBA(this.deref());
    }

    copyView() {
        return new RGBA(this.buf, this.offset, this.stride);
    }

    empty() {
        return new RGBA();
    }
}

declareIndices(RGBA.prototype, ["r", "g", "b", "a"]);
