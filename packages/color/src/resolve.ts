import { isArrayLike, isString } from "@thi.ng/checks";
import type { IColor, ReadonlyColor } from "./api";
import { asCss } from "./convert";

/**
 * Takes a color in one of the following formats and tries to convert it
 * to a CSS string:
 *
 * - any IColor instance
 * - raw sRGB vector
 * - number (packed 0xaarrggbb int)
 * - string (unchanged)
 *
 * @param col - source color
 */
export const resolveAsCss = (col: string | number | ReadonlyColor | IColor) =>
    isString(col)
        ? col
        : isArrayLike(col)
        ? isString((<any>col).mode)
            ? asCss(<any>col)
            : asCss(<ReadonlyColor>col, "srgb")
        : asCss(<any>col, "int");
