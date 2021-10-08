import { setC4 } from "@thi.ng/vectors/setc";
import type { ColorOp } from "../api";
import { ensureAlpha } from "../internal/ensure-alpha";
import { linearSrgb } from "../linear";

/**
 * Converts linear RGB to sRGB.
 *
 * @param out - result
 * @param src - source color
 */
export const rgbSrgb: ColorOp = (out, src) =>
    setC4(
        out || src,
        linearSrgb(src[0]),
        linearSrgb(src[1]),
        linearSrgb(src[2]),
        ensureAlpha(src[3])
    );

const GAMMA = 1 / 2.2;

export const rgbSrgbApprox: ColorOp = (out, src) =>
    setC4(
        out || src,
        src[0] ** GAMMA,
        src[1] ** GAMMA,
        src[2] ** GAMMA,
        ensureAlpha(src[3])
    );
