import { align } from "@thi.ng/binary";
import { radix } from "@thi.ng/strings";

const B32 = radix(2, 32);

export class BitMatrix {

    data: Uint32Array;
    stride: number;
    n: number;

    constructor(n: number) {
        this.n = n = align(n, 32);
        this.stride = n >>> 5;
        this.data = new Uint32Array(n * this.stride);
    }

    /**
     * Resizes matrix to new size given (aligned to multiples of 32).
     *
     * @param n
     */
    resize(n: number) {
        n = align(n, 32);
        const dstride = n >>> 5;
        const sstride = this.stride;
        const w = Math.min(dstride, sstride);
        const src = this.data;
        const dest = new Uint32Array(n * dstride);
        for (let i = this.n - 1, si = i * sstride, di = i * dstride; i >= 0; i-- , si -= sstride, di -= dstride) {
            dest.set(src.slice(si, si + w), di);
        }
        this.n = n;
        this.stride = dstride;
        this.data = dest;
        return this;
    }

    /**
     * Returns a non-zero value if bit at `m,n` is enabled (row major).
     *
     * @param m
     * @param n
     */
    at(m: number, n: number) {
        return (
            this.data[(n >>> 5) + m * this.stride] &
            (0x80000000 >>> (n & 31))
        );
    }

    /**
     * Enables or disables bit at `m,n` (row major). Returns a non-zero
     * value if the bit was previously enabled.
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
        for (let i = 0, j = 0, s = this.stride; i < this.n; i++ , j += s) {
            res.push([...this.data.slice(j, j + s)].map(B32).join(""));
        }
        return res.join("\n");
    }
}
