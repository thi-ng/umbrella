import { IVector } from "@thi.ng/vectors3/api";
import { declareIndices } from "@thi.ng/vectors3/internal/accessors";
import { Color, ColorMode } from "./api";
import { AColor } from "./internal/acolor";
import { ensureArgs } from "./internal/ctor-args";

export function rgba(col: Color): RGBA
export function rgba(r?: number, g?: number, b?: number, a?: number): RGBA;
export function rgba(...args: any[]) {
    return new RGBA(ensureArgs(args));
}

export class RGBA extends AColor<RGBA> implements
    IVector<RGBA> {

    r: number;
    g: number;
    b: number;
    a: number;

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
