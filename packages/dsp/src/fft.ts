import { NumericArray } from "@thi.ng/api";
import { isNumber } from "@thi.ng/checks";
import { ComplexArray } from "./api";

const PI = Math.PI;

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
 * @param real
 * @param img
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
 * @param real
 * @param img
 */
export const ifft = (complex: ComplexArray): ComplexArray => {
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

export const normalizeFFT = (complex: ComplexArray): ComplexArray =>
    scaleFFT(complex, 1 / Math.sqrt(complex[0].length));

export const denormalizeFFT = (complex: ComplexArray): ComplexArray =>
    scaleFFT(complex, Math.sqrt(complex[0].length));

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
 * Computes power spectrum for the given FFT result arrays (length = N)
 * and writes result to `out`.
 *
 * @remarks
 * By default only the first N/2 values are returned.
 *
 * Also by default, the FFT inputs are expected to be normalized (e.g.
 * via {@link normalizeFFT}) and spectrum values converted to dB.
 *
 * @param real
 * @param img
 * @param normalized
 * @param db
 * @param n
 * @param out
 */
export const spectrumPow = (
    complex: ComplexArray,
    normalized = true,
    db = true,
    n = complex[0].length / 2,
    out: NumericArray = []
) => {
    const [real, img] = complex;
    const scale = normalized ? 1 : 1 / real.length;
    for (let i = 0; i < n; i++) {
        const p = (real[i] ** 2 + img[i] ** 2) * scale;
        out[i] = db ? 20 * (Math.log(p) / Math.LN10) : p;
    }
    return out;
};

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
