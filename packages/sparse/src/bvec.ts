// SPDX-License-Identifier: Apache-2.0
import { assert } from "@thi.ng/errors/assert";
import { ensureIndex } from "@thi.ng/errors/out-of-bounds";
import type { BinOp, NzEntry } from "./api.js";

/**
 * Sparse nD binary vector where each component can only have 0 or 1 values and
 * only the indices of 1-components are stored. See thi.ng/bitfield for an
 * alternative.
 */
export class SparseBVec {
	/**
	 * Creates a SparseBVec from a dense vector of numbers or booleans. Only the
	 * indices of truthy or non-zero components are stored.
	 *
	 * @param dense
	 */
	static fromDense(dense: ArrayLike<number | boolean>) {
		const sparse: number[] = [];
		const n = dense.length;
		for (let i = 0; i < n; i++) {
			dense[i] && sparse.push(i);
		}
		return new SparseBVec(n, sparse);
	}

	m: number;
	data: number[];

	constructor(m: number, data?: number[]) {
		this.m = m;
		this.data = data || [];
	}

	copy() {
		return new SparseBVec(this.m, this.data.slice());
	}

	get length() {
		return this.m;
	}

	get nnz() {
		return this.data.length;
	}

	*nzEntries() {
		const d = this.data;
		for (let i = 0, n = d.length; i < n; i++) {
			yield <NzEntry>[d[i], 0, 1];
		}
	}

	at(m: number, safe = true) {
		safe && ensureIndex(m, 0, this.m);
		return ~~this.data.includes(m);
	}

	setAt(m: number, v: number, safe = true) {
		safe && ensureIndex(m, 0, this.m);
		const d = this.data;
		for (let i = 0, n = d.length; i < n; i++) {
			if (m < d[i]) {
				v !== 0 && d.splice(i, 0, m);
				return this;
			} else if (m === d[i]) {
				v === 0 && d.splice(i, 1);
				return this;
			}
		}
		v && d.push(m);
		return this;
	}

	binopN(op: BinOp, n: number) {
		const { data, m } = this;
		const res: number[] = [];
		let v: number;
		for (let i = 0, j = 0; i < m; i++) {
			v = op(i === data[j] ? (j++, 1) : 0, n);
			v !== 0 && res.push(i);
		}
		return new SparseBVec(this.m, res);
	}

	binop(op: BinOp, b: SparseBVec) {
		this.ensureSize(b);
		const da = this.data;
		const db = b.data;
		const res: number[] = [];
		let ia: number, ib: number, v: number;
		for (
			let i = 0, j = 0, na = da.length, nb = db.length;
			i < na || j < nb;

		) {
			ia = da[i];
			ib = db[j];
			if (ia === ib) {
				v = op(1, 1);
				v !== 0 && res.push(ia);
				i++;
				j++;
			} else if (ib === undefined || ia < ib) {
				v = op(1, 0);
				v !== 0 && res.push(ia);
				i++;
			} else {
				v = op(0, 1);
				v !== 0 && res.push(ib);
				j++;
			}
		}
		return new SparseBVec(this.m, res);
	}

	and(b: SparseBVec) {
		return this.binop((a, b) => ~~(a && b), b);
	}

	or(b: SparseBVec) {
		return this.binop((a, b) => ~~(a || b), b);
	}

	not() {
		return this.binopN((a, b) => a ^ b, 1);
	}

	dot(v: SparseBVec) {
		this.ensureSize(v);
		const da = this.data;
		const db = v.data;
		let res = 0;
		let ia: number, ib: number;
		for (
			let i = 0, j = 0, na = da.length, nb = db.length;
			i < na && j < nb;

		) {
			ia = da[i];
			ib = db[j];
			if (ia === ib) {
				res++;
				i++;
				j++;
			} else if (ia < ib) i++;
			else j++;
		}
		return res;
	}

	magSquared() {
		return this.data.length;
	}

	mag() {
		return Math.sqrt(this.data.length);
	}

	toDense() {
		const res = new Array<number>(this.m).fill(0);
		const d = this.data;
		for (let i = 0, n = d.length; i < n; i++) {
			res[d[i]] = 1;
		}
		return res;
	}

	toString() {
		return `[${this.toDense().join(",")}]`;
	}

	protected ensureSize(v: SparseBVec) {
		assert(this.m === v.m, `wrong vector size: ${v.m}`);
	}
}
