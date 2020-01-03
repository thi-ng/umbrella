import { Fn0 } from "@thi.ng/api";
import { isFunction } from "@thi.ng/checks";

/**
 * Ring buffer / delay line for arbitrary values w/ support for tapping
 * at any delay time (within configured buffer size).
 */
export class DelayLine<T> {
    buf: T[];
    readPos: number;
    writePos: number;

    /**
     * Constructs new delay line of size `n` and initializes all
     * elements to `empty`. If the latter is a function, the buffer will
     * be initialized with the results of that function (called for each
     * element).
     *
     * @param n
     * @param empty
     */
    constructor(n: number, empty: T | Fn0<T>) {
        this.writePos = n - 1;
        this.readPos = 0;
        this.buf = new Array(n);
        if (isFunction(empty)) {
            for (let i = 0; i < n; i++) {
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
    read(): T {
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
     * Progresses read & write pos and stores new value.
     *
     * @param x
     */
    write(x: T) {
        this.step();
        this.buf[this.writePos] = x;
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
