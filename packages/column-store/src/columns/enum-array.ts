import type { Nullable } from "@thi.ng/api";
import { BidirIndex } from "@thi.ng/bidir-index";
import { isArray } from "@thi.ng/checks/is-array";
import { FLAG_UNIQUE, type IColumn, type SerializedColumn } from "../api.js";
import { __validateArrayValue } from "../internal/checks.js";
import { __serializeDict } from "../internal/serialize.js";
import { AColumn } from "./acolumn.js";

export class EnumArrayColumn extends AColumn implements IColumn {
	values: Nullable<number[]>[] = [];
	dict: BidirIndex<any> = new BidirIndex();

	readonly isArray = true;

	load({ dict, values }: SerializedColumn): void {
		this.values = values;
		super.loadDict(dict!);
		super.updateBitmap(this.values);
	}

	reindex(): void {
		const dict = this.dict;
		const newDict = new BidirIndex();
		this.values = this.values.map((ids) =>
			ids ? newDict.addAll(dict.getAllIDs(ids)) : null
		);
		this.dict = newDict;
		super.updateBitmap(this.values);
	}

	encode(value: any) {
		return this.dict.getAll(isArray(value) ? value : [value], false, true);
	}

	decode(value: any[]) {
		return this.dict.getAllIDs(value, false, true);
	}

	validate(value: any) {
		return __validateArrayValue(this.spec, value);
	}

	setRow(i: number, value: any[]) {
		const { values, dict, bitmap } = this;
		const old = values[i];
		const encoded = (values[i] =
			value != null
				? this.table.schema[this.id].flags & FLAG_UNIQUE
					? [...dict.addAllUnique(value)]
					: dict.addAll(value)
				: null);
		if (bitmap) {
			if (old) for (let x of old) bitmap.clearBit(x, i);
			if (encoded) for (let x of encoded) bitmap.setBit(x, i);
		}
	}

	getRow(i: number) {
		const values = this.values[i];
		return values != null ? this.dict.getAllIDs(values) : null;
	}

	removeRow(i: number): void {
		this.values.splice(i, 1);
		this.bitmap?.removeBit(i);
	}

	replaceValue(currValue: any, newValue: any) {
		const { dict, values, bitmap } = this;
		const res = dict.renameKey(currValue, newValue);
		if (res === "ok") return true;
		if (res === "missing") return false;
		// conflict
		const currID = dict.get(currValue)!;
		const newID = dict.get(newValue)!;
		const isUnique = this.spec.flags & FLAG_UNIQUE;
		bitmap?.index.delete(currID);

		for (let i = 0; i < values.length; i++) {
			const row = values[i];
			if (row?.includes(currID)) {
				let $values = row.map((x) => (x === currID ? newID : x));
				if (isUnique) $values = [...new Set($values)];
				values[i] = $values;
				bitmap?.setBit(newID, i); // TODO avoid repeated index lookups
			}
		}
		return true;
	}

	toJSON() {
		return { dict: __serializeDict(this.dict), values: this.values };
	}
}
