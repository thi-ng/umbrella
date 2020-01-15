import { AGen } from "./agen";

/**
 * https://en.wikipedia.org/wiki/Dirac_comb
 *
 * @param period -
 * @param start -
 */
export const impulseTrain = (period: number, start?: number) =>
    new ImpulseTrain(1, 0, period, start);

export const impulseTrainT = <T>(
    on: T,
    off: T,
    period: number,
    start?: number
) => new ImpulseTrain(on, off, period, start);

export const impulseTrainB = (period: number, start?: number) =>
    new ImpulseTrain(true, false, period, start);

export class ImpulseTrain<T> extends AGen<T> {
    constructor(
        protected _on: T,
        protected _off: T,
        protected _period: number,
        protected _pos = 0
    ) {
        super(_off);
        this._pos--;
    }

    next() {
        return (this._val =
            ++this._pos >= this._period
                ? ((this._pos = 0), this._on)
                : this._off);
    }
}
