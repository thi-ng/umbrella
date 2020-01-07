import { TAU } from "@thi.ng/math";
import { FilterType } from "../api";
import { AProc } from "./aproc";

export const onepoleLP = (fc: number) => new OnePole(fc, FilterType.LP);

export const onepoleHP = (fc: number) => new OnePole(fc, FilterType.HP);

/**
 * https://www.earlevel.com/main/2012/12/15/a-one-pole-filter/
 */
export class OnePole extends AProc<number, number> {
    protected a!: number;
    protected b!: number;

    constructor(
        fc: number,
        protected type: FilterType.LP | FilterType.HP = FilterType.LP
    ) {
        super(0);
        this.setFreq(fc);
    }

    next(x: number) {
        return (this.val = x * this.a + this.val * this.b);
    }

    setFreq(fc: number) {
        if (this.type === FilterType.LP) {
            this.b = Math.exp(-TAU * fc);
            this.a = 1 - this.b;
        } else {
            this.b = -Math.exp(-TAU * (0.5 - fc));
            this.a = 1 - this.b;
        }
    }
}
