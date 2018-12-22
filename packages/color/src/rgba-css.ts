import { clamp01 } from "@thi.ng/math/interval";
import { U24 } from "@thi.ng/strings/radix";
import { FF, ReadonlyColor } from "./api";
import { ensureAlpha } from "./ensure-alpha";

export const rgbaCss =
    (rgba: ReadonlyColor) => {
        const r = (clamp01(rgba[0]) * 0xff) | 0;
        const g = (clamp01(rgba[1]) * 0xff) | 0;
        const b = (clamp01(rgba[2]) * 0xff) | 0;
        const a = ensureAlpha(rgba[3]);
        return (a < 1) ?
            `rgba(${r},${g},${b},${FF(a)})` :
            `#${U24(r << 16 | g << 8 | b)}`
    };
