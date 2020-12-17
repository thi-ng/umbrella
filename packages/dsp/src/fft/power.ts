import type { NumericArray } from "@thi.ng/api";
import type { ComplexArray } from "../api";
import { isComplex } from "../util/complex";

/**
 * Computes the `sum(f(i)^2)` for given array.
 *
 * @param window
 */
export const integralT = (window: NumericArray) => {
    let sum = 0;
    for (let i = window.length; --i >= 0; ) {
        // prettier-ignore
        sum += (<number>window[i]) ** 2;
    }
    return sum;
};

/**
 * Computes the `sum(|c(i)|^2)` for given complex array.
 *
 * @param window
 */
export const integralF = ([real, img]: ComplexArray) => {
    let sum = 0;
    for (let i = real.length; --i >= 0; ) {
        sum += real[i] ** 2 + img[i] ** 2;
    }
    return sum;
};

/**
 * Computes sum squared power of given time or frequency domain window.
 *
 * @remarks
 * References:
 * - http://www.it.uom.gr/teaching/linearalgebra/NumericalRecipiesInC/c13-4.pdf
 * - http://www.hep.ucl.ac.uk/~rjn/saltStuff/fftNormalisation.pdf
 *
 * @param window
 */
export const powerSumSquared = (window: NumericArray | ComplexArray) =>
    isComplex(window)
        ? integralF(window) / window[0].length
        : integralT(window);

/**
 * Computes mean squared power of given time or frequency domain window.
 *
 * @remarks
 * References:
 * - http://www.it.uom.gr/teaching/linearalgebra/NumericalRecipiesInC/c13-4.pdf
 * - http://www.hep.ucl.ac.uk/~rjn/saltStuff/fftNormalisation.pdf
 *
 * @param window
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
 * @param window
 */
export const powerTimeIntegral = (
    window: NumericArray | ComplexArray,
    fs: number
) => (isComplex(window) ? integralF(window) : integralT(window)) / fs;
