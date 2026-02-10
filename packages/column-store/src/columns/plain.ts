// SPDX-License-Identifier: Apache-2.0
import type { IColumn, SerializedColumn } from "../api.js";
import { __validateValue } from "../internal/checks.js";
import { __replaceValue } from "../internal/replace.js";
import { AColumn } from "./acolumn.js";

export class PlainColumn extends AColumn implements IColumn {
	values: any[] = [];

	readonly isArray = false;

	load(spec: SerializedColumn): void {
		this.values = spec.values;
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

	replaceValue(currValue: any, newValue: any) {
		return __replaceValue(this.bitmap, this.values, currValue, newValue);
	}

	toJSON() {
		return { values: this.values };
	}
}
