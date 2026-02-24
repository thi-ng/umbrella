// SPDX-License-Identifier: Apache-2.0
import { typedArray, type TypedArray } from "@thi.ng/api/typedarray";
import { isArray } from "@thi.ng/checks/is-array";
import { isNumber } from "@thi.ng/checks/is-number";
import {
	LIMITS,
	type ColumnID,
	type NumericType,
	type Row,
	type SerializedColumn,
} from "../api.js";
import { __indexOfSingle } from "../internal/indexof.js";
import { __replaceValue } from "../internal/replace.js";
import { __deserializeTyped, __serializeTyped } from "../internal/serialize.js";
import type { Table } from "../table.js";
import { AColumn } from "./acolumn.js";

export class TypedArrayColumn<T extends Row = Row> extends AColumn<T> {
	values: TypedArray;
	type: NumericType;
	limit: [number, number];
	protected tmp: TypedArray;

	readonly isArray = false;

	constructor(id: ColumnID<T>, table: Table<T>) {
		super(id, table);
		this.type = <NumericType>table.schema[id].type;
		this.limit = LIMITS[this.type];
		this.values = typedArray(this.type, 8);
		this.tmp = typedArray(this.type, 1);
	}

	load({ values }: SerializedColumn): void {
		this.values = __deserializeTyped(this.type, this.spec.flags, values);
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

	valueKey(value: any) {
		const { tmp } = this;
		if (isArray(value)) {
			return value.map((x) => {
				tmp[0] = x;
				return tmp[0];
			});
		} else {
			tmp[0] = value;
			return tmp[0];
		}
	}

	removeRow(i: number): void {
		this.values.copyWithin(i, i + 1, this.table.length);
		this.values[this.table.length - 1] = 0;
		this.bitmap?.removeBit(i);
	}

	indexOf(value: any, start = 0, end = this.table.length) {
		return __indexOfSingle(
			value,
			this.values,
			this.bitmap,
			this.table.length,
			start,
			end
		);
	}

	replaceValue(currValue: any, newValue: any) {
		return __replaceValue(this.bitmap, this.values, currValue, newValue);
	}

	toJSON() {
		return __serializeTyped(
			this.values.subarray(0, this.table.length),
			this.spec,
			this.type
		);
	}
}
