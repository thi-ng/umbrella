import { TAU } from "@thi.ng/math";
import type { StatelessOscillator } from "../api";

export const cos: StatelessOscillator = (phase, freq, amp = 1, dc = 0) =>
    dc + amp * Math.cos(phase * freq * TAU);
