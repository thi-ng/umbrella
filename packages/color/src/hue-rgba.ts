import { clamp01 } from "@thi.ng/math/interval";
import { setC4 } from "@thi.ng/vectors3/setc";
import { Color, Hue } from "./api";
import { ensureHue } from "./internal/ensure-hue";

/**
 * Converts a normalized hue to RGBA with given optional `alpha`
 * value (default: 1).
 *
 * @param out
 * @param hue
 */
export const hueRgba =
    (out: Color, hue: number, alpha = 1): Color => {
        hue = ensureHue(hue) * 6;
        return setC4(
            out,
            clamp01(Math.abs(hue - 3) - 1),
            clamp01(2 - Math.abs(hue - 2)),
            clamp01(2 - Math.abs(hue - 4)),
            alpha
        );
    };

export const namedHueRgba =
    (out: Color, hue: Hue, alpha = 1) =>
        hueRgba(out, hue / 12, alpha);
