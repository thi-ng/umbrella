import { addG } from "./addg";
import { curve } from "./curve";

/**
 * Similar to {@link curve}, but with added accumulation (via
 * {@link addG}). Systax sugar for `addg(curve(...))` and intended for
 * creating oscillator frequency sweeps. By default, the sweep speed is
 * clamped at the given `end` value.
 *
 * @example
 * ```ts
 * // render 2 sec osc sweep from 100 - 10000Hz
 * // FS = 44100
 * osc(
 *   sin,
 *   // freq & phase gen
 *   sweep(100 / FS, 10000 / FS, 2 * FS, 0.1),
 *   // amplitude gen / envelope
 *   adsr(0.5 * FS, 1.5 * FS, 0)
 * ).take(2 * fs)
 * // [...]
 * ```
 *
 * @param start
 * @param end
 * @param steps
 * @param rate
 * @param clamp - true, if clamp at `end` value
 */
export const sweep = (
    start: number,
    end: number,
    steps: number,
    rate?: number,
    clamp = true
) => addG(curve(start, end, steps, rate, false, clamp));
