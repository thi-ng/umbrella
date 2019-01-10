import { declareIndices, IVector } from "@thi.ng/vectors3";
import { Color, ColorMode } from "./api";
import { AColor } from "./internal/acolor";
import { ensureArgs } from "./internal/ctor-args";

export function xyza(col: Color): XYZA
export function xyza(x?: number, y?: number, z?: number, a?: number): XYZA;
export function xyza(...args: any[]) {
    return new XYZA(ensureArgs(args));
}

export class XYZA extends AColor<XYZA> implements
    IVector<XYZA> {

    x: number;
    y: number;
    z: number;
    a: number;

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
