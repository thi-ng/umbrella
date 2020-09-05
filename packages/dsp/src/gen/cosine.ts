import type { IReset } from "@thi.ng/api";
import { TAU } from "@thi.ng/math";
import { AGen } from "./agen";

/**
 * Approximated cosine generator using given normalized `freq` and `amp`
 * (default: 1).
 *
 * @param freq -
 * @param amp -
 */
export const cosine = (freq: number, amp?: number) => new Cosine(freq, amp);

export class Cosine extends AGen<number> implements IReset {
    protected _cos!: number;
    protected _nxt!: number;

    constructor(protected _freq: number, protected _amp = 1) {
        super(0);
        this.calcCoeffs();
    }

    reset() {
        this.calcCoeffs();
        return this;
    }

    next() {
        const t = this._nxt * this._cos - this._val;
        this._val = this._nxt;
        this._nxt = t;
        return this._val;
    }

    freq() {
        return this._freq;
    }

    setFreq(freq: number) {
        this._freq = freq;
        this.calcCoeffs();
    }

    amp() {
        return this._amp;
    }

    setAmp(amp: number) {
        this._amp = amp;
        this.calcCoeffs();
    }

    protected calcCoeffs() {
        this._nxt = this._amp;
        this._cos = Math.cos(this._freq * TAU) * 2;
        this._val = this._cos * this._amp * 0.5;
    }
}
