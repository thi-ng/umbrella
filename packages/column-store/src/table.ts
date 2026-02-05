import { type Maybe } from "@thi.ng/api";
import { isArray } from "@thi.ng/checks/is-array";
import { isNumber } from "@thi.ng/checks/is-number";
import { isString } from "@thi.ng/checks/is-string";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import {
	FLAG_BITMAP,
	FLAG_INDEXED,
	type ColumnSchema,
	type ColumnSpec,
	type IColumn,
	type Row,
	type SerializedTable,
} from "./api.js";
import { ArrayColumn } from "./columns/array.js";
import { EncodedArrayColumn } from "./columns/encoded-array.js";
import { EncodedColumn } from "./columns/encoded.js";
import { PlainColumn } from "./columns/plain.js";
import { TypedArrayColumn } from "./columns/typedarray.js";

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

export class Table {
	schema: ColumnSchema = {};
	columns: Record<string, IColumn> = {};

	protected _length = 0;

	static load(serialized: SerializedTable) {
		const table = new Table(serialized.schema);
		table._length = serialized.length;
		for (let id in table.columns) {
			table.columns[id].load(serialized.columns[id]);
		}
		return table;
	}

	constructor(
		schema: Record<
			string,
			Partial<ColumnSpec> & { type: ColumnSpec["type"] }
		>
	) {
		for (let id in schema) {
			this.addColumn(id, schema[id]);
		}
	}

	get length() {
		return this._length;
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

		let column: Maybe<IColumn>;
		if (NUMERIC_TYPES.has($spec.type)) {
			if ($spec.flags & ~FLAG_BITMAP)
				illegalArgs(`unsupported flags for column type: ${$spec.type}`);
			if (min < 1 || max > 1)
				illegalArgs(`typedarray columns must have cardinality [1,1]`);
			column = new TypedArrayColumn(id, this);
		} else if (max > 1) {
			column =
				$spec.flags & FLAG_INDEXED
					? new EncodedArrayColumn(id, this)
					: new ArrayColumn(id, this);
		} else {
			column =
				$spec.flags & FLAG_INDEXED
					? new EncodedColumn(id, this)
					: new PlainColumn(id, this);
		}
		this.columns[id] = column;
	}

	*[Symbol.iterator]() {
		for (let i = 0; i < this._length; i++) yield this.getRow(i);
	}

	reindex() {
		for (let id in this.columns) this.columns[id].reindex();
	}

	addRow(row: Row) {
		this.validateRow(row);
		const rowID = this._length;
		for (let id in this.columns) {
			this.columns[id].setRow(rowID, row[id] ?? this.schema[id].default);
		}
		this._length++;
	}

	updateRow(i: number, row: Row) {
		if (i < 0 || i >= this._length) illegalArgs(`row ID: ${i}`);
		this.validateRow(row);
		for (let id in this.columns) {
			this.columns[id].setRow(i, row[id] ?? this.schema[id].default);
		}
	}

	removeRow(i: number) {
		if (i < 0 || i >= this._length) illegalArgs(`invalid row ID: ${i}`);
		for (let id in this.columns) {
			this.columns[id].removeRow(i);
		}
		this._length--;
	}

	getRow(i: number, safe = true) {
		if (safe && (i < 0 || i >= this._length)) return;
		const row: Row = {};
		for (let id in this.columns) {
			row[id] = this.columns[id].getRow(i);
		}
		return row;
	}

	getPartialRow(i: number, columns: string[], safe = true) {
		if (safe && (i < 0 || i >= this._length)) return;
		const row: Row = {};
		for (let id of columns) {
			row[id] = this.columns[id]?.getRow(i);
		}
		return row;
	}

	validateRow(row: Row) {
		for (let id in this.schema) {
			const spec = this.schema[id];
			const [min, max] = spec.cardinality;
			const value = row[id];
			if (value == null) {
				if (min === 0) continue;
				illegalArgs(`missing value for column: ${id}`);
			}
			if (min >= 0 && max > 1) {
				if (!isArray(value))
					illegalArgs(`expected array for column: ${id}`);
				if (value.length < min)
					illegalArgs(
						`too few values for column: ${id} (got ${value.length}, but expected at least ${min})`
					);
				if (value.length > max)
					illegalArgs(
						`too many values for column: ${id} (got ${value.length}, but max. allowed ${max})`
					);
				if (spec.type === "num" && !value.every(isNumber))
					illegalArgs(`expected number array for column: ${id}`);
				if (spec.type === "str" && !value.every(isString))
					illegalArgs(`expected string array for column: ${id}`);
			} else {
				if (
					(spec.type === "num" || NUMERIC_TYPES.has(spec.type)) &&
					!isNumber(value)
				)
					illegalArgs(`expected number for column: ${id}`);
				if (spec.type === "str" && !isString(value))
					illegalArgs(`expected string for column: ${id}`);
			}
		}
	}
}

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
