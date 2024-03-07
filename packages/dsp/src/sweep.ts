import { addG } from "./addg.js";
import { curve } from "./curve.js";

/**
 * Similar to {@link curve}, but with added accumulation (via
 * {@link addG}). Systax sugar for `addg(curve(...))` and intended for
 * creating oscillator frequency sweeps. By default, the sweep speed is
 * clamped at the given `end` value.
 *
 * @example
 * ```ts tangle:../export/sweep.ts
 * import { adsr, osc, sin, sweep } from "@thi.ng/dsp";
 *
 * // sample rate
 * const FS = 44100
 *
 * // render 2 sec osc sweep from 100 - 10000Hz
 * osc(
 *   sin,
 *   // freq & phase gen
 *   sweep(100 / FS, 10000 / FS, 2 * FS, 0.1),
 *   // amplitude gen / envelope
 *   adsr({ a: 0.5 * FS, r: 1.5 * FS, slen: 0 })
 * ).take(2 * FS)
 * // [...]
 * ```
 *
 * @param start -
 * @param end -
 * @param steps -
 * @param rate -
 * @param clamp - true, if clamp at `end` value
 */
export const sweep = (
	start: number,
	end: number,
	steps: number,
	rate?: number,
	clamp = true
) => addG(curve(start, end, steps, rate, false, clamp));
