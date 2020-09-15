import type { FnN, FnN2 } from "@thi.ng/api";
import { TAU } from "@thi.ng/math";

/**
 * Returns frequency `f` normalized to sample rate `fs`:
 * `fnorm = f / fs`
 *
 * @param f
 * @param fs
 */
export const normFreq: FnN2 = (f, fs) => f / fs;

/**
 * Returns frequency `f` in radians, based on sample rate `fs`.
 * I.e. Nyquist freq = PI
 *
 * @param f
 * @param fs
 */
export const freqRad: FnN2 = (f, fs) => (f / fs) * TAU;

/**
 * Returns period length in milliseconds for given frequency in Hz.
 *
 * @param f
 */
export const freqMs: FnN = (f) => 1000 / f;

/**
 * Reverse op of {@link freqRad}.
 *
 * @param rad
 * @param fs
 */
export const radFreq: FnN2 = (rad, fs) => (rad / TAU) * fs;

/**
 * Returns number of samples for given millisecond period and samle
 * rate.
 *
 * @example
 * ```ts
 * // samples per 20 ms @ 44.1kHz
 * msFrames(20, 44100)
 * // 882
 * ```
 *
 * @param t
 * @param fs
 */
export const msFrames: FnN2 = (t, fs) => t * 0.001 * fs;

/**
 * Reverse op of {@link msFrames}.
 *
 * @param frames
 * @param fs
 */
export const framesMs: FnN2 = (frames, fs) => (frames / fs) * 1000;

/**
 * Converts given linear magnitude to dBFS (i.e. `20 * log10(x)`)
 *
 * @param x
 */
export const magDb: FnN = (x) => (20 * Math.log(x)) / Math.LN10;

/**
 * Converts given dBFS value to linear magnitude
 * (i.e. `pow(10, x / 20)`)
 *
 * @param x
 */
export const dbMag: FnN = (x) => 10 ** (x / 20);
