// SPDX-License-Identifier: Apache-2.0
import type { Fn3 } from "@thi.ng/api";
import { isArray } from "@thi.ng/checks/is-array";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import {
	FLAG_BITMAP,
	FLAG_ENUM,
	type ColumnSchema,
	type ColumnSpec,
	type IColumn,
	type QueryTerm,
	type Row,
	type SerializedTable,
} from "./api.js";
import { ArrayColumn } from "./columns/array.js";
import { EnumArrayColumn } from "./columns/enum-array.js";
import { EnumColumn } from "./columns/enum.js";
import { PlainColumn } from "./columns/plain.js";
import { TypedArrayColumn } from "./columns/typedarray.js";
import { Query } from "./query.js";

/** @internal */
const NUMERIC_TYPES = new Set([
	"u8",
	"u8c",
	"u16",
	"u32",
	"i8",
	"i16",
	"i32",
	"f32",
	"f64",
]);

export interface TableOpts {
	/**
	 * Customizable function to select and instantiate a {@link IColumn}
	 * implementation. Default: {@link defaultColumnFactory}
	 */
	columnFactory: Fn3<Table, string, ColumnSpec, IColumn>;
}

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
		this.opts = {
			columnFactory: defaultColumnFactory,
			...opts,
		};
		for (let id in schema) {
			this.addColumn(id, schema[id]);
		}
	}

	query(terms?: QueryTerm[]) {
		return new Query(this, terms);
	}

	addColumn(
		id: string,
		spec: Partial<ColumnSpec> & { type: ColumnSpec["type"] }
	) {
		const $spec: ColumnSpec = {
			cardinality: [1, 1],
			flags: 0,
			default: __columnDefault(spec),
			...spec,
		};
		const [min, max] = $spec.cardinality;
		if (max < min)
			illegalArgs(`cardinality for column ${id}: ${$spec.cardinality}`);
		if ($spec.default != null) {
			if (max > 1 !== isArray($spec.default))
				illegalArgs(`default value for column: ${id}`);
		}
		this.schema[id] = $spec;
		this.columns[id] = this.opts.columnFactory(this, id, $spec);
	}

	*[Symbol.iterator]() {
		for (let i = 0; i < this.length; i++) yield this.getRow(i);
	}

	reindex() {
		for (let id in this.columns) this.columns[id].reindex();
	}

	addRow(row: Row) {
		this.validateRow(row);
		const rowID = this.length;
		for (let id in this.columns) {
			this.columns[id].setRow(rowID, row[id] ?? this.schema[id].default);
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
			this.columns[id].setRow(i, row[id] ?? this.schema[id].default);
		}
	}

	removeRow(i: number) {
		if (i < 0 || i >= this.length) illegalArgs(`invalid row ID: ${i}`);
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
				illegalArgs(`invalid value for column: ${id}`);
		}
	}
}

/**
 * Default column type factory function to choose and instantiate an
 * {@link IColumn} implementation from built-in column types.
 *
 * @remarks
 * When using custom column types, supply your own factory via
 * {@link TableOpts.columnFactory}, then use custom {@link ColumnSpec.flags} to
 * determine a custom implementation, of if not applicable to this column, then
 * delegate to this function here as fallback.
 *
 * @param table
 * @param id
 * @param spec
 */
export const defaultColumnFactory = (
	table: Table,
	id: string,
	{ type, flags, cardinality: [min, max] }: ColumnSpec
): IColumn => {
	if (NUMERIC_TYPES.has(type)) {
		if (flags & ~FLAG_BITMAP)
			illegalArgs(`unsupported flags for column type: ${type}`);
		if (min < 1 || max > 1)
			illegalArgs(`typedarray columns must have cardinality [1,1]`);
		return new TypedArrayColumn(id, table);
	} else if (max > 1) {
		return flags & FLAG_ENUM
			? new EnumArrayColumn(id, table)
			: new ArrayColumn(id, table);
	}
	return flags & FLAG_ENUM
		? new EnumColumn(id, table)
		: new PlainColumn(id, table);
};

/** @internal */
const __columnDefault = ({
	type,
	cardinality: [min, max] = [1, 1],
}: Partial<ColumnSpec> & { type: ColumnSpec["type"] }) =>
	min === 0
		? null
		: type === "str"
		? max > 1
			? new Array(min).fill("")
			: ""
		: type === "num"
		? max > 1
			? new Array(min).fill(0)
			: 0
		: 0;
