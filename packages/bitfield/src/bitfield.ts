import { assert } from "@thi.ng/api";
import { align, bitAnd, bitNot, bitOr, bitXor } from "@thi.ng/binary";
import { binOp, toString } from "./util";
import type { Fn2, IClear, ICopy } from "@thi.ng/api";

/**
 * 1D bit field, backed by a Uint32Array. Hence size is always rounded
 * up to a multiple of 32.
 */
export class BitField implements IClear, ICopy<BitField> {
    data: Uint32Array;
    n: number;

    constructor(bits: number | string | ArrayLike<boolean>) {
        const isNumber = typeof bits === "number";
        this.n = align(isNumber ? <number>bits : (<any>bits).length, 32);
        this.data = new Uint32Array(this.n >>> 5);
        !isNumber && this.setRange(0, <any>bits);
    }

    clear() {
        this.data.fill(0);
    }

    copy() {
        const dest = new BitField(this.n);
        dest.data.set(this.data);
        return dest;
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

    and(field: BitField) {
        return this.binOp(field, bitAnd);
    }

    or(field: BitField) {
        return this.binOp(field, bitOr);
    }

    xor(field: BitField) {
        return this.binOp(field, bitXor);
    }

    not() {
        return this.binOp(this, bitNot);
    }

    toString() {
        return toString(this.data);
    }

    protected binOp(field: BitField, op: Fn2<number, number, number>) {
        this.ensureSize(field);
        binOp(this.data, field.data, op);
        return this;
    }

    protected ensureSize(field: BitField) {
        assert(field.n === this.n, `fields must be same size`);
    }
}

export const bitField = (bits: number | string | ArrayLike<boolean>) =>
    new BitField(bits);
