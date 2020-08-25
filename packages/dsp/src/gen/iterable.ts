import { IGen } from "../api";

/**
 * Wraps given ES6 iterable to provide full {@link IGen} implementation.
 *
 * @remarks
 * Calling `.next()` on this wrapped instance will always succeed, even if the
 * original iterable already is exhausted (in which case the last valid value
 * will be repeated ad infinitum).
 *
 * The `initial` value is required to satisfy `.deref()` and the case where the
 * iterable doesn't provide a single value.
 *
 * @param src
 * @param initial
 */
export const iterable = <T>(src: Iterable<T>, initial: T) =>
    new $Iterable<T>(src, initial);

export class $Iterable<T> implements IGen<T> {
    protected _iter: Iterator<T> | null;
    protected _val: T;

    constructor(src: Iterable<T>, initial: T) {
        this._iter = src[Symbol.iterator]();
        this._val = initial;
    }

    deref() {
        return this._val;
    }

    *[Symbol.iterator]() {
        while (true) yield this.next();
    }

    next() {
        if (this._iter) {
            const res = this._iter.next();
            if (!res.done) {
                this._val = res.value;
            } else {
                this._iter = null;
            }
        }
        return this._val;
    }

    take(num: number, out: T[] = [], idx = 0) {
        for (; --num >= 0; ) {
            out[idx++] = this.next();
        }
        return out;
    }
}
