import { wrap } from "@thi.ng/math";
import { IGen } from "../api";
import { AGen } from "./agen";

export class WrapAroundG extends AGen<number> {
    constructor(
        protected _gen: IGen<number>,
        protected _min = 0,
        protected _max = 1
    ) {
        super(wrap(_gen.deref(), _min, _max));
    }

    next() {
        return (this._val = wrap(this._gen.next(), this._min, this._max));
    }
}

export const wrapAroundG = (gen: IGen<number>, min?: number, max?: number) =>
    new WrapAroundG(gen, min, max);
