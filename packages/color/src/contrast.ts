import type { MaybeColor } from "./api.js";
import { luminanceRgb } from "./luminance-rgb.js";
import { rgb } from "./rgb/rgb.js";

/**
 * Computes the WCAG 2.0 contrast ratio of the two given colors (order is
 * irrelevant). Contrast ratios can range from 1 to 21.
 *
 * @remarks
 * For accessibility guideline conformance, the visual presentation of text must
 * have a minimum contrast ratio of at least 4.5 (with some exceptions).
 *
 * Reference: https://www.w3.org/TR/WCAG20/#contrast-ratiodef
 *
 * @param a
 * @param b
 */
export const contrast = (a: MaybeColor, b: MaybeColor) => {
	const lumA = luminanceRgb(rgb(a)) + 0.05;
	const lumB = luminanceRgb(rgb(b)) + 0.05;
	return lumA > lumB ? lumA / lumB : lumB / lumA;
};
