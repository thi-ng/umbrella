import {
    NumericArray,
    Range1_32,
    Range1_64,
    RangeValueMap
} from "@thi.ng/api";
import { MASKS } from "@thi.ng/binary";

type Range2_64 = Exclude<Range1_64, 1>;

/**
 * Z-Curve encoder/decoder for arbitrary dimensions, max. 32bit
 * per-component range and the resulting Morton codes encoded as
 * `BigInt`.
 */
export class ZCurve<T extends Range2_64> {
    static encodeComponent(
        x: number,
        bits: number,
        dims: number,
        offset: number,
        res: bigint = 0n
    ) {
        for (let j = bits; --j >= 0; ) {
            if ((x >>> j) & 1) {
                res |= 1n << BigInt(j * dims + offset);
            }
        }
        return res;
    }

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

    /**
     *
     * @param dim - dimensions
     * @param bits - number of bits per component
     * @param pattern - component order
     */
    constructor(dim: T, bits: Range1_32, pattern: ArrayLike<RangeValueMap[T]>) {
        this.dim = dim;
        this.bits = bits;
        this.pattern = pattern;
        this.masks = [];
        for (let i = dim; --i >= 0; ) {
            this.masks[i] = ZCurve.encodeComponent(
                MASKS[bits],
                bits,
                dim,
                pattern[i]
            );
        }
    }

    encode(p: ArrayLike<number>) {
        let res = 0n;
        const { dim, bits, pattern } = this;
        for (let i = dim; --i >= 0; ) {
            res = ZCurve.encodeComponent(p[i], bits, dim, pattern[i], res);
        }
        return res;
    }

    decode(z: bigint, out: NumericArray = []) {
        const { dim, bits, pattern } = this;
        for (let i = dim; --i >= 0; ) {
            out[i] = ZCurve.decodeComponent(z, bits, dim, pattern[i]);
        }
        return out;
    }

    split(z: bigint, out: bigint[] = []) {
        for (let i = this.dim; --i >= 0; ) {
            out[i] = z & this.masks[i];
        }
        return out;
    }

    merge(parts: bigint[]) {
        let res = 0n;
        for (let i = parts.length; --i >= 0; ) {
            res |= parts[i];
        }
        return res;
    }
}
