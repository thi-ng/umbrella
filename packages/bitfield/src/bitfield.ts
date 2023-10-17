import type { Fn2, IClear, ICopy, ILength } from "@thi.ng/api";
import { align } from "@thi.ng/binary/align";
import { popCountArray } from "@thi.ng/binary/count";
import { bitAnd, bitNot, bitOr, bitXor } from "@thi.ng/binary/logic";
import { assert } from "@thi.ng/errors/assert";
import { binOp, toString } from "./util.js";

/**
 * 1D bit field, backed by a Uint8Array. Hence size is always rounded
 * up to a multiple of 8.
 */
export class BitField implements IClear, ICopy<BitField>, ILength {
	/** Backing byte array */
	data: Uint8Array;
	/** Field size in bits (always a multiple of 8) */
	n: number;

	constructor(bits: number | string | ArrayLike<boolean | number>) {
		const isNumber = typeof bits === "number";
		this.n = align(isNumber ? <number>bits : (<any>bits).length, 8);
		this.data = new Uint8Array(this.n >>> 3);
		!isNumber && this.setRange(0, <any>bits);
	}

	get length() {
		return this.n;
	}

	/**
	 * Yields iterator of the field's individual bits.
	 */
	*[Symbol.iterator]() {
		const { data, n } = this;
		for (let i = 0; i < n; i++) {
			yield data[i >>> 3] & (1 << (~i & 7)) ? 1 : 0;
		}
	}

	/**
	 * Yields iterator of positions/indices of all set bits only.
	 */
	*positions() {
		const { data, n } = this;
		for (let i = 0; i < n; i++) {
			if (data[i >>> 3] & (1 << (~i & 7))) yield i;
		}
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
	 * 8).
	 *
	 * @param n - new size
	 */
	resize(n: number) {
		n = align(n, 8);
		if (n === this.n) return this;
		const dest = new Uint8Array(n >>> 3);
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
		return this.data[n >>> 3] & (1 << (~n & 7));
	}

	/**
	 * Enables or disables bit `n`. Returns a non-zero value if the bit
	 * was previously enabled. No bounds checking.
	 *
	 * @param n - bit number
	 * @param v - new bit value
	 */
	setAt(n: number, v: boolean | number = true) {
		const id = n >>> 3;
		const mask = 1 << (~n & 7);
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
	setRange(start: number, vals: string | ArrayLike<boolean | number>) {
		const isString = typeof vals === "string";
		for (let i = 0, n = Math.min(this.n, i + vals.length); i < n; i++) {
			this.setAt(
				start + i,
				isString
					? (<string>vals)[i] === "1"
					: (<ArrayLike<boolean | number>>vals)[i]
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
		const id = n >>> 3;
		const mask = 1 << (~n & 7);
		const r = this.data[id] & mask;
		if (r) {
			this.data[id] &= ~mask;
		} else {
			this.data[id] |= mask;
		}
		return r;
	}

	/**
	 * Returns number of set bits (1's) in the bitfield.
	 */
	popCount() {
		return popCountArray(this.data);
	}

	/**
	 * Same as {@link BitField.popCount}, but as normalized ratio/percentage.
	 */
	density() {
		return this.popCount() / this.n;
	}

	/**
	 * Computes the Jaccard similarity with given `field`. Returns a value in
	 * [0..1] interval: 1.0 if `a` and `b` are equal, or 0.0 if none of the
	 * components match.
	 *
	 * @remarks
	 * If `field` is not a `BitField` instance, one will be created for it. The
	 * resulting sizes of both fields MUST be equal.
	 *
	 * Reference: https://en.wikipedia.org/wiki/Jaccard_index
	 *
	 * @param field
	 */
	similarity(field: BitField | string | ArrayLike<boolean | number>) {
		const $field = field instanceof BitField ? field : new BitField(field);
		this.ensureSize($field);
		const adata = this.data;
		const bdata = $field.data;
		let numUnion = 0;
		let numIsec = 0;
		for (let i = 0, n = this.n; i < n; i++) {
			const j = i >>> 3;
			const k = 1 << (i & 7);
			const aa = (adata[j] & k) !== 0;
			const bb = (bdata[j] & k) !== 0;
			numUnion += ~~(aa || bb);
			numIsec += ~~(aa && bb);
		}
		return numUnion ? numIsec / numUnion : 0;
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

export const defBitField = (
	bits: number | string | ArrayLike<boolean | number>
) => new BitField(bits);
