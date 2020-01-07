import { AProc } from "./aproc";

export const integrator = (coeff?: number, start?: number) =>
    new Integrator(coeff, start);

/**
 * https://en.wikipedia.org/wiki/Leaky_integrator
 */
export class Integrator extends AProc<number, number> {
    protected buf!: number;

    constructor(coeff = 1, start = 0) {
        super(start);
        this.setCoeff(coeff);
    }

    next(x: number) {
        return (this.val = this.val * this.buf + x);
    }

    setCoeff(c: number) {
        this.buf = c;
    }

    zero() {
        this.val = 0;
    }
}
