import type { IReset } from "@thi.ng/api";
import { AGen } from "./agen";

/**
 * Creates a new `Add` gen using given `step` (default: 1.0) and `start`
 * (default: 0.0) values, producing: `y(t) = step + y(t-1)`. If `clamp` is
 * given, the resulting output will be clamped to that value (min or max depends
 * on sign of `start - clamp`).
 *
 * @param step
 * @param start
 * @param clamp
 */
export const add = (step?: number, start?: number, clamp?: number) =>
    new Add(step, start, clamp);

export class Add extends AGen<number> implements IReset {
    constructor(
        protected _step = 1,
        protected _start = 0,
        protected _clamp?: number
    ) {
        super(0);
        this.reset();
    }

    reset() {
        this._val = this._start - this._step;
        return this;
    }

    next() {
        let v = this._val + this._step;
        return (this._val =
            this._clamp !== undefined
                ? this._start < this._clamp
                    ? Math.min(v, this._clamp)
                    : Math.max(v, this._clamp)
                : v);
    }
}
