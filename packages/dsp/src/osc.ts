import { wrap01 } from "@thi.ng/math";
import { StatelessOscillator } from "./api";

export class Oscillator implements Iterable<number> {
    osc: StatelessOscillator;
    phase: number;
    freq: number;
    amp: number;
    dc: number;
    opt: any;

    constructor(
        osc: StatelessOscillator,
        freq: number,
        amp = 1,
        dc = 0,
        opt?: any
    ) {
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
        this.phase = wrap01(
            this.phase + this.freq + (this.fm ? this.fm.update() : 0)
        );
        return y;
    }
}
