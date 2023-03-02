import type { ReadonlyColor } from "../api.js";
import { __labCss } from "../internal/css.js";

/**
 * @remarks
 * Only supported in CSS Color Level 4 onwards
 * https://www.w3.org/TR/css-color-4/#specifying-lab-lch
 * https://test.csswg.org/harness/results/css-color-4_dev/grouped/ (test reports)
 *
 * @param src -
 */
export const labCss = (src: ReadonlyColor) => __labCss("lab", src, 100);
