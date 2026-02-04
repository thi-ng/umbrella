import type { Nullable } from "@thi.ng/api";
import { BidirIndex } from "@thi.ng/bidir-index";
import { FLAG_UNIQUE, type IColumn, type SerializedColumn } from "../api.js";
import { __serializeDict } from "../internal/serialize.js";
import { AColumn } from "./acolumn.js";

export class EncodedArrayColumn extends AColumn implements IColumn {
	values: Nullable<number[]>[] = [];
	dict: BidirIndex<any> = new BidirIndex();

	readonly isArray = true;

	load({ dict, values }: SerializedColumn): void {
		this.values = values;
		this.reindex();
		super.loadDict(dict!);
	}

	reindex(): void {
		super.updateBitmap(this.values);
	}

	encode(value: any) {
		return this.dict.getAll(value, false, true);
	}

	decode(value: any[]) {
		return this.dict.getAllIDs(value, false, true);
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

	toJSON() {
		return { dict: __serializeDict(this.dict), values: this.values };
	}
}
