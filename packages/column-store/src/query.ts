// SPDX-License-Identifier: Apache-2.0
import type { Comparator, Maybe, Predicate, Predicate2 } from "@thi.ng/api";
import { isArray } from "@thi.ng/checks/is-array";
import { isFunction } from "@thi.ng/checks/is-function";
import { isNumber } from "@thi.ng/checks/is-number";
import { isString } from "@thi.ng/checks/is-string";
import { compare } from "@thi.ng/compare/compare";
import { composeComparators } from "@thi.ng/compare/compose";
import { compareByKey } from "@thi.ng/compare/keys";
import { reverse } from "@thi.ng/compare/reverse";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { unsupportedOp } from "@thi.ng/errors/unsupported";
import type {
	ColumnID,
	IColumn,
	QueryTerm,
	QueryTermOp,
	QueryTermOpSpec,
	Row,
	RowWithMeta,
} from "./api.js";
import { Bitfield } from "./bitmap.js";
import { __columnError } from "./internal/checks.js";
import { __clampRange } from "./internal/indexof.js";
import type { Table } from "./table.js";

// TODO add options:
// - paging / range queries only applied to certain row range
// - track min/max indices of set bits in combined mask in active ctx

export class Query<T extends Row> {
	terms: QueryTerm<T>[] = [];

	protected _cmp?: Comparator<any>;
	protected _limit = Infinity;
	protected _offset = 0;

	constructor(
		public readonly table: Table<T>,
		terms?: Iterable<QueryTerm<T>>
	) {
		if (terms) this.addTerms(terms);
	}

	addTerm(term: QueryTerm<T>) {
		if (!QUERY_OPS[term.type]) unsupportedOp(`query type: ${term.type}`);
		this.terms.push(term);
		return this;
	}

	addTerms(terms: Iterable<QueryTerm<T>>) {
		for (const term of terms) this.addTerm(term);
	}

	limit(limit: number, offset = 0) {
		this._limit = limit;
		this._offset = offset;
		return this;
	}

	/**
	 * Constructs a comparator for query results based on given sort criteria,
	 * which are applied in given order. Each criteria can be on of:
	 *
	 * - comparator (applied to full rows)
	 * - columnID
	 * - tuple of `[columnID, boolean]` (if boolean is true, sorts in ascending order)
	 * - tuple of `[columnID, comparator]`
	 *
	 * @param order
	 */
	sortBy(
		...order: (
			| ColumnID<T>
			| Comparator<T>
			| [ColumnID<T>, boolean | Comparator<any>]
		)[]
	) {
		const fns = order.map(
			(x): Comparator<any> =>
				isFunction(x)
					? x
					: isString(x)
						? compareByKey(x)
						: compareByKey<any, any>(
								x[0],
								isFunction(x[1])
									? x[1]
									: x[1]
										? compare
										: reverse(compare)
							)
		);
		this._cmp = composeComparators(...(<[Comparator<any>]>fns));
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

	valueRange(column: ColumnID<T>, start: any, end?: any) {
		if (this.table.columns[column].isArray)
			__columnError(
				column,
				`operator not supported with this column type`
			);
		this.terms.push({ type: "valueRange", column, value: { start, end } });
		return this;
	}

	rowRange(start = 0, end?: number) {
		this.terms.push({ type: "rowRange", value: { start, end } });
		return this;
	}

	*[Symbol.iterator]() {
		const { table, _limit, _offset } = this;
		const ctx = new QueryCtx(this);
		for (const term of this.terms) {
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
			if (!op.fn(ctx, term, column)) return;
		}
		if (!ctx.bitmap) return;
		if (this._cmp) {
			const rows: RowWithMeta<T>[] = [];
			for (const i of ctx) {
				rows.push(table.getRow(i, false, true)!);
			}
			rows.sort(this._cmp);
			for (
				let i = this._offset, n = Math.min(rows.length, i + _limit);
				i < n;
				i++
			) {
				yield rows[i];
			}
			return;
		}
		// iterate in normal row order
		let j = 0;
		const n = _offset + _limit;
		for (const i of ctx) {
			if (j >= _offset) {
				if (j >= n) return;
				yield table.getRow(i, false, true)!;
			}
			j++;
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

	/**
	 * If a bitmap is already present, yield iterator of only currently selected
	 * row IDs, otherwise yields row IDs in `[0,table.length)` range.
	 */
	*[Symbol.iterator]() {
		const n = this.table.length;
		if (this.bitmap) {
			yield* new Bitfield(this.bitmap).ones(n);
		} else {
			for (let i = 0; i < n; i++) yield i;
		}
	}

	clear() {
		this.bitmap = undefined;
	}

	makeMask(seed?: number | Uint32Array) {
		const mask = new Uint32Array(this.size);
		if (seed) {
			isNumber(seed) ? mask.fill(seed) : mask.set(seed);
		}
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
		for (const k of key) {
			const b = bitmap.index.get(k)?.buffer;
			if (!b) continue;
			// compute union bitmaps
			if (mask) {
				for (let i = 0, n = b.length; i < n; i++) mask[i] |= b[i];
			} else mask = ctx.makeMask(b);
		}
	} else {
		const b = bitmap.index.get(key)?.buffer;
		if (b) mask = ctx.makeMask(b);
	}
	return __finalizeMask(ctx, mask, term.type === "nor");
};

const execOr: QueryTermOp = (ctx, term, column) => {
	const key = column!.valueKey(term.value);
	const pred: Predicate2<any> = column!.isArray
		? (row: any[], k) => row.includes(k)
		: (row, k) => row === k;
	let mask: Maybe<Uint32Array>;
	for (const k of isArray(key) ? key : [key]) {
		for (const i of ctx) {
			if (pred(column!.getRowKey(i), k)) {
				if (!mask) mask = ctx.makeMask();
				mask[i >>> 5] |= 1 << (i & 31);
			}
		}
	}
	return __finalizeMask(ctx, mask, term.type === "nor");
};

const delegateOr: QueryTermOp = (ctx, term, column) =>
	(term.value != null && column!.bitmap ? execBitOr : execOr)(
		ctx,
		term,
		column
	);

const execBitAnd: QueryTermOp = (ctx, term, column) => {
	const bitmap = column!.bitmap!;
	const key = column!.valueKey(term.value);
	const isNeg = term.type === "nand";
	let mask: Maybe<Uint32Array>;
	if (isArray(key)) {
		for (const k of key) {
			const b = bitmap.index.get(k)?.buffer;
			if (!b) {
				if (isNeg) {
					if (mask) mask.fill(0);
					else mask = ctx.makeMask();
					continue;
				} else return false;
			}
			// compute bitmap intersection
			if (mask) {
				const n = b.length;
				for (let i = 0; i < n; i++) mask[i] &= b[i];
				mask.fill(0, n);
			} else mask = ctx.makeMask(b);
		}
	} else {
		const b = bitmap.index.get(key)?.buffer;
		if (b) mask = ctx.makeMask(b);
	}
	return __finalizeMask(ctx, mask, isNeg);
};

const execAnd: QueryTermOp = (ctx, term, column) => {
	const n = ctx.table.length;
	const key = column!.valueKey(term.value) ?? null;
	const pred: Predicate2<any> = column!.isArray
		? (row: any[], v) => row.includes(v)
		: (row, v) => row === v;
	const isNeg = term.type === "nand";
	let mask: Maybe<Uint32Array>;
	for (const k of isArray(key) ? key : [key]) {
		let m: Maybe<Uint32Array>;
		for (const i of ctx) {
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
			if (isNeg) {
				if (mask) mask.fill(0);
				else mask = ctx.makeMask();
			} else return false;
		}
	}
	return __finalizeMask(ctx, mask, isNeg);
};

const delegateAnd: QueryTermOp = (ctx, term, column) =>
	(term.value != null && column!.bitmap ? execBitAnd : execAnd)(
		ctx,
		term,
		column
	);

/** @internal */
const __finalizeMask = (
	ctx: QueryCtx<any>,
	mask: Maybe<Uint32Array>,
	isNeg: boolean
) => {
	if (mask) {
		isNeg ? ctx.mergeInvMask(mask) : ctx.mergeMask(mask);
		return true;
	} else if (isNeg) {
		if (!ctx.bitmap) ctx.bitmap = ctx.makeMask(-1);
		return true;
	}
	return false;
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
			for (const i of ctx) {
				if (pred(column!.getRow(i))) {
					if (!mask) mask = ctx.makeMask();
					mask[i >>> 5] |= 1 << (i & 31);
				}
			}
			if (mask) ctx.mergeMask(mask);
			return !!mask;
		},
	},

	matchPartialRow: {
		mode: "row",
		fn: (ctx, term) => {
			const table = ctx.table;
			const columns = term.params!;
			const pred: Predicate<Record<string, any>> = term.value;
			let mask: Maybe<Uint32Array>;
			for (const i of ctx) {
				if (pred(table.getPartialRow(i, columns, false)!)) {
					if (!mask) mask = ctx.makeMask();
					mask[i >>> 5] |= 1 << (i & 31);
				}
			}
			if (mask) ctx.mergeMask(mask);
			return !!mask;
		},
	},

	matchRow: {
		mode: "row",
		fn: (ctx, term) => {
			const table = ctx.table;
			const pred: Predicate<Record<string, any>> = term.value;
			let mask: Maybe<Uint32Array>;
			for (const i of ctx) {
				if (pred(table.getRow(i, false)!)) {
					if (!mask) mask = ctx.makeMask();
					mask[i >>> 5] |= 1 << (i & 31);
				}
			}
			if (mask) ctx.mergeMask(mask);
			return !!mask;
		},
	},

	valueRange: {
		fn: (ctx, term, column) => {
			const max = ctx.table.length;
			const { start, end } = term.value;
			let $start = 0;
			let $end = max;
			if (start != null) $start = column!.findIndex((x) => x >= start);
			if (end != null)
				$end = column!.findLastIndex((x) => x <= end, $start);
			return __fillMask(ctx, $start, $end >= 0 ? $end + 1 : $end, max);
		},
	},

	rowRange: {
		mode: "row",
		fn: (ctx, term) => {
			const max = ctx.table.length;
			let { start = 0, end = max } = term.value;
			[start, end] = __clampRange(max, start, end);
			return __fillMask(ctx, start, end, max);
		},
	},
};

const __fillMask = (
	ctx: QueryCtx<any>,
	start: number,
	end: number,
	max: number,
	fill: 0 | 1 = 1
) => {
	if (start >= 0 && start < max && end >= 0) {
		const mask = ctx.makeMask();
		const bitmap = new Bitfield(mask);
		bitmap.fill(fill, start, end);
		ctx.mergeMask(mask);
		return true;
	}
	return false;
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
