// SPDX-License-Identifier: Apache-2.0
import { isArray } from "@thi.ng/checks/is-array";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import {
	FLAG_BITMAP,
	FLAG_DICT,
	FLAG_RLE,
	FLAG_UNIQUE,
	type ColumnSchema,
	type ColumnSpec,
	type ColumnTypeSpec,
	type IColumn,
	type QueryTerm,
	type Row,
	type SerializedTable,
} from "./api.js";
import { ArrayColumn } from "./columns/array.js";
import { DictArrayColumn } from "./columns/dict-array.js";
import { DictColumn } from "./columns/dict.js";
import { PlainColumn } from "./columns/plain.js";
import { TypedArrayColumn } from "./columns/typedarray.js";
import { __columnError } from "./internal/checks.js";
import { Query } from "./query.js";

/**
 * Placeholder only. Unused so far.
 */
export interface TableOpts {}

export class Table {
	opts: TableOpts;
	schema: ColumnSchema = {};
	columns: Record<string, IColumn> = {};

	length = 0;

	static load(serialized: SerializedTable, opts?: Partial<TableOpts>) {
		const table = new Table(serialized.schema, opts);
		table.length = serialized.length;
		for (let id in table.columns) {
			table.columns[id].load(serialized.columns[id]);
		}
		return table;
	}

	constructor(
		schema: Record<
			string,
			Partial<ColumnSpec> & { type: ColumnSpec["type"] }
		>,
		opts?: Partial<TableOpts>
	) {
		this.opts = { ...opts };
		for (let id in schema) this.addColumn(id, schema[id]);
	}

	query(terms?: QueryTerm[]) {
		return new Query(this, terms);
	}

	addColumn(
		id: string,
		spec: Partial<ColumnSpec> & { type: ColumnSpec["type"] }
	) {
		if (this.columns[id]) __columnError(id, "already exists");
		const $spec: ColumnSpec = {
			cardinality: [1, 1],
			flags: 0,
			...spec,
		};
		this.validateColumnSpec(id, $spec);
		this.schema[id] = $spec;
		this.columns[id] = COLUMN_TYPES[spec.type].impl(this, id, $spec);
	}

	removeColumn(id: string) {
		if (this.columns[id]) return false;
		delete this.columns[id];
		delete this.schema[id];
		return true;
	}

	*[Symbol.iterator]() {
		for (let i = 0; i < this.length; i++) yield this.getRow(i);
	}

	reindex() {
		for (let id in this.columns) this.columns[id].reindex();
	}

	addRow(row: Row) {
		this.validateRow(row);
		const { columns, length: rowID } = this;
		for (let id in columns) {
			columns[id].setRow(rowID, row[id]);
		}
		this.length++;
	}

	addRows(rows: Iterable<Row>) {
		for (let row of rows) this.addRow(row);
	}

	updateRow(i: number, row: Row) {
		if (i < 0 || i >= this.length) illegalArgs(`row ID: ${i}`);
		this.validateRow(row);
		for (let id in this.columns) {
			this.columns[id].setRow(i, row[id]);
		}
	}

	removeRow(i: number) {
		if (i < 0 || i >= this.length) illegalArgs(`row ID: ${i}`);
		for (let id in this.columns) {
			this.columns[id].removeRow(i);
		}
		this.length--;
	}

	getRow(i: number, safe = true) {
		if (safe && (i < 0 || i >= this.length)) return;
		const row: Row = {};
		for (let id in this.columns) {
			row[id] = this.columns[id].getRow(i);
		}
		return row;
	}

	getPartialRow(i: number, columns: string[], safe = true) {
		if (safe && (i < 0 || i >= this.length)) return;
		const row: Row = {};
		for (let id of columns) {
			row[id] = this.columns[id]?.getRow(i);
		}
		return row;
	}

	validateRow(row: Row) {
		const { columns } = this;
		for (let id in columns) {
			if (!columns[id].validate(row[id]))
				__columnError(id, `invalid value`);
		}
	}

	validateColumnSpec(id: string, spec: ColumnSpec) {
		const def = COLUMN_TYPES[spec.type];
		if (!def) __columnError(id, `unknown type: ${spec.type}`);
		if (spec.flags & ~(def.flags ?? 0))
			__columnError(
				id,
				`unsupported flags for column type: ${spec.type}`
			);
		const [min, max] = spec.cardinality;
		if (max < min)
			__columnError(id, `wrong cardinality: ${spec.cardinality}`);
		if (min < def.cardinality[0] || max > def.cardinality[1])
			__columnError(id, `wrong cardimality`);
		if (def.required && min === 0 && spec.default == null)
			__columnError(id, `missing default value`);
		if (spec.default != null) {
			if (max > 1 !== isArray(spec.default))
				__columnError(id, `default value`);
		}
	}

	toJSON() {
		return {
			schema: this.schema,
			columns: this.columns,
			length: this.length,
		};
	}
}

/** @internal */
const $typed: ColumnTypeSpec = {
	impl: (table, id) => new TypedArrayColumn(id, table),
	flags: FLAG_BITMAP | FLAG_RLE,
	cardinality: [0, 1],
	required: true,
};

/** @internal */
const $float: ColumnTypeSpec = { ...$typed, flags: FLAG_BITMAP };

/** @internal */
const $untyped: ColumnTypeSpec = {
	impl: (table, id, { flags, cardinality: [min, max], default: d }) => {
		const isDict = flags & FLAG_DICT;
		if (flags & FLAG_RLE) {
			if (!isDict || max > 1 || (min === 0 && d == null)) {
				__columnError(id, `RLE encoding not supported`);
			}
		}
		return max > 1
			? new (isDict ? DictArrayColumn : ArrayColumn)(id, table)
			: new (isDict ? DictColumn : PlainColumn)(id, table);
	},
	flags: FLAG_BITMAP | FLAG_DICT | FLAG_UNIQUE | FLAG_RLE,
	cardinality: [0, -1 >>> 0],
};

/**
 * Registry of column type definitions and their factory functions. See
 * {@link registerColumnType}.
 */
export const COLUMN_TYPES: Record<string, ColumnTypeSpec> = {
	u8: $typed,
	i8: $typed,
	u16: $typed,
	i16: $typed,
	u32: $typed,
	i32: $typed,
	f32: $float,
	f64: $float,
	num: $untyped,
	str: $untyped,
};

/**
 * Registers a custom column type for given `type` ID. Throws an error if `type`
 * is already registered.
 *
 * @param type
 * @param spec
 */
export const registerColumnType = (type: string, spec: ColumnTypeSpec) => {
	if (COLUMN_TYPES[type])
		illegalArgs(`column type ${type} already registered`);
	COLUMN_TYPES[type] = spec;
};
