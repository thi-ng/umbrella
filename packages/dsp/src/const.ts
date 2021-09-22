import { AGen } from "./agen";

/**
 * Returns new gen yielding always the same given value `x`.
 *
 * @param x
 */
export const constant = <T>(x: T) => new Const(x);

export class Const<T> extends AGen<T> {
    next() {
        return this._val;
    }
}
