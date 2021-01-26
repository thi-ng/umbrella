import { setC4 } from "@thi.ng/vectors";
import type { ColorOp } from "./api";
import { ensureAlpha } from "./internal/ensure-alpha";

/**
 * @remarks
 * https://en.wikipedia.org/wiki/CIE_1931_color_space#CIE_xy_chromaticity_diagram_and_the_CIE_xyY_color_space
 * https://gamedev.stackexchange.com/a/70049
 *
 * @param out
 * @param src
 */
export const xyyXyz: ColorOp = (out, src) => {
    const { 0: x, 1: y, 2: Y } = src;
    return setC4(
        out || src,
        (Y * x) / y,
        Y,
        (Y * (1 - x - y)) / y,
        ensureAlpha(src[3])
    );
};
