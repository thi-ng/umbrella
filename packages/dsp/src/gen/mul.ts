import { IReset } from "@thi.ng/api";
import { AGen } from "./agen";

/**
 * Returns new multiply gen, producing `y(t) = factor * y(t-1)`, using
 * given `factor` and `start` values.
 *
 * Also see {@link exp}.
 *
 * @param factor -
 * @param start -
 */
export const mul = (factor?: number, start?: number) => new Mul(factor, start);

export class Mul extends AGen<number> implements IReset {
    constructor(protected _factor = 1, protected _start = 1) {
        super(0);
        this.reset();
    }

    reset() {
        this._val = this._start / this._factor;
        return this;
    }

    next() {
        return (this._val *= this._factor);
    }
}
