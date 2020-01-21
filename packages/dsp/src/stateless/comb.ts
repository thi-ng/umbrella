import { fract } from "@thi.ng/math";
import { StatelessOscillator } from "../api";

export const comb: StatelessOscillator = (phase, freq, amp = 1, dc = 0) =>
    dc + amp * (8 * (fract(phase * freq) - 0.5) ** 2 - 1);
