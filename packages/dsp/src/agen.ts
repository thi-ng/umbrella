import type { IGen } from "./api";

/**
 * Abstract base class for unit gens in this package. Provides
 * {@link @thi.ng/api#IDeref} to obtain the gen's current value and
 * `Iterable` implementations to use gens as ES6 iterables.
 */
export abstract class AGen<T> implements IGen<T> {
    constructor(protected _val: T) {}

    deref() {
        return this._val;
    }

    *[Symbol.iterator]() {
        while (true) yield this.next();
    }

    take(num: number, out: T[] = [], idx = 0) {
        for (; --num >= 0; ) {
            out[idx++] = this.next();
        }
        return out;
    }

    abstract next(): T;
}
