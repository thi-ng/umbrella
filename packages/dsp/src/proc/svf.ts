import { IClear } from "@thi.ng/api";
import { PI } from "@thi.ng/math";
import { FilterType } from "../api";
import { AProc } from "./aproc";

type SVFType =
    | FilterType.LP
    | FilterType.HP
    | FilterType.BP
    | FilterType.NOTCH
    | FilterType.PEAK
    | FilterType.ALL;

/**
 * State variable filter w/ trapezoidal integration, after Andrew
 * Simper.
 *
 * Reference:
 *
 * - https://cytomic.com/files/dsp/SvfLinearTrapOptimised2.pdf
 * - https://en.wikipedia.org/wiki/Trapezoidal_rule
 *
 */
export class SVF extends AProc<number, number> implements IClear {
    protected _a1!: number;
    protected _a2!: number;
    protected _c1!: number;
    protected _c2!: number;
    protected _g!: number;
    protected _k!: number;

    constructor(
        protected _type: SVFType,
        protected _fc: number,
        protected _q = 0
    ) {
        super(0);
        this.clear();
        this.computeCoeffs();
    }

    clear() {
        this._c1 = this._c2 = this._val = 0;
    }

    next(x: number) {
        const { _a2, _c1, _c2 } = this;
        const x1 = this._a1 * _c1 + _a2 * (x - _c2);
        const x2 = _c2 + this._g * x1;
        this._c1 = 2 * x1 - _c1;
        this._c2 = 2 * x2 - _c2;
        // TODO support type morphing / interpolation?
        switch (this._type) {
            case FilterType.LP:
                return (this._val = x2);
            case FilterType.HP:
                return (this._val = x - this._k * x1 - x2);
            case FilterType.BP:
                return (this._val = x1);
            case FilterType.NOTCH:
                return (this._val = x - this._k * x1);
            case FilterType.PEAK:
                return (this._val = 2 * x2 - x + this._k * x1);
            case FilterType.ALL:
                return (this._val = x - 2 * this._k * x1);
        }
    }

    setFreq(fc: number) {
        this._fc = fc;
        this.setQ(this._q);
    }

    setQ(q: number) {
        this._q = q;
    }

    protected computeCoeffs() {
        const g = (this._g = Math.tan(PI * this._fc));
        this._k = 2 - 2 * this._q;
        this._a1 = 1 / (1 + g * (g + this._k));
        this._a2 = g * this._a1;
    }
}
