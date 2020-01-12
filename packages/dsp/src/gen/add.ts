import { AGen } from "./agen";

/**
 * Creates a new `Add` gen using given `step` (default: 1) and `start
 * (default: 0) values, producing: `y(t) = step + y(t-1)`
 *
 * @param step
 * @param start
 */
export const add = (step?: number, start?: number) => new Add(step, start);

/**
 * Creates a new `Add` gen based on given `start` (default: 0) and `end`
 * (default: 1) positions and tracing a line over `num` steps.
 *
 * @remarks
 * Since `start` will be the first generated value, the `end` value is
 * only reached after `num + 1` steps. The line will NOT stop at `end`
 * but continue indefinitely if more than `n + 1` values are requested
 * from the generator.
 *
 * @example
 * ```ts
 * line(0, 1, 5).take(7)
 * // [ 0, 0.2, 0.4, 0.6, 0.8, 1, 1.2 ]
 * ```
 *
 * @param start
 * @param end
 * @param num
 */
export const line = (start = 0, end = 1, num = 10) =>
    new Add((end - start) / num, start);

export class Add extends AGen<number> {
    constructor(protected _step = 1, start = 0) {
        super(start - _step);
    }

    next() {
        return (this._val += this._step);
    }
}
