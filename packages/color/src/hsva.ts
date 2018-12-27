import { IVector } from "@thi.ng/vectors3/api";
import { declareIndices } from "@thi.ng/vectors3/internal/accessors";
import { Color, ColorMode } from "./api";
import { AColor } from "./internal/acolor";
import { ensureArgs } from "./internal/ctor-args";

export function hsva(rgba: Color): HSVA
export function hsva(h: number, s: number, v: number, a?: number): HSVA;
export function hsva(...args: any[]) {
    return new HSVA(ensureArgs(args));
}

export class HSVA extends AColor<HSVA> implements
    IVector<HSVA> {

    h: number;
    s: number;
    v: number;
    a: number;

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
