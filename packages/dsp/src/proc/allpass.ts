import type { IReset } from "@thi.ng/api";
import { clamp05, PI, QUARTER_PI } from "@thi.ng/math";
import { AProc } from "./aproc";

/**
 * One-pole allpass filter.
 *
 * @param freq - normalized center freq
 */
export const allpass = (freq: number) => new AllPass1(freq);

export class AllPass1 extends AProc<number, number> implements IReset {
    protected _freq!: number;
    protected _coeff!: number;
    protected _z1!: number;

    constructor(freq: number) {
        super(0);
        this.setFreq(freq);
        this.reset();
    }

    reset() {
        this._z1 = 0;
        return this;
    }

    next(x: number) {
        const { _coeff, _z1 } = this;
        x -= _z1 * _coeff;
        this._z1 = x;
        return x * _coeff + _z1;
    }

    low(x: number) {
        return (x + this.next(x)) * 0.5;
    }

    high(x: number) {
        return (x - this.next(x)) * 0.5;
    }

    freq() {
        return this._freq;
    }

    setFreq(freq: number) {
        this._freq = clamp05(freq);
        this._coeff = Math.tan(freq * PI - QUARTER_PI);
    }
}
