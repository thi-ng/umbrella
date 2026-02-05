// SPDX-License-Identifier: Apache-2.0
import type { Nullable } from "@thi.ng/api";
import { BidirIndex } from "@thi.ng/bidir-index";
import type { IColumn, SerializedColumn } from "../api.js";
import { __validateValue } from "../internal/checks.js";
import { __serializeDict } from "../internal/serialize.js";
import { AColumn } from "./acolumn.js";

export class EnumColumn extends AColumn implements IColumn {
	values: Nullable<number>[] = [];
	dict: BidirIndex<any> = new BidirIndex();

	readonly isArray = false;

	load({ dict, values }: SerializedColumn): void {
		this.values = values;
		super.loadDict(dict!);
		super.updateBitmap(this.values);
	}

	reindex(): void {
		const dict = this.dict;
		const newDict = new BidirIndex();
		this.values = this.values.map((x) =>
			x != null ? newDict.add(dict.getID(x)) : null
		);
		this.dict = newDict;
		super.updateBitmap(this.values);
	}

	encode(value: any) {
		return this.dict.get(value);
	}

	decode(value: any) {
		return this.dict.getID(value);
	}

	validate(value: any) {
		return __validateValue(this.spec, value);
	}

	setRow(i: number, value: any) {
		const { values, bitmap } = this;
		const old = values[i];
		const encoded = (values[i] =
			value != null ? this.dict.add(value) : null);
		if (bitmap) {
			if (old != null) bitmap.clearBit(old, i);
			if (encoded != null) bitmap?.setBit(encoded, i);
		}
	}

	getRow(i: number) {
		const value = this.values[i];
		return value != null ? this.dict.getID(value) : null;
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
		const currID = dict.get(currValue);
		const newID = dict.get(newValue);
		const bits = bitmap?.ensure(newID);
		bitmap?.index.delete(currID);

		for (let i = 0; i < values.length; i++) {
			if (values[i] === currID) {
				values[i] = newID;
				bits?.setBit(i);
			}
		}
		return true;
	}

	toJSON() {
		return { dict: __serializeDict(this.dict), values: this.values };
	}
}
