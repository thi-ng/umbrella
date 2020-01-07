import { AGen } from "./agen";

export class Trigger<T> extends AGen<T> {
    constructor(
        protected on: T,
        protected off: T,
        protected period: number,
        protected pos = 0
    ) {
        super(off);
        this.pos--;
    }

    next() {
        return (this.val =
            ++this.pos >= this.period ? ((this.pos = 0), this.on) : this.off);
    }
}

export const trigger = <T>(on: T, off: T, period: number, start?: number) =>
    new Trigger(on, off, period, start);

export const triggerN = (period: number, start?: number) =>
    new Trigger(1, 0, period, start);

export const triggerB = (period: number, start?: number) =>
    new Trigger(true, false, period, start);
