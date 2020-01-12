import { AGen } from "./agen";

export class Trigger<T> extends AGen<T> {
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

export const trigger = <T>(on: T, off: T, period: number, start?: number) =>
    new Trigger(on, off, period, start);

export const triggerN = (period: number, start?: number) =>
    new Trigger(1, 0, period, start);

export const triggerB = (period: number, start?: number) =>
    new Trigger(true, false, period, start);
