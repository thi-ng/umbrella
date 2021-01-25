import { declareIndices, IVector } from "@thi.ng/vectors";
import type { Color, ColorMode } from "./api";
import { AColor } from "./internal/acolor";
import { ensureArgs } from "./internal/ensure-args";

export function rgb(col: Color, offset?: number, stride?: number): RGB;
export function rgb(r?: number, g?: number, b?: number, a?: number): RGB;
export function rgb(...args: any[]) {
    return new RGB(...ensureArgs(args));
}

export class RGB extends AColor<RGB> implements IVector<RGB> {
    r!: number;
    g!: number;
    b!: number;
    alpha!: number;

    get mode(): ColorMode {
        return "rgb";
    }

    copy() {
        return new RGB(this.deref());
    }

    copyView() {
        return new RGB(this.buf, this.offset, this.stride);
    }

    empty() {
        return new RGB();
    }
}

declareIndices(RGB.prototype, ["r", "g", "b", "alpha"]);
