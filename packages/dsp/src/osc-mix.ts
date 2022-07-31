import { mix as _mix } from "@thi.ng/math/mix";
import type { StatelessOscillator } from "./api.js";

/**
 * HOF oscillator. Takes 2 stateless oscillator fns and returns new
 * oscillator function which produces an interpolated result of both.
 * The returned function takes an additional `mix` arg ([0..1] range)
 * control contributions of either oscillator (default: 0.5 aka 50/50
 * ratio).
 *
 * @param osc1 -
 * @param osc2 -
 */
export const mixOsc =
	(
		osc1: StatelessOscillator,
		osc2: StatelessOscillator
	): StatelessOscillator =>
	(phase, freq, amp = 1, dc = 0, t = 0.5) =>
		_mix(osc1(phase, freq, amp, dc), osc2(phase, freq, amp, dc), t);

/**
 * Similar to {@link mixOsc}, but with `mix` arg ([0..1] range)
 * directly given to HOF and not changeable after.
 *
 * @param osc1 -
 * @param osc2 -
 * @param mix -
 */
export const mixOscHOF =
	(
		osc1: StatelessOscillator,
		osc2: StatelessOscillator,
		mix = 0.5
	): StatelessOscillator =>
	(phase, freq, amp = 1, dc = 0) =>
		_mix(osc1(phase, freq, amp, dc), osc2(phase, freq, amp, dc), mix);
