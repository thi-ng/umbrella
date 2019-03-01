import { ICopy, IDeref } from "@thi.ng/api";
import { ColorMode, IColor } from "./api";

/**
 * Returns new `Int32` wrapping given ARGB int.
 *
 * @param rgba
 */
export const int32 = (rgba: number) => new Int32(rgba);

/**
 * Returns new `Int32` wrapping given 24bit RGB color and setting alpha
 * channel set to 100% opaque.
 *
 * @param rgb
 */
export const int24 = (rgb: number) => new Int32((rgb & 0xffffff) | 0xff000000);

export class Int32 implements IColor, ICopy<Int32>, IDeref<number> {
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
