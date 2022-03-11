import type { IReset } from "@thi.ng/api";
import { AGen } from "./agen.js";

/**
 * Returns a gen which yield sequence `y(t) = 1 / (y(t - 1) + step)`.
 *
 * @param step - 
 */
export const reciprocal = (step?: number) => new Reciprocal(step);

export class Reciprocal extends AGen<number> implements IReset {
    protected _n!: number;

    constructor(protected _step = 1) {
        super(1);
        this.reset();
    }

    reset() {
        this._n = 1 - this._step;
        return this;
    }

    next() {
        this._n += this._step;
        return (this._val = 1 / this._n);
    }
}
