import { declareIndices, IVector } from "@thi.ng/vectors";
import type { Color, ColorMode } from "./api";
import { AColor } from "./internal/acolor";
import { ensureArgs } from "./internal/ensure-args";

export function ycc(col: Color, offset?: number, stride?: number): YCC;
export function ycc(y: number, b: number, r: number, a?: number): YCC;
export function ycc(...args: any[]) {
    return new YCC(...ensureArgs(args));
}

export class YCC extends AColor<YCC> implements IVector<YCC> {
    y!: number;
    cb!: number;
    cr!: number;
    alpha!: number;

    get mode(): ColorMode {
        return "ycc";
    }

    copy() {
        return new YCC(this.deref());
    }

    copyView() {
        return new YCC(this.buf, this.offset, this.stride);
    }

    empty() {
        return new YCC();
    }
}

declareIndices(YCC.prototype, ["y", "cb", "cr", "alpha"]);
