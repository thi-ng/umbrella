// SPDX-License-Identifier: Apache-2.0
import type {
	FloatType,
	Fn3,
	IntType,
	Maybe,
	TypedArray,
	UintType,
} from "@thi.ng/api";
import type { BitmapIndex } from "./bitmap.js";
import type { QueryCtx } from "./query.js";
import type { Table } from "./table.js";

export type ColumnSchema = Record<string, ColumnSpec>;

export type NumericType = IntType | UintType | FloatType;

export type Cardinality = [number, number];

export interface ColumnSpec {
	type: NumericType | "num" | "str" | string;
	cardinality: Cardinality;
	flags: number;
	default?: any;
}

export interface ColumnTypeSpec {
	/**
	 * Factory function to instantiate a colum type for given table, column name
	 * & spec.
	 */
	impl: Fn3<Table, string, ColumnSpec, IColumn>;
	/**
	 * Bit mask of supported flags (default: 0, i.e. none allowed). During
	 * column validation, the (inverted) mask will be applied to the user
	 * defined flags assigned to a column and will throw an error if the result
	 * is non-zero.
	 */
	flags?: number;
	/**
	 * Supported `[min, max]` number of values per row.
	 */
	cardinality: Cardinality;
	/**
	 * Only used if min cardinality of this column type is zero, and the type
	 * requires at least a (non-null) default value.
	 */
	required?: boolean;
}

export const REQUIRED: Cardinality = [1, 1];
export const OPTIONAL: Cardinality = [0, 1];
export const ONE_PLUS: Cardinality = [1, -1 >>> 0];
export const ZERO_PLUS: Cardinality = [0, -1 >>> 0];

export const FLAG_DICT = 1 << 0;
export const FLAG_BITMAP = 1 << 1;
export const FLAG_UNIQUE = 1 << 2;
export const FLAG_RLE = 1 << 3;

export interface IColumn {
	values: any[] | TypedArray;
	bitmap?: BitmapIndex;

	readonly isArray: boolean;

	load(spec: SerializedColumn): void;

	reindex(): void;

	validate(value: any): boolean;

	getRow(i: number): any;

	/**
	 * Sets the column's value at given row index. Assumes the value has been
	 * pre-validated (via {@link IColumn.validate}). If value is null-ish and
	 * the column has a configured default, it will be replaced with said value,
	 * otherwise an error will be thrown (if the column requires a value, but
	 * has no default).
	 *
	 * @param i
	 * @param value
	 */
	setRow(i: number, value: any): void;

	removeRow(i: number): void;

	encode(value: any): any;

	decode(value: any): any;

	replaceValue(currValue: any, newValue: any): boolean;
}

export interface SerializedTable {
	schema: ColumnSchema;
	columns: Record<string, SerializedColumn>;
	length: number;
}

export interface SerializedColumn {
	dict?: SerializedIndex;
	values: any[];
}

export interface SerializedIndex {
	index: any[];
	next: number;
}

export type Row = Record<string, any>;

export interface QueryTerm {
	type: string;
	column?: string;
	value: any;
	params?: any;
}

export type QueryTermOp = Fn3<QueryCtx, QueryTerm, Maybe<IColumn>, void>;

export interface QueryTermOpSpec {
	/**
	 * Default mode is: "col";
	 */
	mode?: "col" | "row";
	/**
	 * Query op implementation. Unless {@link QueryTermOpSpec.mode} is `row`,
	 * the provided `column` arg is guaranteed to be defined.
	 */
	fn: QueryTermOp;
}
