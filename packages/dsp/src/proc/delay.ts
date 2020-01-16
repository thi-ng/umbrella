import { Fn0, IClear, ILength } from "@thi.ng/api";
import { isFunction } from "@thi.ng/checks";
import { AProc } from "./aproc";

export const delay = (n: number) => new Delay(n, 0);

/**
 * Ring buffer / delay line for arbitrary values w/ support for tapping
 * at any delay time (within configured buffer size).
 */
export class Delay<T> extends AProc<T, T> implements IClear, ILength {
    protected buf: T[];
    protected readPos: number;
    protected writePos: number;

    /**
     * Constructs new delay line of size `n` and initializes all
     * elements to `empty`. If the latter is a function, the buffer will
     * be initialized with the results of that function (called for each
     * element).
     *
     * @param n
     * @param empty
     */
    constructor(n: number, protected empty: T | Fn0<T>) {
        super(isFunction(empty) ? empty() : empty);
        this.writePos = n - 1;
        this.readPos = 0;
        this.buf = new Array(n);
        this.clear();
    }

    get length() {
        return this.buf.length;
    }

    clear() {
        const { buf, empty } = this;
        if (isFunction(empty)) {
            for (let i = buf.length; --i >= 0; ) {
                this.buf[i] = empty();
            }
        } else {
            this.buf.fill(empty);
        }
    }

    /**
     * Returns the delayed value at current read position (i.e. `n`
     * samples behind current write pos).
     */
    deref(): T {
        return this.buf[this.readPos];
    }

    /**
     * Reads value at `t` relative to current write position. `t` should
     * be in `[-(n-1)..0)` interval. E.g. `tap(-1)` returns the second
     * most recent value written.
     *
     * @param t
     */
    tap(t: number) {
        const n = this.buf.length;
        t = t + this.writePos;
        t = t < 0 ? t + n : t >= n ? t - n : t;
        return this.buf[t];
    }

    /**
     * Progresses read & write pos, stores new value and returns delayed
     * value.
     *
     * @param x
     */
    next(x: T) {
        const out = this.deref();
        this.step();
        this.buf[this.writePos] = x;
        return out;
    }

    /**
     * Moves read & write cursors one step forward. Useful for skipping
     * elements and/or to create gaps in the delay line.
     */
    step() {
        const n = this.buf.length;
        ++this.writePos >= n && (this.writePos -= n);
        ++this.readPos >= n && (this.readPos -= n);
    }
}
