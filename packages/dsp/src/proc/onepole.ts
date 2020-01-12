import { TAU } from "@thi.ng/math";
import { FilterType } from "../api";
import { AProc } from "./aproc";

export const onepoleLP = (fc: number) => new OnePole(fc, FilterType.LP);

export const onepoleHP = (fc: number) => new OnePole(fc, FilterType.HP);

/**
 * https://www.earlevel.com/main/2012/12/15/a-one-pole-filter/
 */
export class OnePole extends AProc<number, number> {
    protected _a!: number;
    protected _b!: number;

    constructor(
        fc: number,
        protected _type: FilterType.LP | FilterType.HP = FilterType.LP
    ) {
        super(0);
        this.setFreq(fc);
    }

    next(x: number) {
        return (this._val = x * this._a + this._val * this._b);
    }

    setFreq(fc: number) {
        if (this._type === FilterType.LP) {
            this._b = Math.exp(-TAU * fc);
            this._a = 1 - this._b;
        } else {
            this._b = -Math.exp(-TAU * (0.5 - fc));
            this._a = 1 + this._b;
        }
    }
}
