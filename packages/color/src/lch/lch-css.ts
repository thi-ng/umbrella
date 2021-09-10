import { clamp0 } from "@thi.ng/math/interval";
import { fract } from "@thi.ng/math/prec";
import type { ReadonlyColor } from "../api";
import { FF, PC } from "../api/constants";
import { ensureAlpha } from "../internal/ensure-alpha";

/**
 * @remarks
 * Only supported in CSS Color Level 4 onwards
 * https://www.w3.org/TR/css-color-4/#specifying-lab-lch
 * https://test.csswg.org/harness/results/css-color-4_dev/grouped/ (test reports)
 *
 * @param src
 */
export const lchCss = (src: ReadonlyColor) => {
    const l = PC(clamp0(src[0]));
    const c = FF(clamp0(src[1]) * 100);
    const h = FF(fract(src[2]) * 360);
    const a = ensureAlpha(src[3]);
    return `lch(${l} ${c} ${h}` + (a < 1 ? `/${FF(a)})` : ")");
};
