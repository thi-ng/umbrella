import { U24 } from "@thi.ng/strings/radix";
import type { ReadonlyColor } from "../api";
import { FF } from "../api/constants";
import { __ensureAlpha } from "../internal/ensure";
import { __scale8bit } from "../internal/scale";

export const srgbCss = (src: ReadonlyColor) => {
    const r = __scale8bit(src[0]);
    const g = __scale8bit(src[1]);
    const b = __scale8bit(src[2]);
    const a = __ensureAlpha(src[3]);
    // TODO update to `rgb(${r} ${g} ${b}/${FF(a)})` (CSS L4 syntax)
    return a < 1
        ? `rgba(${r},${g},${b},${FF(a)})`
        : `#${U24((r << 16) | (g << 8) | b)}`;
};
