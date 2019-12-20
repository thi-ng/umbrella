import {
    assert,
    NumericArray,
    Range1_32,
    Range1_64,
    RangeValueMap
} from "@thi.ng/api";
import { MASKS } from "@thi.ng/binary";

type Range2_64 = Exclude<Range1_64, 1>;

/**
 * Z-Curve encoder/decoder and optimized bbox range extraction for
 * arbitrary dimensions. Supports max. 32bit per-component value range
 * and resulting Morton codes encoded as `BigInt`.
 */
export class ZCurve<T extends Range2_64> {
    /**
     * Encodes a single nD point component as partial Z index.
     *
     * @param x - component value
     * @param bits - bits per component
     * @param dims - number of dimensions
     * @param offset - bit offset (for curr dimension)
     * @param out - existing partial Z result
     */
    static encodeComponent(
        x: number,
        bits: number,
        dims: number,
        offset: number,
        out: bigint = 0n
    ) {
        for (let j = bits; --j >= 0; ) {
            if ((x >>> j) & 1) {
                out |= 1n << BigInt(j * dims + offset);
            }
        }
        return out;
    }

    /**
     * Decodes a single nD component from given Z index.
     *
     * @param z - Z index
     * @param bits - bits per component
     * @param dims - number of dimensions
     * @param offset - bit offset (for curr dimension)
     */
    static decodeComponent(
        z: bigint,
        bits: number,
        dims: number,
        offset: number
    ) {
        let res = 0;
        for (let j = bits; --j >= 0; ) {
            if ((z >> BigInt(j * dims + offset)) & 1n) {
                res |= 1 << j;
            }
        }
        return res;
    }

    dim: T;
    bits: number;
    pattern: ArrayLike<number>;
    masks: bigint[];
    fullMask: bigint;

    /**
     * @param dim - dimensions
     * @param bits - number of bits per component
     * @param pattern - component order
     */
    constructor(
        dim: T,
        bits: Range1_32,
        pattern?: ArrayLike<RangeValueMap[T]>
    ) {
        assert(dim >= 1, `unsupported dimensions`);
        assert(bits >= 1 && bits <= 32, `unsupported bits per component`);
        this.dim = dim;
        this.bits = bits;
        if (!pattern) {
            pattern = [];
            for (let i = 0; i < dim; i++) (<any>pattern)[i] = <any>i;
        }
        this.pattern = pattern;
        this.masks = [];
        this.fullMask = (1n << BigInt(dim * bits)) - 1n;
        for (let i = dim; --i >= 0; ) {
            this.masks[i] = ZCurve.encodeComponent(
                MASKS[bits],
                bits,
                dim,
                pattern[i]
            );
        }
    }

    /**
     * Encodes given nD point as Z index.
     *
     * @param p - point to encode
     */
    encode(p: ArrayLike<number>) {
        let res = 0n;
        const { dim, bits, pattern } = this;
        for (let i = dim; --i >= 0; ) {
            res = ZCurve.encodeComponent(p[i], bits, dim, pattern[i], res);
        }
        return res;
    }

    /**
     * Decodes given Z index into point coordinates.
     *
     * @param z - Z index
     * @param out - optional result array
     */
    decode(z: bigint, out: NumericArray = []) {
        const { dim, bits, pattern } = this;
        for (let i = dim; --i >= 0; ) {
            out[i] = ZCurve.decodeComponent(z, bits, dim, pattern[i]);
        }
        return out;
    }

    /**
     * Decomposes given Z index into individual bit patterns, one per
     * dimension.
     *
     * @remarks
     *
     *
     * @param z -
     * @param out -
     */
    split(z: bigint, out: bigint[] = []) {
        for (let i = this.dim; --i >= 0; ) {
            out[i] = z & this.masks[i];
        }
        return out;
    }

    merge(zparts: bigint[]) {
        let res = 0n;
        for (let i = zparts.length; --i >= 0; ) {
            res |= zparts[i];
        }
        return res;
    }

    /**
     * Yields iterator of Z-curve indices in given nD bounding box.
     *
     * @remarks
     * Uses {@link ZCurve.pointInBox} and {@link ZCurve.bigMin} to
     * efficiently skip Z index sub-ranges outside the box.
     *
     * References:
     * - {@link https://en.wikipedia.org/wiki/Z-order_curve#Use_with_one-dimensional_data_structures_for_range_searching}
     * - {@link https://aws.amazon.com/blogs/database/z-order-indexing-for-multifaceted-queries-in-amazon-dynamodb-part-1/}
     * - {@link https://aws.amazon.com/blogs/database/z-order-indexing-for-multifaceted-queries-in-amazon-dynamodb-part-2/}
     *
     * @param rmin - bbox min point
     * @param rmax - bbox max point
     */
    *range(rmin: ArrayLike<number>, rmax: ArrayLike<number>) {
        const zmin = this.encode(rmin);
        const zmax = this.encode(rmax);
        const p = new Array<number>(this.dim);
        let xd = zmin;
        while (xd !== -1n) {
            this.decode(xd, p);
            if (this.pointInBox(p, rmin, rmax)) {
                yield xd;
                xd++;
            } else {
                xd = this.bigMin(xd, zmin, zmax);
            }
        }
    }

    /**
     * Computes the next valid Z index in bbox defined by `zmin` /
     * `zmax` and greater than `zcurr`. Returns -1 if no further indices
     * are in the box.
     *
     * @remarks
     * Partially based on:
     * {@link https://github.com/statgen/LDServer/blob/master/core/src/Morton.cpp#L38}
     *
     * @param zcurr
     * @param zmin
     * @param zmax
     */
    bigMin(zcurr: bigint, zmin: bigint, zmax: bigint) {
        const dim = this.dim;
        let bigmin = -1n;
        let bitPos = dim * this.bits - 1;
        let mask = 1n << BigInt(bitPos);
        do {
            const zminBit = zmin & mask;
            const zmaxBit = zmax & mask;
            const currBit = zcurr & mask;
            const bitMask = 1 << ((bitPos / dim) | 0);
            const offset = bitPos % dim;
            if (!currBit) {
                if (!zminBit && zmaxBit) {
                    bigmin = this.loadBits(bitMask, bitPos, zmin, offset);
                    zmax = this.loadBits(bitMask - 1, bitPos, zmax, offset);
                } else if (zminBit && zmaxBit) {
                    return zmin;
                } else if (zminBit && !zmaxBit) {
                    throw new Error("illegal BIGMIN state");
                }
            } else {
                if (!zminBit && !zmaxBit) {
                    return bigmin;
                } else if (!zminBit && zmaxBit) {
                    zmin = this.loadBits(bitMask, bitPos, zmin, offset);
                } else if (zminBit && !zmaxBit) {
                    throw new Error("illegal BIGMIN state");
                }
            }
            bitPos--;
            mask >>= 1n;
        } while (mask);
        return bigmin;
    }

    pointInBox(
        p: ArrayLike<number>,
        rmin: ArrayLike<number>,
        rmax: ArrayLike<number>
    ) {
        for (let i = this.dim; --i >= 0; ) {
            const x = p[i];
            if (x < rmin[i] || x > rmax[i]) return false;
        }
        return true;
    }

    protected loadBits(
        mask: number,
        bitPos: number,
        z: bigint,
        offset: number
    ) {
        const { bits, dim } = this;
        const wipeMask =
            ZCurve.encodeComponent(
                MASKS[bits] >>> (bits - (((bitPos / dim) | 0) + 1)),
                bits,
                dim,
                offset
            ) ^ this.fullMask;
        const bitPattern = ZCurve.encodeComponent(mask, bits, dim, offset);
        return (z & wipeMask) | bitPattern;
    }
}
