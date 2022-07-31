import type { NumericArray } from "@thi.ng/api";
import { isNumber } from "@thi.ng/checks/is-number";
import type { ComplexArray } from "./api.js";
import { isComplex } from "./complex.js";

/**
 * Computes the sum of the given array.
 *
 * @param window -
 */
export const integralT = (window: NumericArray) => {
	let sum = 0;
	for (let i = window.length; i-- > 0; ) {
		sum += window[i];
	}
	return sum;
};

/**
 * Computes the squared sum of given array.
 *
 * @param window -
 */
export const integralTSquared = (window: NumericArray) => {
	let sum = 0;
	for (let i = window.length; i-- > 0; ) {
		sum += window[i] ** 2;
	}
	return sum;
};

/**
 * Computes the `sum(|c(i)|)` for given complex array.
 *
 * @param window -
 */
export const integralF = ([real, img]: ComplexArray) => {
	let sum = 0;
	for (let i = real.length; i-- > 0; ) {
		sum += Math.hypot(real[i], img[i]);
	}
	return sum;
};

/**
 * Computes the `sum(|c(i)|^2)` for given complex array.
 *
 * @param window -
 */
export const integralFSquared = ([real, img]: ComplexArray) => {
	let sum = 0;
	for (let i = real.length; i-- > 0; ) {
		sum += real[i] ** 2 + img[i] ** 2;
	}
	return sum;
};

/**
 * If `scale` is a number, returns it. Else returns `base / integralT(scale)`.
 *
 * @param scale -
 * @param base -
 */
export const powerScale = (scale: number | NumericArray, base = 1) =>
	isNumber(scale) ? scale : base / integralT(scale);

/**
 * If `scale` is a number, returns it. Else returns `integralT(scale) / base`.
 *
 * @param scale -
 * @param base -
 */
export const invPowerScale = (scale: number | NumericArray, base = 1) =>
	isNumber(scale) ? scale : integralT(scale) / base;

/**
 * Computes sum squared power of given time or frequency domain window.
 *
 * @remarks
 * References:
 * - http://www.it.uom.gr/teaching/linearalgebra/NumericalRecipiesInC/c13-4.pdf
 * - http://www.hep.ucl.ac.uk/~rjn/saltStuff/fftNormalisation.pdf
 *
 * @param window -
 */
export const powerSumSquared = (window: NumericArray | ComplexArray) =>
	isComplex(window)
		? integralFSquared(window) / window[0].length
		: integralTSquared(window);

/**
 * Computes mean squared power of given time or frequency domain window.
 *
 * @remarks
 * References:
 * - http://www.it.uom.gr/teaching/linearalgebra/NumericalRecipiesInC/c13-4.pdf
 * - http://www.hep.ucl.ac.uk/~rjn/saltStuff/fftNormalisation.pdf
 *
 * @param window -
 */
export const powerMeanSquared = (window: NumericArray | ComplexArray) =>
	powerSumSquared(window) /
	(isComplex(window) ? window[0].length : window.length);

/**
 * Computes time-integral squared power of given time or frequency domain
 * window.
 *
 * @remarks
 * References:
 * - http://www.it.uom.gr/teaching/linearalgebra/NumericalRecipiesInC/c13-4.pdf
 * - http://www.hep.ucl.ac.uk/~rjn/saltStuff/fftNormalisation.pdf
 *
 * @param window -
 */
export const powerTimeIntegral = (
	window: NumericArray | ComplexArray,
	fs: number
) =>
	(isComplex(window) ? integralFSquared(window) : integralTSquared(window)) /
	fs;
