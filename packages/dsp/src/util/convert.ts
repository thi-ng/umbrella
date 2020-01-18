import { TAU } from "@thi.ng/math";

export const normFreq = (f: number, fs: number) => f / fs;

export const phaseRad = (f: number) => f * TAU;

export const msFrames = (t: number, fs: number) => t * 0.001 * fs;

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
