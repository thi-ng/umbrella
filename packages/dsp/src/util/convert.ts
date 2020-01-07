import { TAU } from "@thi.ng/math";

export const normFreq = (f: number, fs: number) => f / fs;

export const freqRad = (f: number) => f * TAU;

/**
 * Converts given linear magnitude to dBFS (i.e. `20 * log10(x)`)
 *
 * @param x
 */
export const magToDB = (x: number) => (20 * Math.log(x)) / Math.LN10;

/**
 * Converts given dBFS value to linear magnitude
 * (i.e. `pow(10, x / 20)`)
 *
 * @param x
 */
export const dbToMag = (x: number) => 10 ** (x / 20);
