import type { FnN3, NumericArray } from "@thi.ng/api";
import type { ComplexArray } from "../api";
import { isComplex } from "../util/complex";
import { magDb } from "../util/convert";
import { invPowerScale, powerScale } from "./power";
import { applyWindow } from "./window";

/**
 * Returns a new tuple of real/img F64 buffers of given size.
 *
 * @param n
 */
export const complexArray = (n: number): ComplexArray => [
    new Float64Array(n),
    new Float64Array(n),
];

/**
 * Creates a deep copy of given {@link ComplexArray}.
 *
 * @param complex
 */
export const copyComplex = (complex: ComplexArray): ComplexArray => [
    complex[0].slice(),
    complex[1].slice(),
];

/**
 * If given a {@link ComplexArray}, computes the complex conjugate,
 * concatenates it in mirrored order to input (excluding bin 0) and
 * returns it as new (complex) array.
 *
 * @remarks
 * The length of the input buffer(s) is assumed to be a power of 2.
 *
 * If given a {@link @thi.ng/api#NumericArray}, the `isImg` arg chooses
 * from one of the following operations: If `true` (default), returns
 * new array with *negated* values concatenated in reverse order. If
 * `false`, returns new array with *original* values concatenated in
 * reverse order.
 *
 * @example
 * ```ts
 * conjugate([0, 3, 2, 1], true)
 * // Float64Array [ 0, 3, 2, 1, 0, -1, -2, -3 ]
 *
 * conjugate([0, 3, 2, 1], false)
 * // Float64Array [ 0, 3, 2, 1, 0, 1, 2, 3 ]
 *
 * conjugate([[0, 1, 0, 1], [0, -0.5, 0, -0.25]])
 * [
 *   Float64Array [ 0, 1, 0, 1, 0, 1, 0, 1 ],
 *   Float64Array [ 0, -0.5, 0, -0.25, 0, 0.25, 0, 0.5 ]
 * ]
 * ```
 *
 * @example
 * ```ts
 * // generate single-period sine (window size = 16)
 * ifft(conjugate([0, -8, 0, 0, 0, 0, 0, 0]))[0]
 * // [
 * //   0, 0.383, 0.707, 0.924,
 * //   1, 0.924, 0.707, 0.383,
 * //   0, -0.384, -0.707, -0.924,
 * //   -1, -0.924, -0.707, -0.383
 * // ]
 * ```
 *
 * @param src
 * @param isImg
 */
export function conjugate(src: NumericArray, isImg?: boolean): NumericArray;
export function conjugate(complex: ComplexArray): ComplexArray;
export function conjugate(src: NumericArray | ComplexArray, isImg = true): any {
    if (isComplex(src)) {
        const n = src[0].length;
        const res = complexArray(n * 2);
        const [sreal, simg] = <ComplexArray>src;
        const [dreal, dimg] = res;
        (<Float64Array>dreal).set(sreal);
        (<Float64Array>dimg).set(simg);
        for (let i = 1, j = n * 2 - 1; i < n; i++, j--) {
            dreal[j] = sreal[i];
            dimg[j] = -simg[i];
        }
        return res;
    } else {
        const n = src.length;
        const dest = new Float64Array(n * 2);
        dest.set(<NumericArray>src);
        for (let i = 1, j = n * 2 - 1; i < n; i++, j--) {
            dest[j] = isImg ? -(<NumericArray>src)[i] : (<NumericArray>src)[i];
        }
        return dest;
    }
}

const swapR = (real: NumericArray, n: number) => {
    const n2 = n >> 1;
    let ii: number;
    let jj: number;
    let k: number;
    let t: number;
    for (let i = 1, j = 1; i < n; i++) {
        if (i < j) {
            ii = i - 1;
            jj = j - 1;
            t = real[jj];
            real[jj] = real[ii];
            real[ii] = t;
        }
        k = n2;
        while (k < j) {
            j -= k;
            k >>= 1;
        }
        j += k;
    }
};

const swapRI = (real: NumericArray, img: NumericArray, n: number) => {
    const n2 = n >> 1;
    let ii: number;
    let jj: number;
    let k: number;
    let t: number;
    for (let i = 1, j = 1; i < n; i++) {
        if (i < j) {
            ii = i - 1;
            jj = j - 1;
            t = real[jj];
            real[jj] = real[ii];
            real[ii] = t;
            t = img[jj];
            img[jj] = img[ii];
            img[ii] = t;
        }
        k = n2;
        while (k < j) {
            j -= k;
            k >>= 1;
        }
        j += k;
    }
};

const transform = (real: NumericArray, img: NumericArray, n: number) => {
    let step = 1;
    let prevStep: number;
    let i: number, j: number, ii: number, ip: number;
    let tr: number, ti: number;
    let ur: number, ui: number;
    let wr: number, wi: number;
    let t: number;
    for (let b = Math.ceil(Math.log2(n)); --b >= 0; ) {
        prevStep = step;
        step <<= 1;
        ur = 1;
        ui = 0;
        t = Math.PI / prevStep;
        wr = Math.cos(t);
        wi = -Math.sin(t);
        for (j = 1; j <= prevStep; j++) {
            for (i = j; i <= n; i += step) {
                ip = i + prevStep - 1;
                ii = i - 1;
                tr = real[ip] * ur - img[ip] * ui;
                ti = real[ip] * ui + img[ip] * ur;
                real[ip] = real[ii] - tr;
                img[ip] = img[ii] - ti;
                real[ii] += tr;
                img[ii] += ti;
            }
            t = ur;
            ur = t * wr - ui * wi;
            ui = t * wi + ui * wr;
        }
    }
};

/**
 * Computes in-place forward FFT for given real/imaginary component
 * buffers (each MUST be pow2 length), optionally with windowing.
 *
 * @remarks
 * If `window` is given, the `real` array will be pre-multiplied with
 * the `window`.
 *
 * No result scaling / normalization is performed. Use
 * {@link normalizeFFT} for that purpose.
 *
 * - https://www.earlevel.com/main/2002/08/31/a-gentle-introduction-to-the-fft/
 * - https://www.earlevel.com/main/2019/04/30/waveutils-updated/
 * - https://betterexplained.com/articles/an-interactive-guide-to-the-fourier-transform/
 * - http://toxi.co.uk/p5/fftDebug/fft4amit.pde
 *
 * @param complex
 * @param window
 */
export const fft = (
    complex: NumericArray | ComplexArray,
    window?: NumericArray
): ComplexArray => {
    let real: NumericArray, img: NumericArray | undefined;
    if (isComplex(complex)) {
        real = complex[0];
        img = <NumericArray>complex[1];
    } else {
        real = <NumericArray>complex;
    }
    if (window) {
        applyWindow(real, window);
    }
    const n = real.length;
    if (img) {
        swapRI(real, img, n);
    } else {
        swapR(real, n);
        img = new Float64Array(n);
    }

    transform(real, img, n);

    return [real, img];
};

/**
 * Inverse FFT via computing forward transform with swapped real/imaginary
 * components. Expects denormalized inputs (i.e. the same as the result of
 * {@link fft}).
 *
 * @remarks
 *
 * - https://www.dsprelated.com/showarticle/800.php (method #3)
 *
 * @param complex
 */
export const ifft = (src: NumericArray | ComplexArray): ComplexArray => {
    let complex: ComplexArray = isComplex(src)
        ? src
        : [new Float64Array(src.length), <NumericArray>src];
    fft([complex[1], complex[0]]);
    return scaleFFT(complex, 1 / complex[0].length);
};

export const scaleFFT = (
    complex: ComplexArray,
    scale: number
): ComplexArray => {
    const [real, img] = complex;
    const n = real.length;
    for (let i = 0; i < n; i++) {
        real[i] *= scale;
        img[i] *= scale;
    }
    return [real, img];
};

/**
 * Normalizes the complex FFT array by scaling each complex bin value with given
 * scale factor (or, if given as array, the scale factor derived from these
 * window function samples).
 *
 * @remarks
 * By default assumes a rectangular window and the resulting scale factor of 2 /
 * N.
 *
 * References:
 * - https://holometer.fnal.gov/GH_FFT.pdf
 *
 * @param complex
 * @param window
 */
export const normalizeFFT = (
    complex: ComplexArray,
    window: number | NumericArray = 2 / complex[0].length
): ComplexArray => scaleFFT(complex, powerScale(window, 2));

/**
 * Inverse operation of {@link normalizeFFT}. De-normalizes the complex FFT
 * array by scaling each complex bin value with given scale factor (or, if given
 * as array, the scale factor derived from these window function samples).
 *
 * @remarks
 * By default assumes a rectangular window and the resulting scale factor of N /
 * 2.
 *
 * References:
 * - https://holometer.fnal.gov/GH_FFT.pdf
 *
 * @param complex
 * @param window
 */
export const denormalizeFFT = (
    complex: ComplexArray,
    window: number | NumericArray = complex[0].length / 2
): ComplexArray => scaleFFT(complex, invPowerScale(window, 2));

/**
 * Computes the magnitude of each FFT bin and if less than given `eps`
 * threshold, sets that bin to zero. Returns input FFT array.
 *
 * @remarks
 * It's recommended to apply this function prior computing
 * {@link spectrumPhase}. The `eps` value might have to be adjusted and should
 * be approx. `max(spectrumMag(fft))/10000`.
 *
 * References:
 * - https://www.gaussianwaves.com/2015/11/interpreting-fft-results-obtaining-magnitude-and-phase-information/
 *
 * @param complex
 * @param eps
 */
export const thresholdFFT = (complex: ComplexArray, eps = 1e-12) => {
    const [real, img] = complex;
    for (let i = 0, n = real.length; i < n; i++) {
        if (Math.hypot(real[i], img[i]) < eps) {
            real[i] = img[i] = 0;
        }
    }
    return complex;
};

/**
 * Computes magnitude spectrum for given FFT: y(i) = abs(c(i)). By default only
 * the first N/2 values are returned.
 *
 * @param complex - FFT result
 * @param n - bin count
 * @param out - result array
 */
export const spectrumMag = (
    complex: ComplexArray,
    n = complex[0].length / 2,
    out: NumericArray = []
) => {
    const [real, img] = complex;
    for (let i = 0; i < n; i++) {
        out[i] = Math.hypot(real[i], img[i]);
    }
    return out;
};

/**
 * Computes power spectrum (optionally as dBFS) for the given FFT result arrays
 * (length = N) and optional `window`. Writes result to `out` or a new array.
 *
 * @remarks
 * If `window` is given (scale factor or array), it will be used as (if number)
 * or to compute the scaling factor (if array) for each FFT bin's value. The
 * default (`window=1`) is the equivalent to a rectangular window (i.e. a
 * no-op). If windowing was used to compute the FFT, the same should be provided
 * to this function for correct results.
 *
 * **IMPORTANT:** If the FFT result has already been normalized using
 * {@link normalizeFFT}, the scaling factor (`window` arg) MUST be set 1.0.
 *
 * By default only the first N/2 values are returned. If `db` is true, the
 * spectrum values are converted to dBFS.
 *
 * - https://holometer.fnal.gov/GH_FFT.pdf
 * - https://dsp.stackexchange.com/a/32080
 * - https://dsp.stackexchange.com/a/14935
 * - https://www.kvraudio.com/forum/viewtopic.php?t=276092
 *
 * @param complex
 * @param db
 * @param n
 * @param window
 * @param out
 */
export const spectrumPow = (
    complex: ComplexArray,
    db = false,
    n = complex[0].length / 2,
    window: number | NumericArray = 2 / complex[0].length,
    out: NumericArray = []
) => {
    const [real, img] = complex;
    const scale = powerScale(window, 2);
    for (let i = 0; i < n; i++) {
        const p = real[i] ** 2 + img[i] ** 2;
        out[i] = db ? magDb(Math.sqrt(p) * scale) : p * scale;
    }
    return out;
};

/**
 * Computes phase spectrum for given FFT and writes results to `out`. By default
 * only the first N/2 values are returned.
 *
 * @remarks
 * Consider applying {@link thresholdFFT} prior to computing the phase spectrum
 * to avoid exploding floating point error magnitudes.
 *
 * @param complex - FFT result
 * @param n - bin count
 * @param out - result array
 */
export const spectrumPhase = (
    complex: ComplexArray,
    n = complex[0].length / 2,
    out: NumericArray = []
) => {
    const [real, img] = complex;
    for (let i = 0; i < n; i++) {
        out[i] = Math.atan2(img[i], real[i]);
    }
    return out;
};

/**
 * Returns FFT bin index for given frequency, sample rate and window
 * size. See {@link binFreq} for reverse op.
 *
 * @param f - frequency
 * @param fs - sample rate
 * @param n - window size
 */
export const freqBin: FnN3 = (f, fs, n) => ((f * n) / fs) | 0;

/**
 * Returns frequency for given FFT bin index, sample rate and window
 * size. See {@link freqBin} for reverse op.
 *
 * @param bin - bin
 * @param fs - sample rate
 * @param n - window size
 */
export const binFreq: FnN3 = (bin, fs, n) => (bin * fs) / n;

/**
 * Returns array of bin center frequencies for given FFT window size and sample
 * rate. By default only the first N/2+1 values are returned (`m` and including
 * 0Hz).
 *
 * @param n - window size
 * @param fs - sample rate
 * @param m - number of result values
 */
export const fftFreq = (n: number, fs: number, m = n / 2) => {
    const res = new Float64Array(m);
    for (let i = 0; i <= m; i++) {
        res[i] = binFreq(i, fs, n);
    }
    return res;
};
