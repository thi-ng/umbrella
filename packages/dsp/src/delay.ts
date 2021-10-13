import type { Fn0, IClear, ILength, IReset } from "@thi.ng/api";
import { isFunction } from "@thi.ng/checks/is-function";
import { wrap } from "@thi.ng/math/interval";
import { AProc } from "./aproc.js";

/**
 * Delay line of length `n` for numeric values.
 *
 * @param n
 */
export const delay = (n: number) => new Delay(n, 0);

/**
 * Delay line of length `n` for arbitrary typed values.
 *
 * @param n
 */
export const delayT = <T>(n: number, off: T | Fn0<T>) => new Delay<T>(n, off);

/**
 * Ring buffer / delay line for arbitrary values w/ support for tapping
 * at any delay time (within configured buffer size).
 */
export class Delay<T> extends AProc<T, T> implements IClear, ILength, IReset {
    protected _buf: T[];
    protected _rpos: number;
    protected _wpos: number;

    /**
     * Constructs new delay line of size `n` and initializes all
     * elements to `empty`. If the latter is a function, the buffer will
     * be initialized with the results of that function (called for each
     * element).
     *
     * @param n
     * @param _empty
     */
    constructor(n: number, protected _empty: T | Fn0<T>) {
        super(isFunction(_empty) ? _empty() : _empty);
        this._wpos = n - 1;
        this._rpos = 0;
        this._buf = new Array(n);
        this.clear();
    }

    get length() {
        return this._buf.length;
    }

    clear() {
        const { _buf, _empty } = this;
        if (isFunction(_empty)) {
            for (let i = _buf.length; --i >= 0; ) {
                this._buf[i] = _empty();
            }
        } else {
            this._buf.fill(_empty);
        }
    }

    /**
     * Alias for {@link Delay.clear}
     */
    reset() {
        this.clear();
        return this;
    }

    /**
     * Returns the delayed value at current read position (i.e. `n`
     * samples behind current write pos, where `n` is the length of this
     * delay line).
     */
    deref(): T {
        return this._buf[this._rpos];
    }

    /**
     * Reads value at `t` relative to current write position. `t` should
     * be in `(-∞..0)` interval. E.g. `tap(-1)` returns the second
     * most recent value written.
     *
     * @param t
     */
    tap(t: number) {
        return this._buf[wrap((t | 0) + this._wpos, 0, this._buf.length - 1)];
    }

    /**
     * Takes an array of offsets relative to current write position,
     * calls {@link Delay.tap} for each, writes results to `out` and
     * returns it.
     */
    multiTap(t: ArrayLike<number>, out: T[] = []) {
        for (let i = t.length; --i >= 0; ) {
            out[i] = this.tap(t[i]);
        }
        return out;
    }

    /**
     * Progresses read & write pos, stores & returns new value.
     *
     * @param x
     */
    next(x: T) {
        this.step();
        this._buf[this._wpos] = x;
        return x;
    }

    /**
     * Moves read & write cursors one step forward. Useful for skipping
     * elements and/or to create gaps in the delay line.
     */
    step() {
        const n = this._buf.length;
        ++this._wpos >= n && (this._wpos -= n);
        ++this._rpos >= n && (this._rpos -= n);
    }
}
