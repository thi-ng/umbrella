import { TAU } from "@thi.ng/math";

/**
 * Returns frequency `f` normalized to sample rate `fs`:
 * `fnorm = f / fs`
 *
 * @param f
 * @param fs
 */
export const normFreq = (f: number, fs: number) => f / fs;

/**
 * Returns frequency `f` in radians, based on sample rate `fs`.
 * I.e. Nyquist freq = PI
 *
 * @param f
 * @param fs
 */
export const freqRad = (f: number, fs: number) => (f / fs) * TAU;

/**
 * Returns period length in milliseconds for given frequency in Hz.
 *
 * @param f
 */
export const freqMs = (f: number) => 1000 / f;

/**
 * Reverse op of {@link freqRad}.
 *
 * @param rad
 * @param fs
 */
export const radFreq = (rad: number, fs: number) => (rad / TAU) * fs;

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
export const msFrames = (t: number, fs: number) => t * 0.001 * fs;

/**
 * Reverse op of {@link msFrames}.
 *
 * @param frames
 * @param fs
 */
export const framesMs = (frames: number, fs: number) => (frames / fs) * 1000;

/**
 * Converts given linear magnitude to dBFS (i.e. `20 * log10(x)`)
 *
 * @param x
 */
export const magDb = (x: number) => (20 * Math.log(x)) / Math.LN10;

/**
 * Converts given dBFS value to linear magnitude
 * (i.e. `pow(10, x / 20)`)
 *
 * @param x
 */
export const dbMag = (x: number) => 10 ** (x / 20);
