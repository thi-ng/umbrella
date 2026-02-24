// SPDX-License-Identifier: Apache-2.0
import { decodeSimple, encodeSimple } from "@thi.ng/rle-pack/simple";
import { FLAG_RLE, type Row, type SerializedColumn } from "../api.js";
import { __validateValue } from "../internal/checks.js";
import { __indexOfSingle } from "../internal/indexof.js";
import { __replaceValue } from "../internal/replace.js";
import { AColumn } from "./acolumn.js";

export class PlainColumn<T extends Row = Row> extends AColumn<T> {
	values: any[] = [];

	readonly isArray = false;

	load({ values }: SerializedColumn): void {
		this.values =
			this.spec.flags & FLAG_RLE
				? Array.from(decodeSimple(<any>values))
				: values;
		this.reindex();
	}

	validate(value: any) {
		return __validateValue(this.spec, value);
	}

	setRow(i: number, value: any) {
		const { values, bitmap } = this;
		const old = values[i];
		values[i] = this.ensureValue(value);
		if (bitmap) {
			if (old != null) bitmap.clearBit(old, i);
			if (value != null) bitmap.setBit(value, i);
		}
	}

	getRow(i: number) {
		return this.values[i];
	}

	getRowKey(i: number) {
		return this.values[i];
	}

	valueKey(x: any) {
		return x;
	}

	removeRow(i: number): void {
		this.values.splice(i, 1);
		this.bitmap?.removeBit(i);
	}

	indexOf(value: any, start = 0, end?: number) {
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
		return {
			values:
				this.spec.flags & FLAG_RLE
					? encodeSimple(this.values)
					: this.values,
		};
	}
}
