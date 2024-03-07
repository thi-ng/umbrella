import type {
	NumericArray,
	Range1_32,
	Range1_64,
	RangeValueMap,
} from "@thi.ng/api";
import { MASKS } from "@thi.ng/binary/constants";
import { assert } from "@thi.ng/errors/assert";

export type Range2_64 = Exclude<Range1_64, 1>;

const ZERO = BigInt(0);
const ONE = BigInt(1);
const MINUS_ONE = BigInt(-1);

/**
 * Z-Curve encoder/decoder and optimized bbox range extraction for
 * arbitrary dimensions (>= 2). Supports max. 32bit per-component value
 * range and resulting Morton codes encoded as `BigInt`.
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
		out: bigint = ZERO
	) {
		for (let j = bits; j-- > 0; ) {
			if ((x >>> j) & 1) {
				out |= ONE << BigInt(j * dims + offset);
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
		for (let j = bits; j-- > 0; ) {
			if ((z >> BigInt(j * dims + offset)) & ONE) {
				res |= 1 << j;
			}
		}
		return res >>> 0;
	}

	dim: T;
	bits: number;
	order: ArrayLike<number>;
	masks!: bigint[];
	wipeMasks!: bigint[];

	/**
	 * @param dim - dimensions
	 * @param bits - number of bits per component
	 * @param order - component ordering
	 */
	constructor(dim: T, bits: Range1_32, order?: ArrayLike<RangeValueMap[T]>) {
		assert(dim >= 2, `unsupported dimensions`);
		assert(bits >= 1 && bits <= 32, `unsupported bits per component`);
		this.dim = dim;
		this.bits = bits;
		if (!order) {
			order = [];
			for (let i = 0; i < dim; i++) (<any>order)[i] = <any>i;
		}
		this.order = order;
		this.initMasks();
	}

	/**
	 * Encodes given nD point as Z index.
	 *
	 * @param p - point to encode
	 */
	encode(p: ArrayLike<number>) {
		let res = ZERO;
		const { dim, bits, order } = this;
		for (let i = dim; i-- > 0; ) {
			res = ZCurve.encodeComponent(p[i], bits, dim, order[i], res);
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
		const { dim, bits, order } = this;
		for (let i = dim; i-- > 0; ) {
			out[i] = ZCurve.decodeComponent(z, bits, dim, order[i]);
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
		for (let i = this.dim; i-- > 0; ) {
			out[i] = z & this.masks[i];
		}
		return out;
	}

	merge(zparts: bigint[]) {
		let res = ZERO;
		for (let i = zparts.length; i-- > 0; ) {
			res |= zparts[i];
		}
		return res;
	}

	/**
	 * Yields iterator of Z-curve indices in given nD bounding box.
	 *
	 * @remarks
	 * Uses {@link ZCurve.pointInBox} and {@link ZCurve.bigMin} to efficiently
	 * skip Z index sub-ranges outside the box.
	 *
	 * References:
	 * - https://en.wikipedia.org/wiki/Z-order_curve#Use_with_one-dimensional_data_structures_for_range_searching
	 * - https://aws.amazon.com/blogs/database/z-order-indexing-for-multifaceted-queries-in-amazon-dynamodb-part-1/
	 * - https://aws.amazon.com/blogs/database/z-order-indexing-for-multifaceted-queries-in-amazon-dynamodb-part-2/
	 *
	 * @param rmin - bbox min point
	 * @param rmax - bbox max point
	 */
	*range(rmin: ArrayLike<number>, rmax: ArrayLike<number>) {
		const zmin = this.encode(rmin);
		const zmax = this.encode(rmax);
		const p = new Array<number>(this.dim);
		let xd = zmin;
		while (xd !== MINUS_ONE) {
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
	 * Computes the next valid Z index in bbox defined by `zmin` / `zmax` and
	 * greater than `zcurr`. Returns -1 if no further indices are in the box.
	 *
	 * @remarks
	 * Partially based on:
	 * https://github.com/statgen/LDServer/blob/develop/core/src/Morton.cpp#L38
	 *
	 * @param zcurr -
	 * @param zmin -
	 * @param zmax -
	 */
	bigMin(zcurr: bigint, zmin: bigint, zmax: bigint) {
		const dim = this.dim;
		let bigmin = MINUS_ONE;
		let bitPos = dim * this.bits - 1;
		let mask = ONE << BigInt(bitPos);
		do {
			const zminBit = zmin & mask;
			const zmaxBit = zmax & mask;
			const currBit = zcurr & mask;
			const bitMask = 1 << ((bitPos / dim) | 0);
			if (!currBit) {
				if (!zminBit && zmaxBit) {
					bigmin = this.loadBits(bitMask, bitPos, zmin);
					zmax = this.loadBits(bitMask - 1, bitPos, zmax);
				} else if (zminBit) {
					if (zmaxBit) {
						return zmin;
					} else {
						throw new Error("illegal BIGMIN state");
					}
				}
			} else {
				if (!zminBit) {
					if (zmaxBit) {
						zmin = this.loadBits(bitMask, bitPos, zmin);
					} else {
						return bigmin;
					}
				} else if (!zmaxBit) {
					throw new Error("illegal BIGMIN state");
				}
			}
			bitPos--;
			mask >>= ONE;
		} while (mask);
		return bigmin;
	}

	pointInBox(
		p: ArrayLike<number>,
		rmin: ArrayLike<number>,
		rmax: ArrayLike<number>
	) {
		for (let i = this.dim; i-- > 0; ) {
			const x = p[i];
			if (x < rmin[i] || x > rmax[i]) return false;
		}
		return true;
	}

	protected initMasks() {
		const { bits, dim, order } = this;
		this.masks = [];
		for (let i = dim; i-- > 0; ) {
			this.masks[i] = ZCurve.encodeComponent(
				MASKS[bits],
				bits,
				dim,
				order[i]
			);
		}
		this.wipeMasks = [];
		const fullMask = (ONE << BigInt(dim * bits)) - ONE;
		for (let i = dim * bits; i-- > 0; ) {
			this.wipeMasks[i] =
				ZCurve.encodeComponent(
					MASKS[bits] >>> (bits - (((i / dim) | 0) + 1)),
					bits,
					dim,
					i % dim
				) ^ fullMask;
		}
	}

	protected loadBits(mask: number, bitPos: number, z: bigint) {
		const dim = this.dim;
		return (
			(z & this.wipeMasks[bitPos]) |
			ZCurve.encodeComponent(mask, this.bits, dim, bitPos % dim)
		);
	}
}

export class ZCurve2 extends ZCurve<2> {
	constructor(bits: Range1_32, order?: ArrayLike<RangeValueMap[2]>) {
		super(2, bits, order);
	}

	encode(p: ArrayLike<number>) {
		const { dim, bits, order } = this;
		return ZCurve.encodeComponent(
			p[1],
			bits,
			dim,
			order[1],
			ZCurve.encodeComponent(p[0], bits, dim, order[0])
		);
	}

	decode(z: bigint, out: NumericArray = []) {
		const { dim, bits, order } = this;
		out[0] = ZCurve.decodeComponent(z, bits, dim, order[0]);
		out[1] = ZCurve.decodeComponent(z, bits, dim, order[1]);
		return out;
	}

	pointInBox(
		p: ArrayLike<number>,
		rmin: ArrayLike<number>,
		rmax: ArrayLike<number>
	) {
		const x = p[0];
		const y = p[1];
		return x >= rmin[0] && x <= rmax[0] && y >= rmin[1] && y <= rmax[1];
	}
}

export class ZCurve3 extends ZCurve<3> {
	constructor(bits: Range1_32, order?: ArrayLike<RangeValueMap[3]>) {
		super(3, bits, order);
	}

	encode(p: ArrayLike<number>) {
		const { dim, bits, order } = this;
		return ZCurve.encodeComponent(
			p[2],
			bits,
			dim,
			order[2],
			ZCurve.encodeComponent(
				p[1],
				bits,
				dim,
				order[1],
				ZCurve.encodeComponent(p[0], bits, dim, order[0])
			)
		);
	}

	decode(z: bigint, out: NumericArray = []) {
		const { dim, bits, order } = this;
		out[0] = ZCurve.decodeComponent(z, bits, dim, order[0]);
		out[1] = ZCurve.decodeComponent(z, bits, dim, order[1]);
		out[2] = ZCurve.decodeComponent(z, bits, dim, order[2]);
		return out;
	}

	pointInBox(
		p: ArrayLike<number>,
		rmin: ArrayLike<number>,
		rmax: ArrayLike<number>
	) {
		const x = p[0];
		const y = p[1];
		const z = p[2];
		return (
			x >= rmin[0] &&
			x <= rmax[0] &&
			y >= rmin[1] &&
			y <= rmax[1] &&
			z >= rmin[2] &&
			z <= rmax[2]
		);
	}
}
