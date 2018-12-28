import { ICopy, IDeref } from "@thi.ng/api/api";
import { ColorMode, IColor } from "./api";

export const int32 =
    (x: number) =>
        new Int32(x);

export const int24 =
    (x: number) =>
        new Int32((x & 0xffffff) | 0xff000000);

export class Int32 implements
    IColor,
    ICopy<Int32>,
    IDeref<number> {

    value: number;

    constructor(col: number) {
        this.value = col >>> 0;
    }

    get mode() {
        return ColorMode.INT32;
    }

    copy() {
        return new Int32(this.value);
    }

    deref() {
        return this.value;
    }
}
