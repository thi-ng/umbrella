// SPDX-License-Identifier: Apache-2.0
import { SIZEOF, typedArray, type TypedArray } from "@thi.ng/api/typedarray";
import { isNumber } from "@thi.ng/checks/is-number";
import { decodeBinary, encodeBinary } from "@thi.ng/rle-pack/binary";
import {
	FLAG_RLE,
	LIMITS,
	type IColumn,
	type NumericType,
	type SerializedColumn,
} from "../api.js";
import { __replaceValue } from "../internal/replace.js";
import type { Table } from "../table.js";
import { AColumn } from "./acolumn.js";
import { isArray } from "@thi.ng/checks/is-array";

export class TypedArrayColumn extends AColumn implements IColumn {
	values: TypedArray;
	type: NumericType;
	limit: [number, number];
	protected tmp: TypedArray;

	readonly isArray = false;

	constructor(id: string, table: Table) {
		super(id, table);
		this.type = <NumericType>table.schema[id].type;
		this.limit = LIMITS[this.type];
		this.values = typedArray(this.type, 8);
		this.tmp = typedArray(this.type, 1);
	}

	load(spec: SerializedColumn): void {
		if (this.spec.flags & FLAG_RLE) {
			const values = decodeBinary(<any>spec.values);
			this.values = typedArray(this.type, values.buffer);
		} else {
			this.values = typedArray(this.type, spec.values);
		}
		this.reindex();
	}

	validate(value: any) {
		return (
			(isNumber(value) &&
				value >= this.limit[0] &&
				value <= this.limit[1]) ||
			(value == null && this.spec.default != null)
		);
	}

	setRow(i: number, value: any) {
		value = this.ensureValue(value);
		let len = this.values.length;
		if (i >= len) {
			while (i >= len) len <<= 1;
			const tmp = typedArray(this.type, len);
			tmp.set(this.values);
			this.values = tmp;
		}
		const { values, bitmap } = this;
		const old = values[i];
		values[i] = value;
		if (bitmap) {
			bitmap.clearBit(old, i);
			bitmap.setBit(value, i);
		}
	}

	getRow(i: number) {
		return this.values[i];
	}

	getRowKey(i: number) {
		return this.values[i];
	}

	valueKey(x: any) {
		this.tmp[0] = x;
		return this.tmp[0];
	}

	removeRow(i: number): void {
		this.values.copyWithin(i, i + 1, this.table.length);
		this.values[this.table.length - 1] = 0;
		this.bitmap?.removeBit(i);
	}

	replaceValue(currValue: any, newValue: any) {
		return __replaceValue(this.bitmap, this.values, currValue, newValue);
	}

	toJSON() {
		let values = this.values.subarray(0, this.table.length);
		if (this.spec.flags & FLAG_RLE) {
			values = encodeBinary(values, values.length, SIZEOF[this.type] * 8);
		}
		return { values: Array.from(values) };
	}
}
