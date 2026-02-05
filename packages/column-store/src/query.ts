import type { Fn2, Maybe, Predicate2 } from "@thi.ng/api";
import { isArray } from "@thi.ng/checks/is-array";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { Table } from "./table.js";

export interface QueryTerm {
	type: string;
	col: string;
	value: any;
}

export type QueryTermOp = Fn2<QueryCtx, QueryTerm, void>;

// TODO add options:
// - paging / range queries only applied to certain row range

export class Query {
	terms: QueryTerm[] = [];

	constructor(public table: Table, terms: QueryTerm[] = []) {
		this.terms = terms;
	}

	*execute() {
		const { table } = this;
		const ctx = new QueryCtx(this);
		for (let term of this.terms) {
			execQueryTerm(ctx, term);
		}
		if (ctx.bitmap) {
			for (let i = 0, n = ctx.bitmap!.length; i < n; i++) {
				let bits = ctx.bitmap![i];
				while (bits) {
					const lsb = bits & -bits;
					const bit = Math.clz32(lsb) ^ 31;
					const x = (i << 5) + bit;
					if (x >= table.length) return;
					yield table.getRow(x);
					bits ^= lsb;
				}
			}
		}
	}
}

export class QueryCtx {
	readonly table: Table;
	readonly size: number;
	bitmap?: Uint32Array;

	constructor(public readonly query: Query) {
		this.table = query.table;
		this.size = Math.ceil(this.table.length / 32);
	}

	makeMask(seed?: Uint32Array) {
		const mask = new Uint32Array(this.size);
		if (seed) mask.set(seed);
		return mask;
	}

	mergeMask(mask: Uint32Array) {
		if (this.bitmap) {
			for (let i = 0, n = mask.length; i < n; i++)
				this.bitmap![i] &= mask[i];
		} else this.bitmap = mask;
	}

	invertMask(mask: Uint32Array) {
		for (let i = 0, n = this.size; i < n; i++) mask[i] ^= -1;
		return mask;
	}
}

const execBitOr: QueryTermOp = (ctx, term) => {
	const column = ctx.table.columns[term.col];
	const bitmap = column.bitmap!;
	const value = column.encode(term.value);
	let mask: Maybe<Uint32Array>;
	if (isArray(value)) {
		for (let v of value) {
			const b = bitmap.index.get(v);
			if (!b) continue;
			// compute union bitmaps
			if (mask) {
				for (let i = 0; i < b.length; i++) mask[i] |= b[i];
			} else mask = ctx.makeMask(b);
		}
	} else {
		const b = bitmap.index.get(value);
		if (b) mask = ctx.makeMask(b);
	}
	if (mask) {
		if (term.type === "nor") ctx.invertMask(mask);
		ctx.mergeMask(mask);
	}
};

const execOr: QueryTermOp = (ctx, term) => {
	const n = ctx.table.length;
	const column = ctx.table.columns[term.col];
	const encoded = column.encode(term.value);
	const values = column.values;
	const pred: Predicate2<any> = column.isArray
		? (row: any[], v) => row.includes(v)
		: (row, v) => row === v;
	let mask: Maybe<Uint32Array>;
	for (let v of isArray(encoded) ? encoded : [encoded]) {
		for (let i = 0; i < n; i++) {
			if (pred(values[i], v)) {
				if (!mask) mask = ctx.makeMask();
				mask[i >>> 5] |= 1 << (i & 31);
			}
		}
	}
	if (mask) {
		if (term.type === "nor") ctx.invertMask(mask);
		ctx.mergeMask(mask);
	}
};

const execBitAnd: QueryTermOp = (ctx, term) => {
	const column = ctx.query.table.columns[term.col];
	const bitmap = column.bitmap!;
	const value = column.encode(term.value);
	let mask: Maybe<Uint32Array>;
	if (isArray(value)) {
		// pre-lookup bitmaps and bail out early
		const colBitmaps: Uint32Array[] = [];
		for (let v of value) {
			const b = bitmap.index.get(v);
			if (!b) {
				if (term.type === "and") ctx.bitmap = undefined;
				return;
			}
			colBitmaps.push(b);
		}
		// compute bitmap intersection
		for (let b of colBitmaps) {
			if (mask) {
				for (let i = 0; i < b.length; i++) mask[i] &= b[i];
				mask.fill(0, b.length);
			} else mask = ctx.makeMask(b);
		}
	} else {
		const b = bitmap.index.get(value);
		if (b) mask = ctx.makeMask(b);
	}
	if (mask) {
		if (term.type === "nand") ctx.invertMask(mask);
		ctx.mergeMask(mask);
	} else {
		ctx.bitmap = undefined;
	}
};

const execAnd: QueryTermOp = (ctx, term) => {
	const n = ctx.table.length;
	const column = ctx.table.columns[term.col];
	const encoded = column.encode(term.value) ?? null;
	const values = column.values;
	const pred: Predicate2<any> = column.isArray
		? (row: any[], v) => row.includes(v)
		: (row, v) => row === v;
	let mask: Maybe<Uint32Array>;
	for (let v of isArray(encoded) ? encoded : [encoded]) {
		let m: Maybe<Uint32Array>;
		for (let i = 0; i < n; i++) {
			if (pred(values[i], v)) {
				if (!m) m = ctx.makeMask();
				m[i >>> 5] |= 1 << (i & 31);
			}
		}
		if (m) {
			if (mask) {
				for (let i = 0; i < n; i++) mask[i] &= m[i];
			} else mask = m;
		} else {
			if (term.type === "and") ctx.bitmap = undefined;
			return;
		}
	}
	if (mask) {
		if (term.type === "nand") ctx.invertMask(mask);
		ctx.mergeMask(mask);
	}
};

export const execQueryTerm = defmulti<QueryCtx, QueryTerm, void>(
	(_, term) => term.type,
	{
		nor: "or",
		nand: "and",
	},
	{
		or: (ctx, term) => {
			const column = ctx.table.columns[term.col];
			(term.value != null && column.bitmap ? execBitOr : execOr)(
				ctx,
				term
			);
		},

		and: (ctx, term) => {
			const column = ctx.table.columns[term.col];
			(term.value != null && column.bitmap ? execBitAnd : execAnd)(
				ctx,
				term
			);
		},
	}
);
