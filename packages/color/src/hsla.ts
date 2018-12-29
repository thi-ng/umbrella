import { IVector } from "@thi.ng/vectors3/api";
import { declareIndices } from "@thi.ng/vectors3/internal/accessors";
import { Color, ColorMode } from "./api";
import { AColor } from "./internal/acolor";
import { ensureArgs } from "./internal/ctor-args";

export function hsla(col: Color): HSLA
export function hsla(h?: number, s?: number, l?: number, a?: number): HSLA;
export function hsla(...args: any[]) {
    return new HSLA(ensureArgs(args));
}

export class HSLA extends AColor<HSLA> implements
    IVector<HSLA> {

    h: number;
    s: number;
    l: number;
    a: number;

    get mode() {
        return ColorMode.HSLA;
    }

    copy() {
        return new HSLA(this.deref());
    }

    copyView() {
        return new HSLA(this.buf, this.offset, this.stride);
    }

    empty() {
        return new HSLA();
    }
}

declareIndices(HSLA.prototype, ["h", "s", "l", "a"]);
