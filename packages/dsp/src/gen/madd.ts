import { IReset } from "@thi.ng/api";
import { AGen } from "./agen";

/**
 * Returns new multiply-add gen producing `y(t) = factor * y(t-1) + offset`.
 *
 * @param factor - default 1
 * @param start - default 1
 * @param offset - default 0
 */
export const madd = (factor?: number, start?: number, offset?: number) =>
    new MAdd(factor, start, offset);

/**
 * Returns new {@link MAdd} gen, producing an exponential curve (with
 * adjustable curvature) between `start` and `end` values over `num`
 * steps. This is the exponential equivalent of {@link line}.
 *
 * @remarks
 * The `end` value is only reached after `num + 1` steps. The curve will
 * NOT stop at `end` but continue indefinitely if more values are
 * requested from the generator.
 *
 * The curvature can be controlled via the logarithmic `rate` param.
 * Recommended range [0.0001 - 10000] (curved -> linear). Default: 0.1
 *
 * Also see {@link madd}.
 *
 * @example
 * ```ts
 * curve(-1, 1, 5, 0.1).take(7)
 * // [
 * //   -1,
 * //   -0.04228753006664476,
 * //   0.4786567612639258,
 * //   0.7620225554764573,
 * //   0.9161583712747458,
 * //   1.0000000000000002,  // target
 * //   1.0456053557111122
 * // ]
 * ```
 *
 * @param start - start value
 * @param end - end value
 * @param num - num steps
 * @param rate - curvature
 */
export const curve = (
    start: number,
    end: number,
    steps: number,
    rate = 0.1
) => {
    const c = Math.exp(
        -Math.log((Math.abs(end - start) + rate) / rate) / steps
    );
    return new MAdd(
        c,
        start,
        (start < end ? end + rate : end - rate) * (1 - c)
    );
};

export class MAdd extends AGen<number> implements IReset {
    constructor(
        protected _factor = 1,
        protected _start = 1,
        protected _offset = 0
    ) {
        super(0);
        this.reset();
    }

    reset() {
        this._val = (this._start - this._offset) / this._factor;
        return this;
    }

    next() {
        return (this._val = this._val * this._factor + this._offset);
    }
}
