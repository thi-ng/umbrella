import { TAU } from "@thi.ng/math/api";
import type { StatelessOscillator } from "./api.js";

/**
 * Returns a {@link StatelessOscillator} function with adjustable waveform based
 * on given `squareness` param (in [0..1) interval). If `squareness = 0` the
 * waveform will be a perfect sine. Higher values morph the waveform
 * increasingly into a square wave.
 *
 * @remarks
 * Interactive graph: https://www.desmos.com/calculator/nbvd97m3kl
 *
 * @param squareness
 */
export const squareSin = (squareness: number): StatelessOscillator => {
	squareness = 1 - squareness;
	return (phase, freq, amp = 1, dc = 0) => {
		const y = Math.sin(phase * freq * TAU);
		return dc + amp * Math.sign(y) * Math.abs(y) ** squareness;
	};
};
