// SPDX-License-Identifier: Apache-2.0
import type {
	FloatType,
	Fn3,
	IntType,
	Maybe,
	Predicate,
	UintType,
} from "@thi.ng/api";
import type { BitmapIndex } from "./bitmap.js";
import type { QueryCtx } from "./query.js";
import type { Table } from "./table.js";

export type ColumnID<T extends Row> = Exclude<keyof T, number | symbol>;

export type ColumnSchema<T extends Row> = Record<ColumnID<T>, ColumnSpec>;

export type NumericType = IntType | UintType | FloatType;

export type VectorType = `${NumericType}vec`;

export type Cardinality = [number, number];

export interface ColumnSpec {
	/**
	 * Column type ID (see readme for overview)
	 */
	type: NumericType | VectorType | "num" | "str" | string;
	/**
	 * `[min,max]` number of allowed values per row. The following cardinality
	 * presets are available in general (but not for all column types, see
	 * readme for overview):
	 *
	 * - {@link REQUIRED}: [1,1] (default) — value is required
	 * - {@link OPTIONAL}: [0,1] — value is optional
	 * - {@link ZERO_PLUS}: [0, (2**32)-1] — zero or more values
	 * - {@link ONE_PLUS}: [1, (2**32)-1] — one or more values
	 *
	 * Note: Some column types always require a value. So when using
	 * {@link OPTIONAL}, you might also need to provide a
	 * {@link ColumnSpec.default} value.
	 */
	cardinality: Cardinality;
	/**
	 * Bit mask to control column behavior/encoding. The lowest 16 bits are
	 * reserved for built-in column types and internal use. The upper 16 bits
	 * are freely usable for custom purposes.
	 *
	 * @remarks
	 * The following built-in flags are available in general (but not for all
	 * column types, see readme for overview):
	 *
	 * - {@link FLAG_BITMAP}: Enable bitmap indexing
	 * - {@link FLAG_DICT}: Enable dictionary encoding of values
	 * - {@link FLAG_UNIQUE}: Enable Set-semantics, i.e. unique values per tuple
	 * - {@link FLAG_RLE}: Enable run-length encoding in serialization
	 */
	flags: number;
	/**
	 * Default value
	 */
	default?: any;
	/**
	 * Columntype specific options (e.g. for serialization)
	 */
	opts?: Record<string, any>;
}

export interface ColumnTypeSpec {
	/**
	 * Factory function to instantiate a colum type for given table, column name
	 * & spec.
	 */
	impl: Fn3<Table<any>, string, ColumnSpec, IColumn>;
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

/** @internal */
export const LIMITS: Record<NumericType, [number, number]> = {
	u8: [0, 0xff],
	u8c: [0, 0xff],
	u16: [0, 0xffff],
	u32: [0, 0xffff_ffff],
	i8: [-0x80, 0x7f],
	i16: [-0x8000, 0x7fff],
	i32: [-0x8000_0000, 0x7fff_ffff],
	f32: [-Infinity, Infinity],
	f64: [-Infinity, Infinity],
};

export interface IColumn {
	bitmap?: BitmapIndex;

	readonly isArray: boolean;

	load(spec: SerializedColumn): void;

	reindex(): void;

	validate(value: any): boolean;

	/**
	 * Searches for `value` in the column data, optionally constrained to given
	 * `start`/`end` range (end index is exclusive and defaults to current table
	 * length). If found, returns row ID of first occurrence, otherwise -1.
	 *
	 * @param value
	 * @param start
	 * @param end
	 */
	indexOf(value: any, start?: number, end?: number): number;

	/**
	 * Searches for `value` in the column data in reverse order (from the last
	 * row), optionally constrained to given `start`/`end` range (end index is
	 * exclusive and defaults to current table length). If found, returns row ID
	 * of first occurrence, otherwise -1.
	 *
	 * @param value
	 * @param start
	 * @param end
	 */
	lastIndexOf(value: any, start?: number, end?: number): number;

	/**
	 * Similar to {@link IColumn.indexOf}, but applies given predicate function
	 * to each row value. Returns index of first row for which the predicate is
	 * truthy, otherwise returns -1.
	 *
	 * @param pred
	 * @param start
	 * @param end
	 */
	findIndex(pred: Predicate<any>, start?: number, end?: number): number;

	/**
	 * Similar to {@link IColumn.lastIndexOf}, but applies given predicate
	 * function to each row value. Returns index of first row for which the
	 * predicate is truthy, otherwise returns -1.
	 *
	 * @param pred
	 * @param start
	 * @param end
	 */
	findLastIndex(pred: Predicate<any>, start?: number, end?: number): number;

	/**
	 * Returns value at given row.
	 *
	 * @param i
	 */
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

	getRowKey(i: number): any;

	valueKey(value: any): any;
}

export interface SerializedTable<T extends Row> {
	schema: ColumnSchema<T>;
	columns: Record<ColumnID<T>, SerializedColumn>;
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
export type RowWithMeta<T extends Row> = T & { __row: number };

export interface QueryTerm<T extends Row> {
	type: string;
	column?: ColumnID<T>;
	value: any;
	params?: any;
}

export type QueryTermOp = Fn3<
	QueryCtx<any>,
	QueryTerm<any>,
	Maybe<IColumn>,
	void
>;

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
