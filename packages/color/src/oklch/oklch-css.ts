import type { ReadonlyColor } from "../api.js";
import { lchCss } from "../lch/lch-css.js";

/**
 * @remarks
 * Only supported in CSS Color Level 4 onwards
 * - https://www.w3.org/TR/css-color-4/#specifying-oklab-oklch
 * - https://test.csswg.org/harness/results/css-color-4_dev/grouped/ (test reports)
 *
 * @param src -
 */
export const oklchCss = (src: ReadonlyColor) => "ok" + lchCss(src);
