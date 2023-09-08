import { identity, type Fn } from "@thi.ng/api/fn";
import { gibbs } from "./anti-alias.js";
import type { StatelessOscillator } from "./api.js";
import { sin } from "./osc-sin.js";

/**
 * Higher order function to produce an additive version of given
 * {@link StatelessOscillator}. Returns new oscillator function.
 *
 * @remarks
 * The `freqFn` and `ampFn` functions are used to compute respective frequency
 * and amplitude factors for each of the `n` requested harmonics (given in [i,n]
 * range).
 *
 * @param osc -
 * @param freqFn -
 * @param ampFn -
 * @param n -
 */
export const additive = (
	osc: StatelessOscillator,
	freqFn: Fn<number, number>,
	ampFn: Fn<number, number>,
	n: number
): StatelessOscillator => {
	const fcache: number[] = [];
	const acache: number[] = [];
	for (let i = 1; i <= n; i++) {
		fcache.push(freqFn(i));
		acache.push(ampFn(i));
	}
	return (phase, freq, amp = 1, dc = 0) => {
		let y = 0;
		for (let i = 0; i < n; i++) {
			y += osc(phase, freq * fcache[i], acache[i]);
		}
		return dc + amp * y;
	};
};

/**
 * Returns a {@link StatelessOscillator} which constructs a square waveform from
 * `n` partials. If `useGibbs` is true (default), also applies {@link gibbs} to
 * each partial.
 *
 * @remarks
 * Interactive graph of this oscillator:
 * https://www.desmos.com/calculator/irugw6gnhy
 *
 * @param n - number of partials
 * @param useGibbs -
 */
export const squareAdditive = (n = 8, useGibbs = true) =>
	additive(
		sin,
		(i) => 2 * (i - 1) + 1,
		(i) => (1 / (2 * (i - 1) + 1)) * (useGibbs ? gibbs(n, i) : 1),
		n
	);

/**
 * Returns a {@link StatelessOscillator} which constructs a sawtooth waveform
 * from `n` partials. If `useGibbs` is true (default), also applies
 * {@link gibbs} to each partial.
 *
 * @remarks
 * Interactive graph of this oscillator:
 * https://www.desmos.com/calculator/irugw6gnhy
 *
 * @param n - number of partials
 * @param useGibbs -
 */
export const sawAdditive = (n = 8, useGibbs = true) =>
	additive(sin, identity, (i) => (1 / i) * (useGibbs ? gibbs(n, i) : 1), n);
