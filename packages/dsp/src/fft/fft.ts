import type { FnN3, NumericArray } from "@thi.ng/api";
import { isNumber } from "@thi.ng/checks";
import type { ComplexArray } from "../api";
import { magDb } from "../util/convert";

const PI = Math.PI;

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
    if (isNumber(src[0])) {
        const n = src.length;
        const dest = new Float64Array(n * 2);
        dest.set(<NumericArray>src);
        for (let i = 1, j = n * 2 - 1; i < n; i++, j--) {
            dest[j] = isImg ? -(<NumericArray>src)[i] : (<NumericArray>src)[i];
        }
        return dest;
    } else {
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
        t = PI / prevStep;
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
    if (isNumber(complex[0])) {
        real = <NumericArray>complex;
    } else {
        real = complex[0];
        img = <NumericArray>complex[1];
    }
    const n = real.length;
    if (window) {
        for (let i = 0; i < n; i++) {
            real[i] *= window[i];
        }
    }

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
 * Inverse FFT via computing forward transform with swapped
 * real/imaginary components. Expects denormalized inputs.
 *
 * @remarks
 *
 * - https://www.dsprelated.com/showarticle/800.php (method #3)
 *
 * @param complex
 */
export const ifft = (src: NumericArray | ComplexArray): ComplexArray => {
    let complex: ComplexArray = isNumber(src[0])
        ? [new Float64Array(src.length), <NumericArray>src]
        : <ComplexArray>src;
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

export const normalizeFFT = (
    complex: ComplexArray,
    N: number = complex[0].length
): ComplexArray => scaleFFT(complex, 2 / N);

export const denormalizeFFT = (
    complex: ComplexArray,
    N: number = complex[0].length
): ComplexArray => scaleFFT(complex, N / 2);

/**
 * Computes magnitude spectrum for given FFT. By default only the first
 * N/2 values are returned.
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
        out[i] = Math.sqrt(real[i] ** 2 + img[i] ** 2);
    }
    return out;
};

/**
 * Computes power spectrum (optionally as dBFS) for the given raw,
 * unnormalized FFT result arrays (length = N) and writes result to
 * `out`.
 *
 * @remarks
 * By default only the first N/2 values are returned. If `db` is true,
 * the spectrum values are converted to dBFS.
 *
 * - https://www.kvraudio.com/forum/viewtopic.php?t=276092
 *
 * @param complex
 * @param db
 * @param n
 * @param out
 */
export const spectrumPow = (
    complex: ComplexArray,
    db = false,
    n = complex[0].length / 2,
    out: NumericArray = [],
    scale: number = 1 / Math.sqrt(complex[0].length)
) => {
    const [real, img] = complex;
    for (let i = 0; i < n; i++) {
        const p = (scale * real[i]) ** 2 + (scale * img[i]) ** 2;
        out[i] = db ? magDb(Math.sqrt(p)) : p;
    }
    return out;
};

/**
 * Computes phase spectrum for given FFT and writes results to `out`. By
 * default only the first N/2 values are returned.
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
export const freqBin: FnN3 = (f: number, fs: number, n: number) =>
    ((f * n) / fs) | 0;

/**
 * Returns frequency for given FFT bin index, sample rate and window
 * size. See {@link freqBin} for reverse op.
 *
 * @param bin - bin
 * @param fs - sample rate
 * @param n - window size
 */
export const binFreq: FnN3 = (bin: number, fs: number, n: number) =>
    (bin * fs) / n;

/**
 * Returns array of bin center frequencies for given FFT window size and
 * sample rate. By default only the first N/2 values are returned.
 *
 * @param n
 * @param fs
 * @param m
 */
export const fftFreq = (n: number, fs: number, m = n / 2) => {
    const res = new Float64Array(m);
    for (let i = 0; i < m; i++) {
        res[i] = binFreq(i, fs, n);
    }
    return res;
};
