import { wrap } from "@thi.ng/math";
import { IGen } from "../api";
import { AGen } from "./agen";

export class WrapAround extends AGen<number> {
    constructor(
        protected gen: IGen<number>,
        protected min = 0,
        protected max = 1
    ) {
        super(wrap(gen.deref(), min, max));
    }

    next() {
        return (this.val = wrap(this.gen.next(), this.min, this.max));
    }
}

export const wrapAround = (gen: IGen<number>, min?: number, max?: number) =>
    new WrapAround(gen, min, max);
