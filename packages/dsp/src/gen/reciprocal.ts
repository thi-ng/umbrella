import { AGen } from "./agen";

export class Reciprocal extends AGen<number> {
    protected _n: number;
    constructor(protected _step = 1) {
        super(1);
        this._n = 1 - this._step;
    }

    next() {
        this._n += this._step;
        return (this._val = 1 / this._n);
    }
}

export const reciprocal = (step?: number) => new Reciprocal(step);
