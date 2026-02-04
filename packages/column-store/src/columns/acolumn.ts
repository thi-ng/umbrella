import type { BidirIndex } from "@thi.ng/bidir-index";
import { isArray } from "@thi.ng/checks";
import { FLAG_BITMAP, type SerializedIndex } from "../api.js";
import { BitmapIndex } from "../bitmap.js";
import type { Table } from "../table.js";

export class AColumn {
	bitmap?: BitmapIndex;
	dict?: BidirIndex<any>;

	constructor(public readonly id: string, public table: Table) {
		if (table.schema[id].flags & FLAG_BITMAP) {
			this.bitmap = new BitmapIndex();
		}
	}

	encode(value: any) {
		return value;
	}

	decode(value: any) {
		return value;
	}

	protected loadDict(serialized: SerializedIndex): void {
		const { dict } = this;
		if (!dict) return;
		dict.clear();
		const index = serialized!.index;
		for (let i = 0; i < index.length; i++) {
			if (index[i] != null) {
				dict.fwd.set(index[i], i);
				dict.rev.set(i, index[i]);
			}
		}
		dict.nextID = serialized!.next;
	}

	protected updateBitmap(rows: ArrayLike<any>) {
		const { bitmap } = this;
		if (!bitmap) return;
		bitmap.clear();
		for (let i = 0; i < rows.length; i++) {
			const value = rows[i];
			if (isArray(value)) {
				for (let x of value) bitmap.setBit(x, i);
			} else bitmap.setBit(value, i);
		}
	}
}
