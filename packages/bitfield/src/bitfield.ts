import { align } from "@thi.ng/binary";
import { radix } from "@thi.ng/strings";

const B32 = radix(2, 32);

export class BitField {

    data: Uint32Array;
    n: number;

    constructor(n: number) {
        this.n = align(n, 32);
        this.data = new Uint32Array(this.n >>> 5);
    }

    /**
     * Resizes bitfield to new size given (aligned to multiples of 32).
     *
     * @param n
     */
    resize(n: number) {
        n = align(n, 32);
        const dest = new Uint32Array(n >>> 5);
        dest.set(this.data.slice(0, dest.length));
        this.data = dest;
        this.n = n;
        return this;
    }

    /**
     * Returns a non-zero value if bit `n` is enabled.
     *
     * @param n
     */
    at(n: number) {
        return (this.data[n >>> 5] & (0x80000000 >>> (n & 31)));
    }

    /**
     * Enables or disables bit `n`. Returns a non-zero value if the bit
     * was previously enabled.
     * .
     * @param n
     * @param v
     */
    setAt(n: number, v = true) {
        const id = (n >>> 5);
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
        return [...this.data].map(B32).join("");
    }
}
