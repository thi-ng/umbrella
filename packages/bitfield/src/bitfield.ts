import { align } from "@thi.ng/binary";
import { toString } from "./util";

/**
 * 1D bit field, backed by a Uint32Array. Hence size is always rounded
 * up to a multiple of 32.
 */
export class BitField {
    data: Uint32Array;
    n: number;

    constructor(bits: number | string | ArrayLike<boolean>) {
        const isNumber = typeof bits === "number";
        this.n = align(isNumber ? <number>bits : (<any>bits).length, 32);
        this.data = new Uint32Array(this.n >>> 5);
        !isNumber && this.setRange(0, <any>bits);
    }

    /**
     * Resizes bitfield to new size given (rounded up to multiples of
     * 32).
     *
     * @param n - new size
     */
    resize(n: number) {
        n = align(n, 32);
        if (n === this.n) return this;
        const dest = new Uint32Array(n >>> 5);
        dest.set(this.data.slice(0, dest.length));
        this.data = dest;
        this.n = n;
        return this;
    }

    /**
     * Returns a non-zero value if bit `n` is enabled. No bounds
     * checking.
     *
     * @param n - bit number
     */
    at(n: number) {
        return this.data[n >>> 5] & (0x80000000 >>> (n & 31));
    }

    /**
     * Enables or disables bit `n`. Returns a non-zero value if the bit
     * was previously enabled. No bounds checking.
     *
     * @param n - bit number
     * @param v - new bit value
     */
    setAt(n: number, v = true) {
        const id = n >>> 5;
        const mask = 0x80000000 >>> (n & 31);
        const r = this.data[id] & mask;
        if (v) {
            this.data[id] |= mask;
        } else {
            this.data[id] &= ~mask;
        }
        return r;
    }

    /**
     * Sets bits from `start` index with given `values`. No bounds
     * checking.
     *
     * @param start -
     * @param vals -
     */
    setRange(start: number, vals: string | ArrayLike<boolean>) {
        const isString = typeof vals === "string";
        for (let i = 0, n = vals.length; i < n; i++) {
            this.setAt(
                start + i,
                isString
                    ? (<string>vals)[i] === "1"
                    : (<ArrayLike<boolean>>vals)[i]
            );
        }
    }

    /**
     * Inverts bit `n`. Returns a non-zero value if the bit was
     * previously enabled. No bounds checking.
     *
     * @param n - bit number
     */
    toggleAt(n: number) {
        const id = n >>> 5;
        const mask = 0x80000000 >>> (n & 31);
        const r = this.data[id] & mask;
        if (r) {
            this.data[id] &= ~mask;
        } else {
            this.data[id] |= mask;
        }
        return r;
    }

    toString() {
        return toString(this.data);
    }
}

export const bitField = (bits: number | string | ArrayLike<boolean>) =>
    new BitField(bits);
