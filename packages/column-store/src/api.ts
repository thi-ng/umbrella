import type { FloatType, IntType, UintType } from "@thi.ng/api";
import type { BitmapIndex } from "./bitmap.js";

export type ColumnSchema = Record<string, ColumnSpec>;

export type NumericType = IntType | UintType | FloatType;

export type Cardinality = [number, number];

export interface ColumnSpec {
	type: NumericType | "num" | "str";
	cardinality: Cardinality;
	flags: number;
	default: any;
}

export const REQUIRED: Cardinality = [1, 1];
export const OPTIONAL: Cardinality = [0, 1];
export const ONE_PLUS: Cardinality = [1, 2 ** 32];
export const ZERO_PLUS: Cardinality = [0, 2 ** 32];

export const FLAG_INDEXED = 1 << 0;
export const FLAG_BITMAP = 1 << 1;
export const FLAG_UNIQUE = 1 << 2;

export interface IColumn {
	bitmap?: BitmapIndex;

	readonly isArray: boolean;

	load(spec: SerializedColumn): void;

	reindex(): void;

	getRow(i: number): any;

	setRow(i: number, row: any[]): void;

	removeRow(i: number): void;

	encode(value: any): any;

	decode(value: any): any;
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
