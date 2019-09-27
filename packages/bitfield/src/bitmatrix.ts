import { align } from "@thi.ng/binary";
import { B32 } from "@thi.ng/strings";

/**
 * MxN row-major 2D bit matrix, backed by a Uint32Array. Width is always
 * a multiple of 32.
 */
export class BitMatrix {
    data: Uint32Array;
    stride: number;
    m: number;
    n: number;

    constructor(m: number, n = m) {
        this.m = m;
        this.n = n = align(n, 32);
        this.stride = n >>> 5;
        this.data = new Uint32Array(m * this.stride);
    }

    /**
     * Resizes matrix to new size given (width always rounded up to
     * multiples of 32).
     *
     * @param m new number of rows
     * @param n new number of cols
     */
    resize(m: number, n = m) {
        n = align(n, 32);
        const dstride = n >>> 5;
        const sstride = this.stride;
        const w = Math.min(dstride, sstride);
        const src = this.data;
        const dest = new Uint32Array(m * dstride);
        for (
            let i = Math.min(m, this.m) - 1, si = i * sstride, di = i * dstride;
            i >= 0;
            i--, si -= sstride, di -= dstride
        ) {
            dest.set(src.slice(si, si + w), di);
        }
        this.m = m;
        this.n = n;
        this.stride = dstride;
        this.data = dest;
        return this;
    }

    /**
     * Returns a non-zero value if bit at `m,n` is enabled (row major).
     * No bounds checking.
     *
     * @param m
     * @param n
     */
    at(m: number, n: number) {
        return (
            this.data[(n >>> 5) + m * this.stride] & (0x80000000 >>> (n & 31))
        );
    }

    /**
     * Enables or disables bit at `m,n` (row major). Returns a non-zero
     * value if the bit was previously enabled. No bounds checking.
     * .
     * @param m
     * @param n
     * @param v
     */
    setAt(m: number, n: number, v = true) {
        const id = (n >>> 5) + m * this.stride;
        const mask = 0x80000000 >>> (n & 31);
        const r = this.data[id] & mask;
        if (v) {
            this.data[id] |= mask;
        } else {
            this.data[id] &= ~mask;
        }
        return r;
    }

    toString() {
        const res: string[] = [];
        for (let i = 0, j = 0, s = this.stride; i < this.m; i++, j += s) {
            res.push([...this.data.slice(j, j + s)].map(B32).join(""));
        }
        return res.join("\n");
    }
}
