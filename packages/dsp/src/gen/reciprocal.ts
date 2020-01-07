import { AGen } from "./agen";

export class Reciprocal extends AGen<number> {
    protected n: number;
    constructor(protected step = 1) {
        super(1);
        this.n = 1 - this.step;
    }

    next() {
        this.n += this.step;
        return (this.val = 1 / this.n);
    }
}

export const reciprocal = (step?: number) => new Reciprocal(step);
