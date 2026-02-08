// SPDX-License-Identifier: Apache-2.0
import type { BidirIndex } from "@thi.ng/bidir-index";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { FLAG_BITMAP, type ColumnSpec, type SerializedIndex } from "../api.js";
import { BitmapIndex } from "../bitmap.js";
import type { Table } from "../table.js";

export abstract class AColumn {
	spec: ColumnSpec;
	bitmap?: BitmapIndex;
	dict?: BidirIndex<any>;

	abstract isArray: boolean;

	constructor(public readonly id: string, public table: Table) {
		this.spec = table.schema[id];
		this.ensureBitmap();
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
		this.ensureBitmap();
		const { bitmap, isArray } = this;
		if (!bitmap) return;
		bitmap.clear();
		for (let i = 0; i < rows.length; i++) {
			const value = rows[i];
			if (value == null) continue;
			if (isArray) {
				for (let x of value) bitmap.setBit(x, i);
			} else bitmap.setBit(value, i);
		}
	}

	protected ensureValue(val: any) {
		return val != null
			? val
			: this.spec.cardinality[0] > 0
			? this.spec.default ??
			  illegalArgs(`missing value for column: ${this.id}`)
			: this.spec.default ?? null;
	}

	protected ensureBitmap() {
		if (this.spec.flags & FLAG_BITMAP) this.bitmap = new BitmapIndex();
	}
}
