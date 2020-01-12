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

export class MAdd extends AGen<number> {
    constructor(protected _factor = 1, start = 1, protected _offset = 0) {
        super((start - _offset) / _factor);
    }

    next() {
        return (this._val = this._val * this._factor + this._offset);
    }
}
