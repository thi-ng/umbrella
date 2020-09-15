import type { Fn } from "@thi.ng/api";
import type { StatelessOscillator } from "../api";
import { gibbs } from "../util/anti-alias";
import { sin } from "./sin";

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
 * Interactive graph of this oscillator:
 * {@link https://www.desmos.com/calculator/irugw6gnhy}
 *
 * @param n - number of octaves
 */
export const squareAdditive = (n = 8) =>
    additive(
        sin,
        (i) => 2 * (i - 1) + 1,
        (i) => (1 / (2 * (i - 1) + 1)) * gibbs(n, i),
        n
    );

/**
 * Interactive graph of this oscillator:
 * {@link https://www.desmos.com/calculator/irugw6gnhy}
 *
 * @param n - number of octaves
 */
export const sawAdditive = (n = 8) =>
    additive(
        sin,
        (i) => i,
        (i) => (1 / i) * gibbs(n, i),
        n
    );
