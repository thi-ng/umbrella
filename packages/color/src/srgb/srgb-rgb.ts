import { setC4 } from "@thi.ng/vectors/setc";
import type { ColorOp } from "../api";
import { ensureAlpha } from "../internal/ensure-alpha";
import { srgbLinear } from "../ops/linear";

/**
 * Converts sRGB to linear RGB.
 *
 * @param out - result
 * @param src - source color
 */
export const srgbRgb: ColorOp = (out, src) =>
    setC4(
        out || src,
        srgbLinear(src[0]),
        srgbLinear(src[1]),
        srgbLinear(src[2]),
        ensureAlpha(src[3])
    );

const GAMMA = 2.2;

export const srgbRgbApprox: ColorOp = (out, src) =>
    setC4(
        out || src,
        src[0] ** GAMMA,
        src[1] ** GAMMA,
        src[2] ** GAMMA,
        ensureAlpha(src[3])
    );
