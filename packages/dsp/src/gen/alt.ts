import { AGen } from "./agen";

export const alt = (n = 1) => new Alt(n, -n);

export const altT = <T>(a: T, b: T) => new Alt(a, b);

export const altB = (x = true) => new Alt(x, !x);

export class Alt<T> extends AGen<T> {
    protected flip = true;

    constructor(protected _a: T, protected _b: T) {
        super(_b);
    }

    next() {
        return (this._val = (this.flip = !this.flip) ? this._b : this._a);
    }
}
