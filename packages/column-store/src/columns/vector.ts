// SPDX-License-Identifier: Apache-2.0
import { typedArray, type TypedArray } from "@thi.ng/api/typedarray";
import { isArray } from "@thi.ng/checks/is-array";
import { isArrayLike } from "@thi.ng/checks/is-arraylike";
import { isNumber } from "@thi.ng/checks/is-number";
import { unsupportedOp } from "@thi.ng/errors/unsupported";
import {
	LIMITS,
	type ColumnID,
	type NumericType,
	type Row,
	type SerializedColumn,
} from "../api.js";
import { __clampRange } from "../internal/indexof.js";
import { __deserializeTyped, __serializeTyped } from "../internal/serialize.js";
import type { Table } from "../table.js";
import { AColumn } from "./acolumn.js";

export class VectorColumn<T extends Row = Row> extends AColumn<T> {
	values: TypedArray;
	type: NumericType;
	size: number;
	limit: [number, number];
	protected tmp: TypedArray;

	readonly isArray = false;

	constructor(id: ColumnID<T>, table: Table<T>) {
		super(id, table);
		this.type = <NumericType>this.spec.type.split("v")[0];
		this.size = this.spec.cardinality[1];
		this.limit = LIMITS[this.type];
		this.values = typedArray(this.type, 8 * this.size);
		this.tmp = typedArray(this.type, this.size);
	}

	load({ values }: SerializedColumn): void {
		this.values = __deserializeTyped(this.type, this.spec.flags, values);
		this.reindex();
	}

	validate(value: any) {
		return (
			(isArrayLike(value) && value.length == this.size) ||
			(value == null && this.spec.default != null)
		);
	}

	setRow(i: number, value: any) {
		value = this.ensureValue(value);
		const j = i * this.size;
		let len = this.values.length;
		if (j >= len) {
			while (j >= len) len <<= 1;
			const tmp = typedArray(this.type, len);
			tmp.set(this.values);
			this.values = tmp;
		}
		const { values, bitmap } = this;
		if (bitmap) {
			bitmap.clearBit(this.getRowKey(i), i);
			bitmap.setBit(this.valueKey(value), i);
		}
		values.set(value, j);
	}

	getRow(i: number) {
		const { size } = this;
		i *= size;
		return this.values.subarray(i, i + size);
	}

	getRowKey(i: number) {
		return this.getRow(i).join("|");
	}

	valueKey(value: any) {
		const { tmp } = this;
		if (isArray(value) && !isNumber(value[0])) {
			return value.map((x) => {
				tmp.set(x);
				return tmp.join("|");
			});
		} else {
			tmp.set(value);
			return tmp.join("|");
		}
	}

	removeRow(i: number): void {
		const {
			size,
			table: { length },
		} = this;
		this.values.copyWithin(i, i + size, length * size);
		this.values.fill(0, (length - 1) * size);
		this.bitmap?.removeBit(i);
	}

	indexOf(value: any, start = 0, end?: number) {
		if (value == null) return -1;
		const { values, bitmap, size } = this;
		[start, end] = __clampRange(this.table.length, start, end);
		if (bitmap) {
			return (
				bitmap.index.get(this.valueKey(value))?.first(start, end) ?? -1
			);
		}
		end *= size;
		let i: number, j: number;
		outer: for (i = start * size; i < end; i += size) {
			for (j = 0; j < size; j++) {
				if (values[i + j] !== value[j]) continue outer;
			}
			return i / size;
		}
		return -1;
	}

	lastIndexOf(value: any, start = 0, end?: number) {
		if (value == null || value.length !== this.size) return -1;
		const { values, bitmap, size } = this;
		[start, end] = __clampRange(this.table.length, start, end);
		if (bitmap) {
			return (
				bitmap.index.get(this.valueKey(value))?.last(start, end) ?? -1
			);
		}
		start *= size;
		let i: number, j: number;
		outer: for (i = end * size; (i -= size) >= start; ) {
			for (j = 0; j < size; j++) {
				if (values[i + j] !== value[j]) continue outer;
			}
			return i / size;
		}
		return -1;
	}

	replaceValue(): boolean {
		unsupportedOp("TODO");
	}

	toJSON() {
		return __serializeTyped(
			this.values.subarray(0, this.table.length * this.size),
			this.spec,
			this.type
		);
	}
}
