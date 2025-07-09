// SPDX-License-Identifier: Apache-2.0
import type { Fn3, IEquiv, Pair, UIntArray } from "@thi.ng/api";
import type { IEquivSet } from "@thi.ng/associative/api";
import { dissoc } from "@thi.ng/associative/dissoc";
import { __disposableValues } from "@thi.ng/associative/internal/dispose";
import { __tostringMixin } from "@thi.ng/associative/internal/tostring";
import { into } from "@thi.ng/associative/into";
import { isNumber } from "@thi.ng/checks/is-number";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";

/** @internal */
const __fail = () => illegalArgs(`dense & sparse arrays must be of same size`);

/**
 * After "An Efficient Representation for Sparse Sets" Preston Briggs and Linda
 * Torczon (1993)
 *
 * - https://research.swtch.com/sparse
 * - https://programmingpraxis.com/2012/03/09/sparse-sets/
 * - https://blog.molecular-matters.com/2013/07/24/adventures-in-data-oriented-design-part-3c-external-references/
 */
@__disposableValues
@__tostringMixin
export abstract class ASparseSet<T extends UIntArray>
	extends Set<number>
	implements IEquiv
{
	#dense: UIntArray;
	#sparse: UIntArray;
	#n = 0;

	protected constructor(dense: T, sparse: T) {
		super();
		this.#dense = dense;
		this.#sparse = sparse;
	}

	[Symbol.iterator]() {
		return this.keys();
	}

	// mixin
	[Symbol.dispose]() {}

	get size(): number {
		return this.#n;
	}

	get capacity(): number {
		return this.#dense.length;
	}

	clear() {
		this.#n = 0;
	}

	equiv(o: any) {
		if (this === o) {
			return true;
		}
		if (!(o instanceof Set) || this.size !== o.size) {
			return false;
		}
		const d = this.#dense;
		for (let i = this.#n; i-- > 0; ) {
			if (!o.has(d[i])) {
				return false;
			}
		}
		return true;
	}

	add(key: number) {
		const max = this.#dense.length;
		const i = this.#sparse[key];
		const n = this.#n;
		if (key < max && n < max && !(i < n && this.#dense[i] === key)) {
			this.#dense[n] = key;
			this.#sparse[key] = n;
			this.#n++;
		}
		return this;
	}

	delete(key: number) {
		const dense = this.#dense;
		const sparse = this.#sparse;
		const i = sparse[key];
		if (i < this.#n && dense[i] === key) {
			const j = dense[--this.#n];
			dense[i] = j;
			sparse[j] = i;
			return true;
		}
		return false;
	}

	has(key: number): boolean {
		const i = this.#sparse[key];
		return i < this.#n && this.#dense[i] === key;
	}

	get(key: number, notFound = -1) {
		return this.has(key) ? key : notFound;
	}

	first() {
		return this.#n ? this.#dense[0] : undefined;
	}

	into(keys: Iterable<number>) {
		return <this>into(this, keys);
	}

	disj(keys: Iterable<number>) {
		return <this>dissoc(this, keys);
	}

	forEach(fn: Fn3<number, number, Set<number>, void>, thisArg?: any) {
		const dense = this.#dense;
		const n = this.#n;
		for (let i = 0; i < n; i++) {
			const v = dense[i];
			fn.call(thisArg, v, v, this);
		}
	}

	*entries(): SetIterator<Pair<number, number>> {
		const dense = this.#dense;
		const n = this.#n;
		for (let i = 0; i < n; i++) {
			yield [dense[i], dense[i]];
		}
	}

	*keys(): SetIterator<number> {
		const dense = this.#dense;
		const n = this.#n;
		for (let i = 0; i < n; i++) {
			yield dense[i];
		}
	}

	values() {
		return this.keys();
	}

	protected __copyTo<S extends ASparseSet<T>>(dest: S) {
		dest.#dense = this.#dense.slice();
		dest.#sparse = this.#sparse.slice();
		dest.#n = this.#n;
		return dest;
	}
}

export class SparseSet8
	extends ASparseSet<Uint8Array>
	implements IEquivSet<number>
{
	constructor(dense: Uint8Array, sparse: Uint8Array);
	constructor(n: number);
	constructor(n: number | Uint8Array, sparse?: Uint8Array) {
		isNumber(n)
			? super(new Uint8Array(n), new Uint8Array(n))
			: n.length === sparse!.length
			? super(n, sparse!)
			: __fail();
	}

	get [Symbol.species]() {
		return SparseSet8;
	}

	get [Symbol.toStringTag]() {
		return "SparseSet8";
	}

	copy() {
		return this.__copyTo(new SparseSet8(0));
	}

	empty() {
		return new SparseSet8(this.capacity);
	}
}

export class SparseSet16
	extends ASparseSet<Uint16Array>
	implements IEquivSet<number>
{
	constructor(dense: Uint16Array, sparse: Uint16Array);
	constructor(n: number);
	constructor(n: number | Uint16Array, sparse?: Uint16Array) {
		isNumber(n)
			? super(new Uint16Array(n), new Uint16Array(n))
			: n.length === sparse!.length
			? super(n, sparse!)
			: __fail();
	}

	get [Symbol.species]() {
		return SparseSet16;
	}

	get [Symbol.toStringTag]() {
		return "SparseSet16";
	}

	copy() {
		return this.__copyTo(new SparseSet16(0));
	}

	empty() {
		return new SparseSet16(this.capacity);
	}
}

export class SparseSet32
	extends ASparseSet<Uint32Array>
	implements IEquivSet<number>
{
	constructor(dense: Uint32Array, sparse: Uint32Array);
	constructor(n: number);
	constructor(n: number | Uint32Array, sparse?: Uint32Array) {
		isNumber(n)
			? super(new Uint32Array(n), new Uint32Array(n))
			: n.length === sparse!.length
			? super(n, sparse!)
			: __fail();
	}

	get [Symbol.species]() {
		return SparseSet32;
	}

	get [Symbol.toStringTag]() {
		return "SparseSet32";
	}

	copy() {
		return this.__copyTo(new SparseSet32(0));
	}

	empty() {
		return new SparseSet32(this.capacity);
	}
}

/**
 * Creates a new sparse set with given max. capacity (max ID + 1) and
 * chooses most memory efficient implementation, e.g. if `n` <= 256
 * returns a {@link SparseSet8} instance.
 *
 * @param n - max capacity, ID range: [0...n)
 */
export const defSparseSet = (n: number) =>
	n <= 0x100
		? new SparseSet8(n)
		: n <= 0x10000
		? new SparseSet16(n)
		: new SparseSet32(n);
