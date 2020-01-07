import { mix as _mix } from "@thi.ng/math";
import { StatelessOscillator } from "../api";

export const mix = (
    osc1: StatelessOscillator,
    osc2: StatelessOscillator
): StatelessOscillator => (phase, freq, amp = 1, dc = 0, t = 0.5) =>
    _mix(osc1(phase, freq, amp, dc), osc2(phase, freq, amp, dc), t);
