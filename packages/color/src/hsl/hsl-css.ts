import { clamp01 } from "@thi.ng/math/interval";
import { fract } from "@thi.ng/math/prec";
import type { ReadonlyColor } from "../api.js";
import { FF, PC } from "../api/constants.js";
import { __ensureAlpha } from "../internal/ensure.js";

export const hslCss = (src: ReadonlyColor) => {
    const h = FF(fract(src[0]) * 360);
    const s = PC(clamp01(src[1]));
    const l = PC(clamp01(src[2]));
    const a = __ensureAlpha(src[3]);
    // TODO update to new syntax once CSS Color L4 is more widely supported
    // https://www.w3.org/TR/css-color-4/#serializing-lab-lch
    // https://test.csswg.org/harness/results/css-color-4_dev/grouped/ (test reports)
    // return `hsl(${h} ${s} ${l}` + (a < 1 ? `/${FF(a)})` : ")");
    return a < 1 ? `hsla(${h},${s},${l},${FF(a)})` : `hsl(${h},${s},${l})`;
};
