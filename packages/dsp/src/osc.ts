import { HALF_PI, TAU } from "@thi.ng/math/api";
import { mix as _mix } from "@thi.ng/math/mix";
import { wrap01 } from "@thi.ng/math/interval";
import { fract } from "@thi.ng/math/prec";
import { StatelessOscillator } from "./api";

export class Oscillator implements
    Iterable<number> {

    osc: StatelessOscillator;
    phase: number;
    freq: number;
    amp: number;
    dc: number;
    opt: any;

    constructor(osc: StatelessOscillator, freq: number, amp = 1, dc = 0, opt?: any) {
        this.osc = osc;
        this.phase = 0;
        this.freq = freq;
        this.amp = amp;
        this.dc = dc;
        this.opt = opt;
    }

    *[Symbol.iterator]() {
        while (true) {
            yield this.update();
        }
    }

    update() {
        const y = this.osc(this.phase, 1, this.amp, this.dc, this.opt);
        this.phase = wrap01(this.phase + this.freq);
        return y;
    }
}

export class AMFMOscillator extends Oscillator {

    osc: StatelessOscillator;
    am: Oscillator;
    fm: Oscillator;

    constructor(
        osc: StatelessOscillator,
        amod: Oscillator,
        fmod: Oscillator,
        freq: number,
        amp = 1,
        dc = 0,
        opt?: any
    ) {
        super(osc, freq, amp, dc, opt);
        this.am = amod;
        this.fm = fmod;
    }

    update() {
        const y = this.osc(
            this.phase,
            1,
            this.am ? this.amp + this.am.update() : this.amp,
            this.dc,
            this.opt
        );
        this.phase = wrap01(this.phase + this.freq + (this.fm ? this.fm.update() : 0));
        return y;
    }
}

export const sin = (phase: number, freq: number, amp = 1, dc = 0) =>
    dc + amp * Math.sin(phase * freq * TAU);

export const tri = (phase: number, freq: number, amp = 1, dc = 0) =>
    dc + amp * (Math.abs((phase * freq * 4) % 4 - 2) - 1);

export const triConcave = (phase: number, freq: number, amp = 1, dc = 0) =>
    dc + amp * (8 * Math.pow(fract(phase * freq) - 0.5, 2) - 1);

export const rect = (phase: number, freq: number, amp = 1, dc = 0, duty = 0.5) =>
    dc + amp * (fract(phase * freq) < duty ? 1 : -1);

export const saw = (phase: number, freq: number, amp = 1, dc = 0) =>
    dc + amp * (1 - 2 * fract(phase * freq));

export const wavetable = (table: number[]): StatelessOscillator => {
    const n = table.length;
    return (phase: number, freq: number, amp = 1, dc = 0) => {
        const i = Math.round(phase * freq * n) % n;
        return dc + amp * table[i < 0 ? i + n : i];
    };
};

export const mix = (osc1: StatelessOscillator, osc2: StatelessOscillator): StatelessOscillator =>
    (phase: number, freq: number, amp = 1, dc = 0, t = 0.5) =>
        _mix(osc1(phase, freq, amp, dc), osc2(phase, freq, amp, dc), t);

export const additive = (
    osc: StatelessOscillator,
    freqFn: (i: number) => number,
    ampFn: (i: number) => number, n: number) =>

    (phase: number, freq: number, amp = 1, dc = 0) => {
        let y = 0;
        for (let i = 1; i <= n; i++) {
            y += osc(phase, freq * freqFn(i), amp * ampFn(i));
        }
        return dc + y;
    };

/**
 * Interactive graph of this oscillator:
 * https://www.desmos.com/calculator/irugw6gnhy
 *
 * @param n
 */
export const squareAdditive = (n = 8) =>
    additive(sin, (i) => 2 * (i - 1) + 1, (i) => 1 / (2 * (i - 1) + 1) * gibbs(n, i), n);

/**
 * Interactive graph of this oscillator:
 * https://www.desmos.com/calculator/irugw6gnhy
 *
 * @param n
 */
export const sawAdditive = (n = 8) =>
    additive(sin, (i) => i, (i) => 1 / i * gibbs(n, i), n);

/**
 * https://en.wikipedia.org/wiki/Gibbs_phenomenon
 * http://www.musicdsp.org/files/bandlimited.pdf
 *
 * Interactive graph:
 * https://www.desmos.com/calculator/irugw6gnhy
 *
 * @param n
 * @param i
 */
export const gibbs = (n: number, i: number) =>
    Math.pow(Math.cos((i - 1) * HALF_PI / n), 2);

/**
 * Polynomial attenuation to create bandlimited version of a signal.
 *
 * - http://research.spa.aalto.fi/publications/papers/smc2010-phaseshaping/
 * - http://www.kvraudio.com/forum/viewtopic.php?t=375517
 *
 * @param eps
 * @param x
 */
export const polyBLEP = (eps: number, x: number) =>
    x < eps ?
        (x /= eps, x + x - x * x - 1) :
        x > 1 - eps ?
            (x = (x - 1) / eps, x * x + x + x + 1) :
            0;
