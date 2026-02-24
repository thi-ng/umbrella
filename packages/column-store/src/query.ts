// SPDX-License-Identifier: Apache-2.0
import type { Maybe, Predicate, Predicate2 } from "@thi.ng/api";
import { isArray } from "@thi.ng/checks/is-array";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { unsupportedOp } from "@thi.ng/errors/unsupported";
import type {
	ColumnID,
	IColumn,
	QueryTerm,
	QueryTermOp,
	QueryTermOpSpec,
	Row,
} from "./api.js";
import { Bitfield } from "./bitmap.js";
import type { Table } from "./table.js";

// TODO add options:
// - paging / range queries only applied to certain row range
// - track min/max indices of set bits in combined mask in active ctx

export class Query<T extends Row> {
	terms: QueryTerm<T>[] = [];

	constructor(public readonly table: Table<T>, terms: QueryTerm<T>[] = []) {
		for (let term of terms) this.addTerm(term);
	}

	addTerm(term: QueryTerm<T>) {
		if (!QUERY_OPS[term.type]) unsupportedOp(`query type: ${term.type}`);
		this.terms.push(term);
		return this;
	}

	/** Alias for {@link Query.or} */
	where = (column: ColumnID<T>, value: any) => this.or(column, value);

	/** Alias for {@link Query.nor} */
	whereNot = (column: ColumnID<T>, value: any) => this.nor(column, value);

	or(column: ColumnID<T>, value: any) {
		this.terms.push({ type: "or", column, value });
		return this;
	}

	nor(column: ColumnID<T>, value: any) {
		this.terms.push({ type: "nor", column, value });
		return this;
	}

	and(column: ColumnID<T>, value: any) {
		this.terms.push({ type: "and", column, value });
		return this;
	}

	nand(column: ColumnID<T>, value: any) {
		this.terms.push({ type: "nand", column, value });
		return this;
	}

	matchColumn(column: ColumnID<T>, pred: Predicate<any>) {
		this.terms.push({ type: "matchCol", column, value: pred });
		return this;
	}

	matchPartialRow<K extends ColumnID<T>>(
		columns: K[],
		pred: Predicate<Pick<T, K>>
	) {
		this.terms.push({
			type: "matchPartialRow",
			params: columns,
			value: pred,
		});
		return this;
	}

	matchRow(pred: Predicate<T>) {
		this.terms.push({ type: "matchRow", value: pred });
		return this;
	}

	*[Symbol.iterator]() {
		const { table } = this;
		const ctx = new QueryCtx(this);
		for (let term of this.terms) {
			const op = QUERY_OPS[term.type];
			let column: Maybe<IColumn>;
			if (term.column) {
				column = ctx.table.columns[term.column];
				if (!column) illegalArgs(`column: ${String(term.column)}`);
			} else if (QUERY_OPS[term.type].mode !== "row") {
				illegalArgs(
					`query op: ${term.type} requires a column name given`
				);
			}
			op.fn(ctx, term, column);
		}
		if (ctx.bitmap) {
			for (let i of new Bitfield(ctx.bitmap).ones(table.length))
				yield table.getRow(i, false, true)!;
		}
	}
}

export class QueryCtx<T extends Row> {
	readonly table: Table<T>;
	readonly size: number;
	bitmap?: Uint32Array;

	constructor(public readonly query: Query<T>) {
		this.table = query.table;
		this.size = Math.ceil(this.table.length / 32);
	}

	makeMask(seed?: Uint32Array) {
		const mask = new Uint32Array(this.size);
		if (seed) mask.set(seed);
		return mask;
	}

	/**
	 * Combines the `mask` with the context's mask (combined using bitwise AND).
	 * If the context mask is still undefined, assigns `mask` as the initial
	 * context mask.
	 *
	 * @param mask
	 */
	mergeMask(mask: Uint32Array) {
		if (this.bitmap) {
			for (let i = 0, n = this.size; i < n; i++)
				this.bitmap![i] &= mask[i];
		} else this.bitmap = mask;
	}

	/**
	 * Combines the bitwise inverted `mask` with the context's mask (combined
	 * using bitwise AND). If the context mask is still undefined, first inverts
	 * `mask` in place and uses result as the initial context mask.
	 *
	 * @param mask
	 */
	mergeInvMask(mask: Uint32Array) {
		if (this.bitmap) {
			for (let i = 0, n = this.size; i < n; i++)
				this.bitmap![i] &= mask[i] ^ -1;
		} else this.bitmap = this.invertMask(mask);
	}

	/**
	 * Bitwise inverts `mask` in place and then returns it.
	 *
	 * @param mask
	 */
	invertMask(mask: Uint32Array) {
		for (let i = 0, n = this.size; i < n; i++) mask[i] ^= -1;
		return mask;
	}
}

const execBitOr: QueryTermOp = (ctx, term, column) => {
	const bitmap = column!.bitmap!;
	const key = column!.valueKey(term.value);
	let mask: Maybe<Uint32Array>;
	if (isArray(key)) {
		for (let k of key) {
			const b = bitmap.index.get(k)?.buffer;
			if (!b) continue;
			// compute union bitmaps
			if (mask) {
				for (let i = 0; i < b.length; i++) mask[i] |= b[i];
			} else mask = ctx.makeMask(b);
		}
	} else {
		const b = bitmap.index.get(key)?.buffer;
		if (b) mask = ctx.makeMask(b);
	}
	if (mask) {
		term.type === "nor" ? ctx.mergeInvMask(mask) : ctx.mergeMask(mask);
	}
};

const execOr: QueryTermOp = (ctx, term, column) => {
	const n = ctx.table.length;
	const key = column!.valueKey(term.value);
	const pred: Predicate2<any> = column!.isArray
		? (row: any[], k) => row.includes(k)
		: (row, k) => row === k;
	let mask: Maybe<Uint32Array>;
	for (let k of isArray(key) ? key : [key]) {
		for (let i = 0; i < n; i++) {
			if (pred(column!.getRowKey(i), k)) {
				if (!mask) mask = ctx.makeMask();
				mask[i >>> 5] |= 1 << (i & 31);
			}
		}
	}
	if (mask) {
		term.type === "nor" ? ctx.mergeInvMask(mask) : ctx.mergeMask(mask);
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
	const key = column!.valueKey(term.value);
	let mask: Maybe<Uint32Array>;
	if (isArray(key)) {
		// pre-lookup bitmaps and bail out early
		const colBitmaps: Uint32Array[] = [];
		for (let k of key) {
			const b = bitmap.index.get(k)?.buffer;
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
		const b = bitmap.index.get(key)?.buffer;
		if (b) mask = ctx.makeMask(b);
	}
	if (mask) {
		term.type === "nand" ? ctx.mergeInvMask(mask) : ctx.mergeMask(mask);
	} else {
		ctx.bitmap = undefined;
	}
};

const execAnd: QueryTermOp = (ctx, term, column) => {
	const n = ctx.table.length;
	const key = column!.valueKey(term.value) ?? null;
	const pred: Predicate2<any> = column!.isArray
		? (row: any[], v) => row.includes(v)
		: (row, v) => row === v;
	let mask: Maybe<Uint32Array>;
	for (let k of isArray(key) ? key : [key]) {
		let m: Maybe<Uint32Array>;
		for (let i = 0; i < n; i++) {
			if (pred(column!.getRowKey(i), k)) {
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
		term.type === "nand" ? ctx.mergeInvMask(mask) : ctx.mergeMask(mask);
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
			const pred: Predicate<any> = term.value;
			let mask: Maybe<Uint32Array>;
			for (let i = 0, n = ctx.table.length; i < n; i++) {
				if (pred(column!.getRow(i))) {
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
			for (let i = 0, n = table.length; i < n; i++) {
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
			for (let i = 0, n = table.length; i < n; i++) {
				if (pred(table.getRow(i, false)!)) {
					if (!mask) mask = ctx.makeMask();
					mask[i >>> 5] |= 1 << (i & 31);
				}
			}
			if (mask) ctx.mergeMask(mask);
		},
	},
};

/**
 * Registers a custom query term operator for given `type` and later use with
 * {@link Query}. Throws an error if `type` is already registered.
 *
 * @remarks
 * See {@link QueryTerm} & {@link QueryTermOp} for further details.
 *
 * @param type
 * @param spec
 */
export const registerQueryOp = (type: string, spec: QueryTermOpSpec) => {
	if (QUERY_OPS[type]) illegalArgs(`query op ${type} already registered`);
	QUERY_OPS[type] = spec;
};
