import { INV_TAU, TAU } from "@thi.ng/math";
import { AGen } from "./agen";

/**
 * Approximated cosine generator using given normalized `freq` and `amp`
 * (default: 1).
 *
 * @param freq -
 * @param amp -
 */
export const cosine = (freq: number, amp?: number) => new Cosine(freq, amp);

export class Cosine extends AGen<number> {
    protected _cos!: number;
    protected _nxt!: number;

    constructor(freq: number, amp = 1) {
        super(0);
        this.set(freq, amp);
    }

    next() {
        const t = this._nxt * this._cos - this._val;
        this._val = this._nxt;
        this._nxt = t;
        return this._val;
    }

    freq() {
        return Math.acos(this._cos * 0.5) * INV_TAU;
    }

    set(freq: number, amp: number) {
        this._nxt = amp;
        this._cos = Math.cos(freq * TAU) * 2;
        this._val = this._cos * amp * 0.5;
    }
}
