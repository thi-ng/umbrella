import { ICopy, IDeref } from "@thi.ng/api/api";
import { ColorMode, IColor } from "./api";

export const argb =
    (x: number) =>
        new ARGB(x >>> 0);

export class ARGB implements
    IColor,
    ICopy<ARGB>,
    IDeref<number> {

    value: number;

    constructor(col: number) {
        this.value = col;
    }

    get mode() {
        return ColorMode.INT_ARGB;
    }

    copy() {
        return new ARGB(this.value);
    }

    deref() {
        return this.value;
    }
}
