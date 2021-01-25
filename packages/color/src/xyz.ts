import { declareIndices, IVector } from "@thi.ng/vectors";
import type { Color, ColorMode } from "./api";
import { AColor } from "./internal/acolor";
import { ensureArgs } from "./internal/ensure-args";

export function xyz(col: Color, offset?: number, stride?: number): XYZ;
export function xyz(x?: number, y?: number, z?: number, a?: number): XYZ;
export function xyz(...args: any[]) {
    return new XYZ(...ensureArgs(args));
}

export class XYZ extends AColor<XYZ> implements IVector<XYZ> {
    x!: number;
    y!: number;
    z!: number;
    alpha!: number;

    get mode(): ColorMode {
        return "xyz";
    }

    copy() {
        return new XYZ(this.deref());
    }

    copyView() {
        return new XYZ(this.buf, this.offset, this.stride);
    }

    empty() {
        return new XYZ();
    }
}

declareIndices(XYZ.prototype, ["x", "y", "z", "alpha"]);
