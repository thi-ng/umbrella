import { clamp01 } from "@thi.ng/math/interval";
import { fract } from "@thi.ng/math/prec";
import { setC4 } from "@thi.ng/vectors/setc";
import type { Color, ReadonlyColor } from "../api";
import { ensureAlpha } from "../internal/ensure-alpha";

/**
 * Clamps all color channels to [0,1] interval and calls `ensureAlpha`
 * to ensure alpha channel is defined (if missing sets it to `alpha`,
 * default: 1).
 *
 * @param out - result
 * @param src - source color
 * @param alpha - alpha value
 */
export const clamp = (out: Color | null, src: ReadonlyColor, alpha = 1) =>
    setC4(
        out || src,
        clamp01(src[0]),
        clamp01(src[1]),
        clamp01(src[2]),
        ensureAlpha(src[3], alpha)
    );

/**
 * Similar to {@link clamp}, but calls `ensureHue` to fold (instead of
 * clamping) the hue into [0,1] interval.
 *
 * @param out - result
 * @param src - source color
 * @param alpha - alpha value
 */
export const clampH = (out: Color | null, src: ReadonlyColor, alpha = 1) =>
    setC4(
        out || src,
        fract(src[0]),
        clamp01(src[1]),
        clamp01(src[2]),
        ensureAlpha(src[3], alpha)
    );
