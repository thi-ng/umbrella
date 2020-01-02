/**
 * Ring buffer / delay line for arbitrary values w/ support for tapping
 * at any delay time (within configured buffer size).
 */
export class DelayLine<T> {
    buf: T[];
    readPos: number;
    writePos: number;

    constructor(n: number, empty: T) {
        this.buf = new Array(n).fill(empty);
        this.writePos = n - 1;
        this.readPos = 0;
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

    step() {
        const n = this.buf.length;
        ++this.writePos >= n && (this.writePos -= n);
        ++this.readPos >= n && (this.readPos -= n);
    }
}
