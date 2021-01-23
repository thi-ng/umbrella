import { declareIndices, IVector } from "@thi.ng/vectors";
import type { Color, ColorMode } from "./api";
import { AColor } from "./internal/acolor";
import { ensureArgs } from "./internal/ensure-args";

export function lab(col: Color, offset?: number, stride?: number): LAB;
export function lab(l?: number, a?: number, b?: number, alpha?: number): LAB;
export function lab(...args: any[]) {
    return new LAB(...ensureArgs(args));
}

export class LAB extends AColor<LAB> implements IVector<LAB> {
    l!: number;
    a!: number;
    b!: number;
    alpha!: number;

    get mode() {
        return <ColorMode>"lab";
    }

    copy() {
        return new LAB(this.deref());
    }

    copyView() {
        return new LAB(this.buf, this.offset, this.stride);
    }

    empty() {
        return new LAB();
    }
}

declareIndices(LAB.prototype, ["l", "a", "b", "alpha"]);
