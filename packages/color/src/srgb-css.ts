import { clamp01 } from "@thi.ng/math";
import { U24 } from "@thi.ng/strings";
import type { ReadonlyColor } from "./api";
import { FF } from "./constants";
import { ensureAlpha } from "./internal/ensure-alpha";

export const srgbCss = (src: ReadonlyColor) => {
    const r = (clamp01(src[0]) * 0xff + 0.5) | 0;
    const g = (clamp01(src[1]) * 0xff + 0.5) | 0;
    const b = (clamp01(src[2]) * 0xff + 0.5) | 0;
    const a = ensureAlpha(src[3]);
    // TODO update to `rgb(${r} ${g} ${b}/${FF(a)})` (CSS L4 syntax)
    return a < 1
        ? `rgba(${r},${g},${b},${FF(a)})`
        : `#${U24((r << 16) | (g << 8) | b)}`;
};
