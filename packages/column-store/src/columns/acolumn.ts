// SPDX-License-Identifier: Apache-2.0
import type { Predicate } from "@thi.ng/api";
import type { BidirIndex } from "@thi.ng/bidir-index";
import {
	FLAG_BITMAP,
	type ColumnID,
	type ColumnSpec,
	type IColumn,
	type Row,
	type SerializedColumn,
	type SerializedIndex,
} from "../api.js";
import { BitmapIndex } from "../bitmap.js";
import { __columnError } from "../internal/checks.js";
import { __clampRange } from "../internal/indexof.js";
import type { Table } from "../table.js";

export abstract class AColumn<T extends Row = Row> implements IColumn {
	spec: ColumnSpec;
	bitmap?: BitmapIndex;
	dict?: BidirIndex<any>;

	abstract isArray: boolean;

	constructor(public readonly id: ColumnID<T>, public table: Table<T>) {
		this.spec = table.schema[id];
		this.ensureBitmap();
	}

	abstract load(spec: SerializedColumn): void;

	reindex() {
		this.updateBitmap();
	}

	abstract validate(value: any): boolean;

	abstract setRow(i: number, value: any): void;

	abstract removeRow(i: number): void;

	abstract ensureRows(): void;

	abstract replaceValue(currValue: any, newValue: any): boolean;

	abstract valueKey(x: any): any;

	abstract getRow(i: number): any;

	abstract getRowKey(i: number): any;

	abstract indexOf(value: any, start?: number, end?: number): number;

	abstract lastIndexOf(value: any, start?: number, end?: number): number;

	findIndex(pred: Predicate<any>, start = 0, end?: number) {
		[start, end] = __clampRange(this.table.length, start, end);
		for (let i = start; i < end; i++) {
			if (pred(this.getRow(i))) return i;
		}
		return -1;
	}

	findLastIndex(pred: Predicate<any>, start = 0, end?: number) {
		[start, end] = __clampRange(this.table.length, start, end);
		for (let i = end; i-- > start; ) {
			if (pred(this.getRow(i))) return i;
		}
		return -1;
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

	protected updateBitmap() {
		this.ensureBitmap();
		const { bitmap, isArray } = this;
		if (!bitmap) return;
		bitmap.clear();
		for (let i = 0, n = this.table.length; i < n; i++) {
			const value = this.getRowKey(i);
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
			? this.spec.default ?? __columnError(this.id, `missing value`)
			: this.spec.default ?? null;
	}

	protected ensureBitmap() {
		if (this.spec.flags & FLAG_BITMAP) this.bitmap = new BitmapIndex();
	}
}
