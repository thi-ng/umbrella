import type { IGen } from "./api";
import { __take } from "./internal/take";

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

    take(num: number, out: T[] = [], idx = 0): T[] {
        return __take(this, num, out, idx);
    }

    abstract next(): T;
}
