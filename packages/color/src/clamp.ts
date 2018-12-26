import { clamp01 } from "@thi.ng/math/interval";
import { setC4 } from "@thi.ng/vectors3/setc";
import { Color, ReadonlyColor } from "./api";
import { ensureAlpha } from "./internal/ensure-alpha";
import { ensureHue } from "./internal/ensure-hue";

/**
 * Clamps all color channels to [0,1] interval and calls `ensureAlpha()`
 * to ensure alpha channel is defined (if missing sets it to `alpha`
 * (default: 1)).
 *
 * @param out
 * @param src
 * @param alpha
 */
export const clamp =
    (out: Color, src: ReadonlyColor, alpha = 1) =>
        setC4(
            out || src,
            clamp01(src[0]),
            clamp01(src[1]),
            clamp01(src[2]),
            ensureAlpha(src[3], alpha)
        );

/**
 * Similar to `clamp`, but calls `ensureHue()` to fold (instead of
 * clamping) the hue into [0,1] interval.
 *
 * @param out
 * @param src
 * @param alpha
 */
export const clampH =
    (out: Color, src: ReadonlyColor, alpha = 1) =>
        setC4(
            out || src,
            ensureHue(src[0]),
            clamp01(src[1]),
            clamp01(src[2]),
            ensureAlpha(src[3], alpha)
        );
