// SPDX-License-Identifier: Apache-2.0
import { BidirIndex } from "@thi.ng/bidir-index";
import { isArray } from "@thi.ng/checks/is-array";
import { decodeBinary, encodeBinary } from "@thi.ng/rle-pack/binary";
import { decodeSimple, encodeSimple } from "@thi.ng/rle-pack/simple";
import { FLAG_RLE, type Row, type SerializedColumn } from "../api.js";
import { __validateValue } from "../internal/checks.js";
import { __indexOfSingle } from "../internal/indexof.js";
import { __serializeDict } from "../internal/serialize.js";
import { AColumn } from "./acolumn.js";

export class DictColumn<T extends Row = Row> extends AColumn<T> {
	values: (number | null)[] = [];
	dict: BidirIndex<any> = new BidirIndex();

	readonly isArray = false;

	load({ dict, values }: SerializedColumn): void {
		this.values =
			this.spec.flags & FLAG_RLE
				? this.spec.cardinality[0] === 0 && this.spec.default == null
					? decodeSimple(values)
					: Array.from(decodeBinary(<any>values))
				: values;
		super.loadDict(dict!);
		super.updateBitmap();
	}

	reindex(): void {
		const dict = this.dict;
		const newDict = new BidirIndex();
		this.values = this.values.map((x) =>
			x != null ? newDict.add(dict.getID(x)) : null
		);
		this.dict = newDict;
		super.updateBitmap();
	}

	encode(value: any) {
		return this.dict.get(value) ?? null;
	}

	decode(value: any) {
		return this.dict.getID(value);
	}

	validate(value: any) {
		return __validateValue(this.spec, value);
	}

	setRow(i: number, value: any) {
		value = this.ensureValue(value);
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

	getRowKey(i: number) {
		return this.values[i];
	}

	valueKey(value: any) {
		return isArray(value) ? this.dict.getAll(value) : this.dict.get(value);
	}

	removeRow(i: number): void {
		this.values.splice(i, 1);
		this.bitmap?.removeBit(i);
	}

	indexOf(value: any, start = 0, end = this.table.length) {
		return __indexOfSingle(
			this.encode(value),
			this.values,
			this.bitmap,
			this.table.length,
			start,
			end
		);
	}

	replaceValue(currValue: any, newValue: any) {
		const { dict, values, bitmap } = this;
		const res = dict.renameKey(currValue, newValue);
		if (res === "ok") return true;
		if (res === "missing") return false;

		// conflict
		const currID = dict.get(currValue)!;
		const newID = dict.get(newValue)!;
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
		let { values, spec } = this;
		if (spec.flags & FLAG_RLE) {
			if (spec.cardinality[0] == 0 && spec.default == null) {
				values = encodeSimple(values);
			} else {
				const numBits = Math.max(
					1,
					Math.ceil(Math.log2(this.dict.size))
				);
				values = Array.from(
					encodeBinary(<number[]>values, values.length, numBits)
				);
			}
		}
		return { dict: __serializeDict(this.dict), values };
	}
}
