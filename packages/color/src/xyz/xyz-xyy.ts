import { setC4 } from "@thi.ng/vectors";
import type { ColorOp } from "../api";
import { ensureAlpha } from "../internal/ensure-alpha";

/**
 * @remarks
 * https://en.wikipedia.org/wiki/CIE_1931_color_space#CIE_xy_chromaticity_diagram_and_the_CIE_xyY_color_space
 * https://gamedev.stackexchange.com/a/70049
 *
 * @param out
 * @param src
 */
export const xyzXyy: ColorOp = (out, src) => {
    const { 0: x, 1: y } = src;
    const invSum = 1 / (x + y + src[2]);
    return setC4(out || src, x * invSum, y * invSum, y, ensureAlpha(src[3]));
};
