import { fract } from "@thi.ng/math/prec";
import type { StatelessOscillator } from "../api";

export const tri: StatelessOscillator = (phase, freq, amp = 1, dc = 0) =>
    dc + amp * (Math.abs(fract(phase * freq) * 4 - 2) - 1);
