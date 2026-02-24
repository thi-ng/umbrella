// SPDX-License-Identifier: Apache-2.0
import type { Maybe } from "@thi.ng/api";
import { isArray } from "@thi.ng/checks/is-array";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import {
	FLAG_BITMAP,
	FLAG_DICT,
	FLAG_RLE,
	FLAG_UNIQUE,
	type ColumnID,
	type ColumnSchema,
	type ColumnSpec,
	type ColumnTypeSpec,
	type IColumn,
	type QueryTerm,
	type Row,
	type RowWithMeta,
	type SerializedTable,
} from "./api.js";
import { DictTupleColumn } from "./columns/dict-tuple.js";
import { DictColumn } from "./columns/dict.js";
import { PlainColumn } from "./columns/plain.js";
import { TupleColumn } from "./columns/tuple.js";
import { TypedArrayColumn } from "./columns/typedarray.js";
import { VectorColumn } from "./columns/vector.js";
import { __columnError } from "./internal/checks.js";
import { Query } from "./query.js";

/**
 * Placeholder only. Unused so far.
 */
export interface TableOpts {}

export class Table<T extends Row> {
	opts: TableOpts;
	schema = <ColumnSchema<T>>{};
	columns = <Record<ColumnID<T>, IColumn>>{};

	length = 0;

	static load<T extends Row>(
		serialized: SerializedTable<T>,
		opts?: Partial<TableOpts>
	) {
		const table = new Table<T>(serialized.schema, opts);
		table.length = serialized.length;
		for (let id in table.columns) {
			table.columns[id].load(serialized.columns[id]);
		}
		return table;
	}

	constructor(
		schema: Record<
			ColumnID<T>,
			Partial<ColumnSpec> & { type: ColumnSpec["type"] }
		>,
		opts?: Partial<TableOpts>
	) {
		this.opts = { ...opts };
		for (let id in schema) this.addColumn(<ColumnID<T>>id, schema[id]);
	}

	query(terms?: QueryTerm<T>[]) {
		return new Query<T>(this, terms);
	}

	addColumn(
		id: ColumnID<T>,
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
		this.columns[id] = COLUMN_TYPES[spec.type].impl(
			this,
			String(id),
			$spec
		);
	}

	removeColumn(id: ColumnID<T>) {
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

	addRow(row: Partial<T>) {
		this.validateRow(row);
		const { columns, length: rowID } = this;
		for (let id in columns) {
			columns[id].setRow(rowID, row[id]);
		}
		this.length++;
	}

	addRows(rows: Iterable<Partial<T>>) {
		for (let row of rows) this.addRow(row);
	}

	updateRow(i: number, row: T) {
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

	getRow(i: number, safe?: boolean): Maybe<T>;
	getRow(i: number, safe?: boolean, includeID?: false): Maybe<T>;
	getRow(i: number, safe?: boolean, includeID?: true): Maybe<RowWithMeta<T>>;
	getRow(i: number, safe = true, includeID = false) {
		if (safe && (i < 0 || i >= this.length)) return;
		const row: Row = includeID ? { __row: i } : {};
		for (let id in this.columns) {
			row[id] = this.columns[id].getRow(i);
		}
		return row;
	}

	getPartialRow<K extends ColumnID<T>>(
		i: number,
		columns: K[],
		safe?: boolean
	): Maybe<Pick<T, K>>;
	getPartialRow<K extends ColumnID<T>>(
		i: number,
		columns: K[],
		safe?: boolean,
		includeID?: false
	): Maybe<Pick<T, K>>;
	getPartialRow<K extends ColumnID<T>>(
		i: number,
		columns: K[],
		safe?: boolean,
		includeID?: true
	): Maybe<RowWithMeta<Pick<T, K>>>;
	getPartialRow<K extends ColumnID<T>>(
		i: number,
		columns: K[],
		safe = true,
		includeID = false
	) {
		if (safe && (i < 0 || i >= this.length)) return;
		const row: Row = includeID ? { __row: i } : {};
		for (let id of columns) {
			row[<string>id] = this.columns[id]?.getRow(i);
		}
		return row;
	}

	indexOf(id: ColumnID<T>, value: any, start?: number, end?: number) {
		return this.columns[id]?.indexOf(value, start, end) ?? -1;
	}

	validateRow(row: Partial<T>) {
		const { columns } = this;
		for (let id in columns) {
			if (!columns[id].validate(row[id]))
				__columnError(id, `invalid value`);
		}
	}

	validateColumnSpec(id: ColumnID<T>, spec: ColumnSpec) {
		const def = COLUMN_TYPES[spec.type];
		if (!def) __columnError(id, `unknown type: ${spec.type}`);
		if (spec.flags & ~(def.flags ?? 0))
			__columnError(
				id,
				`unsupported flags for column type: ${spec.type}`
			);
		const [min, max] = spec.cardinality;
		if (
			max < min ||
			min < def.cardinality[0] ||
			max > def.cardinality[1] ||
			max < 1
		)
			__columnError(id, `wrong cardinality: ${spec.cardinality}`);
		if (def.required && min === 0 && spec.default == null)
			__columnError(id, `missing default value`);
		if (spec.default != null) {
			if (max > 1 !== isArray(spec.default))
				__columnError(id, `wrong default value`);
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
const $untyped: ColumnTypeSpec = {
	impl: (table, id, { flags, cardinality: [_, max] }) => {
		const isDict = flags & FLAG_DICT;
		if (flags & FLAG_RLE && max > 1) __columnError(id, `RLE not supported`);
		return max > 1
			? new (isDict ? DictTupleColumn : TupleColumn)(id, table)
			: new (isDict ? DictColumn : PlainColumn)(id, table);
	},
	flags: FLAG_BITMAP | FLAG_DICT | FLAG_UNIQUE | FLAG_RLE,
	cardinality: [0, -1 >>> 0],
};

const $vec: ColumnTypeSpec = {
	impl: (table, id, { cardinality: [min, max] }) => {
		if (min > 0 && min !== max)
			__columnError(id, `only fixed size vectors supported`);
		return new VectorColumn(id, table);
	},
	flags: FLAG_BITMAP | FLAG_RLE,
	cardinality: [0, -1 >>> 0],
	required: true,
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
	f32: $typed,
	f64: $typed,
	num: $untyped,
	str: $untyped,
	u8vec: $vec,
	u16vec: $vec,
	u32vec: $vec,
	i8vec: $vec,
	i16vec: $vec,
	i32vec: $vec,
	f32vec: $vec,
	f64vec: $vec,
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
