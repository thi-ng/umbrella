import { declareIndices, IVector } from "@thi.ng/vectors";
import type { Color, ColorMode } from "./api";
import { AColor } from "./internal/acolor";
import { ensureArgs } from "./internal/ensure-args";

export function lab(col: Color, offset?: number, stride?: number): Lab;
export function lab(l?: number, a?: number, b?: number, alpha?: number): Lab;
export function lab(...args: any[]) {
    return new Lab(...ensureArgs(args));
}

export class Lab extends AColor<Lab> implements IVector<Lab> {
    l!: number;
    a!: number;
    b!: number;
    alpha!: number;

    get mode(): ColorMode {
        return "lab";
    }

    copy() {
        return new Lab(this.deref());
    }

    copyView() {
        return new Lab(this.buf, this.offset, this.stride);
    }

    empty() {
        return new Lab();
    }
}

declareIndices(Lab.prototype, ["l", "a", "b", "alpha"]);
