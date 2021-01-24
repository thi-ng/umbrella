import type { ICopy, IDeref } from "@thi.ng/api";
import type { ColorMode, IColor } from "./api";

/**
 * Returns new {@link Int32} wrapping given ARGB int.
 *
 * @param rgba - packed ARGB int
 */
export const int32 = (rgba: number) => new Int32(rgba);

/**
 * Returns new {@link Int32} wrapping given 24bit RGB color and setting alpha
 * channel set to 100% opaque.
 *
 * @param rgb - packed RGB int
 */
export const int24 = (rgb: number) => new Int32(rgb | 0xff000000);

export class Int32 implements IColor, ICopy<Int32>, IDeref<number> {
    value: number;

    constructor(col: number) {
        this.value = col >>> 0;
    }

    get mode(): ColorMode {
        return "int";
    }

    copy() {
        return new Int32(this.value);
    }

    deref() {
        return this.value;
    }
}
