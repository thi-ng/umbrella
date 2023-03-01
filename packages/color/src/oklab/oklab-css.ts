import type { ReadonlyColor } from "../api.js";
import { labCss } from "../lab/lab-css.js";

/**
 * @remarks
 * Only supported in CSS Color Level 4 onwards
 * - https://www.w3.org/TR/css-color-4/#specifying-oklab-oklch
 * - https://test.csswg.org/harness/results/css-color-4_dev/grouped/ (test reports)
 *
 * @param src -
 */
export const oklabCss = (src: ReadonlyColor) => "ok" + labCss(src);
