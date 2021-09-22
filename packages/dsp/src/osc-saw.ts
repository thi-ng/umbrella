import { fract } from "@thi.ng/math/prec";
import type { StatelessOscillator } from "./api";

export const saw: StatelessOscillator = (phase, freq, amp = 1, dc = 0) =>
    dc + amp * (1 - 2 * fract(phase * freq));
