import { assert } from "@thi.ng/api";
import { align, bitAnd, bitNot, bitOr, bitXor } from "@thi.ng/binary";
import { binOp, toString } from "./util";
import type { Fn2, IClear, ICopy } from "@thi.ng/api";

/**
 * MxN row-major 2D bit matrix, backed by a Uint32Array. Hence the width
 * (number of columns) is always rounded up to a multiple of 32.
 */
export class BitMatrix implements IClear, ICopy<BitMatrix> {
    data: Uint32Array;
    stride: number;
    m: number;
    n: number;

    constructor(rows: number, cols = rows) {
        this.m = rows;
        this.n = cols = align(cols, 32);
        this.stride = cols >>> 5;
        this.data = new Uint32Array(rows * this.stride);
    }

    clear() {
        this.data.fill(0);
    }

    copy() {
        const dest = new BitMatrix(this.m, this.n);
        dest.data.set(this.data);
        return dest;
    }

    /**
     * Resizes matrix to new size given (width always rounded up to
     * multiples of 32).
     *
     * @param m - new number of rows
     * @param n - new number of cols
     */
    resize(m: number, n = m) {
        n = align(n, 32);
        if (m === this.m && n === this.n) return this;
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
     * @param m - row
     * @param n - column
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
     * @param m - row
     * @param n - column
     * @param v - bit value
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

    /**
     * Inverts bit at `m,n` (row major). Returns a non-zero value if the
     * bit was previously enabled. No bounds checking.
     *
     * @param m - row
     * @param n - column
     */
    toggleAt(m: number, n: number) {
        const id = (n >>> 5) + m * this.stride;
        const mask = 0x80000000 >>> (n & 31);
        const r = this.data[id] & mask;
        if (r) {
            this.data[id] &= ~mask;
        } else {
            this.data[id] |= mask;
        }
        return r;
    }

    and(mat: BitMatrix) {
        return this.binOp(mat, bitAnd);
    }

    or(mat: BitMatrix) {
        return this.binOp(mat, bitOr);
    }

    xor(mat: BitMatrix) {
        return this.binOp(mat, bitXor);
    }

    not() {
        return this.binOp(this, bitNot);
    }

    toString() {
        const res: string[] = [];
        for (let i = 0, j = 0, s = this.stride; i < this.m; i++, j += s) {
            res.push(toString(this.data.subarray(j, j + s)));
        }
        return res.join("\n");
    }

    protected binOp(field: BitMatrix, op: Fn2<number, number, number>) {
        this.ensureSize(field);
        binOp(this.data, field.data, op);
        return this;
    }

    protected ensureSize(field: BitMatrix) {
        assert(
            field.m === this.m && field.n === this.n,
            `matrices must be same size`
        );
    }
}

export const bitMatrix = (rows: number, cols = rows) =>
    new BitMatrix(rows, cols);
