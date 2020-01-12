import { expFactor } from "@thi.ng/math";
import { AGen } from "./agen";

/**
 * Returns new multiply gen, producing `y(t) = factor * y(t-1)`, using
 * given `factor` and `start` values.
 *
 * Also see {@link exp}.
 *
 * @param factor -
 * @param start -
 */
export const mul = (factor?: number, start?: number) => new Mul(factor, start);

/**
 * Returns new `Mul` gen producing an exponential curve between `start`
 * and `end` values over `num` steps. Exponential equivalent of
 * {@link line}.
 *
 * @remarks
 * The `end` value is only reached after `num + 1` steps. The curve will
 * NOT stop at `end` but continue indefinitely if more values are
 * requested from the generator.
 *
 * Also see {@link mul}.
 *
 * @example
 * ```ts
 * exp(1, 0.25, 5).take(7)
 * // [
 * //   1,
 * //   0.757858283255199,
 * //   0.5743491774985174,
 * //   0.435275281648062,
 * //   0.3298769776932235,
 * //   0.24999999999999994,
 * //   0.1894645708137997
 * // ]
 * ```
 *
 * @param start -
 * @param end -
 * @param num -
 */
export const exp = (start: number, end: number, num: number) =>
    new Mul(expFactor(start, end, num), start);

export class Mul extends AGen<number> {
    constructor(protected _factor = 1, start = 1) {
        super(start / _factor);
    }

    next() {
        return (this._val *= this._factor);
    }
}
