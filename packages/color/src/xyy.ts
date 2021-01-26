import { declareIndices, IVector } from "@thi.ng/vectors";
import type { Color, ColorMode } from "./api";
import { AColor } from "./internal/acolor";
import { ensureArgs } from "./internal/ensure-args";

export function xyy(col: Color, offset?: number, stride?: number): XYY;
export function xyy(r?: number, g?: number, b?: number, a?: number): XYY;
export function xyy(...args: any[]) {
    return new XYY(...ensureArgs(args));
}

export class XYY extends AColor<XYY> implements IVector<XYY> {
    x!: number;
    y!: number;
    Y!: number;
    alpha!: number;

    get mode(): ColorMode {
        return "xyy";
    }

    copy() {
        return new XYY(this.deref());
    }

    copyView() {
        return new XYY(this.buf, this.offset, this.stride);
    }

    empty() {
        return new XYY();
    }
}

declareIndices(XYY.prototype, ["x", "y", "Y", "alpha"]);
