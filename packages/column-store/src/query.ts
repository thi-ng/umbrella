import type { Maybe } from "@thi.ng/api";
import { isArray } from "@thi.ng/checks/is-array";
import { defmulti } from "@thi.ng/defmulti/defmulti";
import type { Table } from "./table.js";

export interface QueryTerm {
	type: string;
	col: string;
	value: any;
}

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
	readonly size: number;
	bitmap?: Uint32Array;
	count = 0;

	constructor(public readonly query: Query) {
		this.size = Math.ceil(query.table.length / 32);
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

export const execQueryTerm = defmulti<QueryCtx, QueryTerm, void>(
	(_, term) => term.type,
	{
		nor: "or",
		nand: "and",
	},
	{
		or: (ctx, term) => {
			const column = ctx.query.table.columns[term.col];
			if (!column.bitmap) return;
			ctx.count++;
			let mask: Maybe<Uint32Array>;
			if (isArray(term.value)) {
				for (let v of column.encode(term.value)) {
					const b = column.bitmap.index.get(v);
					if (!b) continue;
					// compute union bitmaps
					if (mask) {
						for (let i = 0; i < b.length; i++) mask[i] |= b[i];
					} else mask = ctx.makeMask(b);
				}
			} else {
				const b = column.bitmap.index.get(column.encode(term.value));
				if (b) mask = ctx.makeMask(b);
			}
			if (mask) {
				if (term.type === "nor") ctx.invertMask(mask);
				ctx.mergeMask(mask);
			}
		},

		and: (ctx, term) => {
			const column = ctx.query.table.columns[term.col];
			if (!column.bitmap) return;
			ctx.count++;
			let mask: Maybe<Uint32Array>;
			if (isArray(term.value)) {
				// pre-lookup bitmaps and bail out early
				const colBitmaps: Uint32Array[] = [];
				for (let v of column.encode(term.value)) {
					const b = column.bitmap.index.get(v);
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
				const b = column.bitmap.index.get(column.encode(term.value));
				if (b) mask = ctx.makeMask(b);
			}
			if (mask) {
				if (term.type === "nand") ctx.invertMask(mask);
				ctx.mergeMask(mask);
			} else {
				ctx.bitmap = undefined;
			}
		},
	}
);
