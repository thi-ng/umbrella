import { isArrayLike, isNumber } from "@thi.ng/checks";
import { ColorMode, ReadonlyColor } from "./api";
import { asCSS } from "./convert";

/**
 * Takes a color in one of the following formats and tries to convert it
 * to a CSS string:
 *
 * - any IColor instance
 * - raw RGBA vector
 * - number ((A)RGB int)
 * - string (unchanged)
 *
 * @param col -
 */
export const resolveAsCSS = (col: any) =>
    isArrayLike(col)
        ? isNumber((<any>col).mode)
            ? asCSS(<any>col)
            : asCSS(<ReadonlyColor>col, ColorMode.RGBA)
        : isNumber(col)
        ? asCSS(col, ColorMode.INT32)
        : col;
