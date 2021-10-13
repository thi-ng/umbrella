import { fract } from "@thi.ng/math/prec";
import type { StatelessOscillator } from "./api.js";

export const rect: StatelessOscillator = (
    phase,
    freq,
    amp = 1,
    dc = 0,
    duty = 0.5
) => dc + amp * (fract(phase * freq) < duty ? 1 : -1);

/**
 * Higher order version of {@link rect} with pre-configured `duty` width
 * (in the (0..1) range).
 *
 * @param duty
 */
export const rectHOF =
    (duty = 0.5): StatelessOscillator =>
    (phase, freq, amp, dc) =>
        rect(phase, freq, amp, dc, duty);
