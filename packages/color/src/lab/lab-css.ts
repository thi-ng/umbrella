import { clamp0 } from "@thi.ng/math";
import type { ReadonlyColor } from "../api";
import { FF, PC } from "../api/constants";
import { ensureAlpha } from "../internal/ensure-alpha";

/**
 * @remarks
 * Only supported in CSS Color Level 4 onwards
 * https://drafts.csswg.org/css-color/#specifying-lab-lch
 * https://test.csswg.org/harness/results/css-color-4_dev/grouped/ (test reports)
 *
 * @param src
 */
export const labCss = (src: ReadonlyColor) => {
    const l = PC(clamp0(src[0]));
    const a = FF(src[1] * 100);
    const b = FF(src[2] * 100);
    const alpha = ensureAlpha(src[3]);
    return `lab(${l} ${a} ${b}` + (alpha < 1 ? `/${FF(alpha)})` : ")");
};
