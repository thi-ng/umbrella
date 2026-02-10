// SPDX-License-Identifier: Apache-2.0
import type { Nullable } from "@thi.ng/api";
import { isArray } from "@thi.ng/checks/is-array";
import { FLAG_UNIQUE, type IColumn, type SerializedColumn } from "../api.js";
import { __validateArrayValue } from "../internal/checks.js";
import { AColumn } from "./acolumn.js";

export class TupleColumn extends AColumn implements IColumn {
	values: Nullable<number[]>[] = [];

	readonly isArray = true;

	load(spec: SerializedColumn): void {
		this.values = spec.values;
		this.reindex();
	}

	encode(value: any) {
		return isArray(value) ? value : [value];
	}

	validate(value: any) {
		return __validateArrayValue(this.spec, value);
	}

	setRow(i: number, value: any[]) {
		value = this.ensureValue(value);
		const { values, bitmap } = this;
		const old = values[i];
		const row = (values[i] =
			value != null
				? this.table.schema[this.id].flags & FLAG_UNIQUE
					? [...new Set(value)]
					: value
				: null);
		if (bitmap) {
			if (old) for (let x of old) bitmap.clearBit(x, i);
			if (row) for (let x of row) bitmap.setBit(x, i);
		}
	}

	getRow(i: number) {
		return this.values[i];
	}

	getRowKey(i: number) {
		return this.values[i];
	}

	valueKey(value: any) {
		return this.encode(value);
	}

	removeRow(i: number): void {
		this.values.splice(i, 1);
		this.bitmap?.removeBit(i);
	}

	replaceValue(currValue: any, newValue: any) {
		const { values, bitmap } = this;
		const isUnique = this.spec.flags & FLAG_UNIQUE;
		const bits = bitmap?.ensure(newValue);
		bitmap?.index.delete(currValue);

		let result = false;
		for (let i = 0; i < values.length; i++) {
			const row = values[i];
			if (row?.includes(currValue)) {
				let $values = row.map((x) => (x === currValue ? newValue : x));
				if (isUnique) $values = [...new Set($values)];
				values[i] = $values;
				bits?.setBit(i);
				result = true;
			}
		}
		return result;
	}

	toJSON() {
		return { values: this.values };
	}
}
