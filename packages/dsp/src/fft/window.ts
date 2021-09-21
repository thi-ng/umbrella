import type { FloatArray, Fn, FnU3, FnU4, NumericArray } from "@thi.ng/api";
import { isNumber } from "@thi.ng/checks/is-number";
import { PI, TAU } from "@thi.ng/math/api";
import type { WindowFn } from "../api";

// https://en.wikipedia.org/wiki/Window_function

const PI4 = 4 * PI;
const PI6 = 6 * PI;
const sin = Math.sin;
const cos = Math.cos;

/**
 * Creates or fills a given buffer with results of window function `fn`.
 * The buffer size MUST be the same as the signal length given to
 * {@link fft}.
 *
 * @param fn
 * @param lenOfBuf
 */
export const window = (fn: WindowFn, lenOfBuf: number | FloatArray) => {
    const buf = isNumber(lenOfBuf) ? new Float64Array(lenOfBuf) : lenOfBuf;
    const n = buf.length - 1;
    for (let i = 0; i <= n; i++) {
        buf[i] = fn(i, n);
    }
    return buf;
};

/**
 * Takes a `signal` and `window` buffer and multiplies both elementwise. Writes
 * results into `out` (or back into `signal` by default).
 *
 * @param signal
 * @param window
 * @param out
 */
export const applyWindow = (
    signal: NumericArray,
    window: NumericArray,
    out = signal
) => {
    for (let i = signal.length; --i >= 0; ) {
        out[i] = signal[i] * window[i];
    }
    return out;
};

export const windowRect: WindowFn = () => 1;

export const windowBartlett: WindowFn = (i, n) =>
    1 - Math.abs((i - n / 2) / (n / 2));

export const windowWelch: WindowFn = (i, n) => 1 - ((i - n / 2) / (n / 2)) ** 2;

export const windowSin: WindowFn = (i, n) => sin((PI * i) / n);

export const windowSinPow: Fn<number, WindowFn> = (k) => (i, n) =>
    sin((PI * i) / n) ** k;

export const windowLanczos: WindowFn = (i, n) => {
    i = PI * ((2 * i) / n - 1);
    return sin(i) / i;
};

const windowCosSum: Fn<number, WindowFn> = (k) => {
    let ik = 1 - k;
    return (i, n) => k - ik * cos((TAU * i) / n);
};

const windowCosSum3: FnU3<number, WindowFn> = (k1, k2, k3) => (i, n) => {
    i /= n;
    return k1 + k2 * cos(TAU * i) + k3 * cos(PI4 * i);
};

const windowCosSum4: FnU4<number, WindowFn> = (k1, k2, k3, k4) => (i, n) => {
    i /= n;
    return k1 + k2 * cos(TAU * i) + k3 * cos(PI4 * i) + k4 * cos(PI6 * i);
};

export const windowHann = windowCosSum(0.5);

export const windowHamming = windowCosSum(0.53836);

export const windowBlackman = windowCosSum3(0.42, -0.5, 0.08);

export const windowBlackmanHarris = windowCosSum4(
    0.35875,
    -0.48829,
    0.14128,
    0.01168
);

export const windowNuttall = windowCosSum4(
    0.355768,
    -0.487396,
    0.144232,
    -0.012604
);

export const windowBlackmanNuttall = windowCosSum4(
    0.3635819,
    -0.4891775,
    0.1365995,
    -0.0106411
);

export const windowGauss =
    (a = 0.4): WindowFn =>
    (i, n) => {
        n /= 2;
        return Math.exp(-0.5 * ((i - n) / (a * n)) ** 2);
    };
