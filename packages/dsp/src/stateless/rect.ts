import { fract } from "@thi.ng/math";
import { StatelessOscillator } from "../api";

export const rect: StatelessOscillator = (
    phase,
    freq,
    amp = 1,
    dc = 0,
    duty = 0.5
) => dc + amp * (fract(phase * freq) < duty ? 1 : -1);
