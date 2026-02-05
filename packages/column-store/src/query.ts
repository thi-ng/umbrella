import type { Maybe, Predicate, Predicate2 } from "@thi.ng/api";
import { isArray } from "@thi.ng/checks/is-array";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { unsupportedOp } from "@thi.ng/errors/unsupported";
import type {
	IColumn,
	QueryTerm,
	QueryTermOp,
	QueryTermOpSpec,
} from "./api.js";
import type { Table } from "./table.js";

// TODO add options:
// - paging / range queries only applied to certain row range

export class Query {
	terms: QueryTerm[] = [];

	constructor(public table: Table, terms: QueryTerm[] = []) {
		this.terms = terms;
	}

	addTerm(term: QueryTerm) {
		this.terms.push(term);
		return this;
	}

	/** Alias for {@link Query.or} */
	where = (column: string, value: any) => this.or(column, value);

	/** Alias for {@link Query.nor} */
	whereNot = (column: string, value: any) => this.nor(column, value);

	or(column: string, value: any) {
		this.terms.push({ type: "or", column, value });
		return this;
	}

	nor(column: string, value: any) {
		this.terms.push({ type: "nor", column, value });
		return this;
	}

	and(column: string, value: any) {
		this.terms.push({ type: "and", column, value });
		return this;
	}

	nand(column: string, value: any) {
		this.terms.push({ type: "nand", column, value });
		return this;
	}

	matchColumn(column: string, pred: Predicate<any>) {
		this.terms.push({ type: "matchCol", column, value: pred });
		return this;
	}

	matchPartialRow(columns: string[], pred: Predicate<Record<string, any>>) {
		this.terms.push({
			type: "matchPartialRow",
			params: columns,
			value: pred,
		});
		return this;
	}

	matchRow(pred: Predicate<Record<string, any>>) {
		this.terms.push({ type: "matchRow", value: pred });
		return this;
	}

	*[Symbol.iterator]() {
		const { table } = this;
		const ctx = new QueryCtx(this);
		for (let term of this.terms) {
			const op = QUERY_OPS[term.type];
			if (!op) unsupportedOp(`query type: ${term.type}`);
			let column: Maybe<IColumn>;
			if (term.column) {
				column = ctx.table.columns[term.column];
				if (!column) illegalArgs(`column: ${term.column}`);
			} else if (QUERY_OPS[term.type].mode !== "row") {
				illegalArgs(
					`query op: ${term.type} requires a column name given`
				);
			}
			op.fn(ctx, term, column);
		}
		if (ctx.bitmap) {
			const n = ctx.size;
			const max = table.length;
			// TODO track min/max indices of set bits in combined mask in active ctx
			for (let i = 0; i < n; i++) {
				let bits = ctx.bitmap[i];
				while (bits) {
					const lsb = bits & -bits;
					const x = (i << 5) + (Math.clz32(lsb) ^ 31);
					if (x >= max) return;
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
			for (let i = 0, n = this.size; i < n; i++)
				this.bitmap![i] &= mask[i];
		} else this.bitmap = mask;
	}

	invertMask(mask: Uint32Array) {
		for (let i = 0, n = this.size; i < n; i++) mask[i] ^= -1;
		return mask;
	}
}

const execBitOr: QueryTermOp = (ctx, term, column) => {
	const bitmap = column!.bitmap!;
	const value = column!.encode(term.value);
	let mask: Maybe<Uint32Array>;
	if (isArray(value)) {
		for (let v of value) {
			const b = bitmap.index.get(v)?.buffer;
			if (!b) continue;
			// compute union bitmaps
			if (mask) {
				for (let i = 0; i < b.length; i++) mask[i] |= b[i];
			} else mask = ctx.makeMask(b);
		}
	} else {
		const b = bitmap.index.get(value)?.buffer;
		if (b) mask = ctx.makeMask(b);
	}
	if (mask) {
		if (term.type === "nor") ctx.invertMask(mask);
		ctx.mergeMask(mask);
	}
};

const execOr: QueryTermOp = (ctx, term, column) => {
	const n = ctx.table.length;
	const encoded = column!.encode(term.value);
	const values = column!.values;
	const pred: Predicate2<any> = column!.isArray
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

const delegateOr: QueryTermOp = (ctx, term, column) => {
	(term.value != null && column!.bitmap ? execBitOr : execOr)(
		ctx,
		term,
		column
	);
};

const execBitAnd: QueryTermOp = (ctx, term, column) => {
	const bitmap = column!.bitmap!;
	const value = column!.encode(term.value);
	let mask: Maybe<Uint32Array>;
	if (isArray(value)) {
		// pre-lookup bitmaps and bail out early
		const colBitmaps: Uint32Array[] = [];
		for (let v of value) {
			const b = bitmap.index.get(v)?.buffer;
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
		const b = bitmap.index.get(value)?.buffer;
		if (b) mask = ctx.makeMask(b);
	}
	if (mask) {
		if (term.type === "nand") ctx.invertMask(mask);
		ctx.mergeMask(mask);
	} else {
		ctx.bitmap = undefined;
	}
};

const execAnd: QueryTermOp = (ctx, term, column) => {
	const n = ctx.table.length;
	const encoded = column!.encode(term.value) ?? null;
	const values = column!.values;
	const pred: Predicate2<any> = column!.isArray
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

const delegateAnd: QueryTermOp = (ctx, term, column) => {
	(term.value != null && column!.bitmap ? execBitAnd : execAnd)(
		ctx,
		term,
		column
	);
};

/** @internal */
const QUERY_OPS: Record<string, QueryTermOpSpec> = {
	or: { fn: delegateOr },
	nor: { fn: delegateOr },
	and: { fn: delegateAnd },
	nand: { fn: delegateAnd },

	matchCol: {
		fn: (ctx, term, column) => {
			const values = column!.values;
			const pred: Predicate<any> = term.value;
			let mask: Maybe<Uint32Array>;
			for (let i = 0, n = ctx.table.length; i < n; i++) {
				if (pred(column!.decode(values[i]))) {
					if (!mask) mask = ctx.makeMask();
					mask[i >>> 5] |= 1 << (i & 31);
				}
			}
			if (mask) ctx.mergeMask(mask);
		},
	},

	matchPartialRow: {
		mode: "row",
		fn: (ctx, term) => {
			const table = ctx.table;
			const columns = term.params!;
			const pred: Predicate<Record<string, any>> = term.value;
			let mask: Maybe<Uint32Array>;
			for (let i = 0, n = ctx.table.length; i < n; i++) {
				if (pred(table.getPartialRow(i, columns, false)!)) {
					if (!mask) mask = ctx.makeMask();
					mask[i >>> 5] |= 1 << (i & 31);
				}
			}
			if (mask) ctx.mergeMask(mask);
		},
	},

	matchRow: {
		mode: "row",
		fn: (ctx, term) => {
			const table = ctx.table;
			const pred: Predicate<Record<string, any>> = term.value;
			let mask: Maybe<Uint32Array>;
			for (let i = 0, n = ctx.table.length; i < n; i++) {
				if (pred(table.getRow(i, false)!)) {
					if (!mask) mask = ctx.makeMask();
					mask[i >>> 5] |= 1 << (i & 31);
				}
			}
			if (mask) ctx.mergeMask(mask);
		},
	},
};

export const registerQueryOp = (id: string, spec: QueryTermOpSpec) => {
	if (QUERY_OPS[id]) illegalArgs(`query op ${id} already registered`);
	QUERY_OPS[id] = spec;
};
