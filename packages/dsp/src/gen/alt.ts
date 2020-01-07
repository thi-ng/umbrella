import { AGen } from "./agen";

export const alt = <T>(a: T, b: T) => new Alt(a, b);

export const altN = (n = 1) => new Alt(n, -n);

export const altB = (x = true) => new Alt(x, !x);

export class Alt<T> extends AGen<T> {
    protected flip = true;

    constructor(protected a: T, protected b: T) {
        super(b);
    }

    next() {
        return (this.val = (this.flip = !this.flip) ? this.b : this.a);
    }
}
