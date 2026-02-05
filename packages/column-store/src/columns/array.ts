import type { Nullable } from "@thi.ng/api";
import { isArray } from "@thi.ng/checks/is-array";
import { FLAG_UNIQUE, type IColumn, type SerializedColumn } from "../api.js";
import { __validateArrayValue } from "../internal/checks.js";
import { AColumn } from "./acolumn.js";

export class ArrayColumn extends AColumn implements IColumn {
	values: Nullable<number[]>[] = [];

	readonly isArray = true;

	load(spec: SerializedColumn): void {
		this.values = spec.values;
		this.reindex();
	}

	reindex(): void {
		super.updateBitmap(this.values);
	}

	encode(value: any) {
		return isArray(value) ? value : [value];
	}

	validate(value: any) {
		return __validateArrayValue(this.spec, value);
	}

	setRow(i: number, value: any[]) {
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

	removeRow(i: number): void {
		this.values.splice(i, 1);
		this.bitmap?.removeBit(i);
	}

	toJSON() {
		return { values: this.values };
	}
}
