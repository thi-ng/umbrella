import type { Nullable } from "@thi.ng/api";
import { BidirIndex } from "@thi.ng/bidir-index";
import type { IColumn, SerializedColumn } from "../api.js";
import { __serializeDict } from "../internal/serialize.js";
import { AColumn } from "./acolumn.js";

export class EncodedColumn extends AColumn implements IColumn {
	values: Nullable<number>[] = [];
	dict: BidirIndex<any> = new BidirIndex();

	load({ dict, values }: SerializedColumn): void {
		this.values = values;
		this.reindex();
		super.loadDict(dict!);
	}

	reindex(): void {
		super.updateBitmap(this.values);
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

	toJSON() {
		return { dict: __serializeDict(this.dict), values: this.values };
	}
}
