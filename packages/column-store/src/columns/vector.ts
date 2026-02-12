// SPDX-License-Identifier: Apache-2.0
import { SIZEOF, typedArray, type TypedArray } from "@thi.ng/api/typedarray";
import { isArrayLike } from "@thi.ng/checks/is-arraylike";
import { isNumber } from "@thi.ng/checks/is-number";
import { unsupportedOp } from "@thi.ng/errors/unsupported";
import { decodeBinary, encodeBinary } from "@thi.ng/rle-pack/binary";
import {
	FLAG_RLE,
	LIMITS,
	type IColumn,
	type NumericType,
	type SerializedColumn,
} from "../api.js";
import type { Table } from "../table.js";
import { AColumn } from "./acolumn.js";
import { isArray } from "@thi.ng/checks/is-array";

export class VectorColumn extends AColumn implements IColumn {
	values: TypedArray;
	type: NumericType;
	size: number;
	limit: [number, number];
	protected tmp: TypedArray;

	readonly isArray = false;

	constructor(id: string, table: Table) {
		super(id, table);
		this.type = <NumericType>this.spec.type.split("v")[0];
		this.size = this.spec.cardinality[1];
		this.limit = LIMITS[this.type];
		this.values = typedArray(this.type, 8 * this.size);
		this.tmp = typedArray(this.type, this.size);
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

	replaceValue(): boolean {
		unsupportedOp("TODO");
	}

	toJSON() {
		let $values = this.values.subarray(0, this.table.length * this.size);
		if (this.spec.flags & FLAG_RLE) {
			$values = encodeBinary(
				$values,
				$values.length,
				SIZEOF[this.type] * 8
			);
		}
		let values: any[] = Array.from($values);
		const prec = this.spec.opts?.prec;
		if (prec != null) values = values.map((x) => +x.toFixed(prec));
		return { values };
	}
}
