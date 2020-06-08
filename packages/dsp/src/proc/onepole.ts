import { clamp05, TAU } from "@thi.ng/math";
import { FilterType } from "../constants";
import { AProc } from "./aproc";
import type { IClear, IReset } from "@thi.ng/api";
import type { FilterConfig, IFilter } from "../api";

type OnepoleType = FilterType.LP | FilterType.HP;

export const onepoleLP = (fc: number) => new OnePole(FilterType.LP, fc);

export const onepoleHP = (fc: number) => new OnePole(FilterType.HP, fc);

/**
 * https://www.earlevel.com/main/2012/12/15/a-one-pole-filter/
 */
export class OnePole extends AProc<number, number>
    implements IClear, IFilter, IReset {
    protected _a0!: number;
    protected _b1!: number;

    constructor(protected _type: OnepoleType, protected _freq: number) {
        super(0);
        this.setFreq(_freq);
    }

    clear() {
        this._val = 0;
    }

    reset() {
        this.clear();
        return this;
    }

    next(x: number) {
        return (this._val = x * this._a0 + this._val * this._b1);
    }

    setFreq(fc: number) {
        this._freq = fc = clamp05(fc);
        if (this._type === FilterType.LP) {
            this._b1 = Math.exp(-TAU * fc);
            this._a0 = 1 - this._b1;
        } else {
            this._b1 = -Math.exp(-TAU * (0.5 - fc));
            this._a0 = 1 + this._b1;
        }
    }

    filterCoeffs(): FilterConfig {
        return {
            zeroes: [this._a0],
            poles: [1, this._type === FilterType.LP ? this._b1 : -this._b1],
        };
    }
}
