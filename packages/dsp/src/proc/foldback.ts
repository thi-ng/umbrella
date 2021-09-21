import { foldback as _foldback } from "@thi.ng/math/interval";
import { AProc } from "./aproc";

/**
 * Recursively folds input into `[-thresh .. +thresh]` interval and
 * amplifies it with `amp` (default: 1/thresh).
 *
 * @remarks
 * Reference:
 * - https://www.desmos.com/calculator/lkyf2ag3ta
 *
 * @param thresh - fold threshold
 * @param amp - post amplifier
 */
export const foldback = (thresh?: number, amp?: number) =>
    new Foldback(thresh, amp);

export class Foldback extends AProc<number, number> {
    constructor(protected _thresh = 1, protected _amp = 1 / _thresh) {
        super(0);
    }

    next(x: number) {
        return (this._val = _foldback(this._thresh, x) * this._amp);
    }

    threshold() {
        return this._thresh;
    }

    setThreshold(t: number) {
        this._thresh = t;
    }

    amp() {
        return this._amp;
    }

    setAmp(a: number) {
        this._amp = a;
    }
}
