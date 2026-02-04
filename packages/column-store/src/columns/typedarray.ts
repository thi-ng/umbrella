import { typedArray, type TypedArray } from "@thi.ng/api/typedarray";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import type { IColumn, NumericType, SerializedColumn } from "../api.js";
import type { Table } from "../table.js";
import { AColumn } from "./acolumn.js";

/** @internal */
const LIMITS: Record<NumericType, [number, number]> = {
	u8: [0, 0xff],
	u8c: [0, 0xff],
	u16: [0, 0xffff],
	u32: [0, 0xffff_ffff],
	i8: [-0x80, 0x7f],
	i16: [-0x8000, 0x7fff],
	i32: [-0x8000_0000, 0x7fff_ffff],
	f32: [-Infinity, Infinity],
	f64: [-Infinity, Infinity],
};

export class TypedArrayColumn extends AColumn implements IColumn {
	values: TypedArray;
	type: NumericType;

	readonly isArray = false;

	constructor(id: string, table: Table) {
		super(id, table);
		this.type = <NumericType>table.schema[id].type;
		this.values = typedArray(this.type, 8);
	}

	load(spec: SerializedColumn): void {
		this.values = typedArray(this.type, spec.values);
		this.reindex();
	}

	reindex(): void {
		super.updateBitmap(this.values.subarray(0, this.table.length));
	}

	setRow(i: number, value: any) {
		const limit = LIMITS[this.type];
		if (value < limit[0] || value > limit[1])
			illegalArgs(
				`column ${
					this.id
				} value out of bounds (got ${value}, but range is ${JSON.stringify(
					limit
				)}`
			);
		let len = this.values.length;
		if (i >= len) {
			while (i >= len) len <<= 1;
			const tmp = typedArray(this.type, len);
			tmp.set(this.values);
			this.values = tmp;
		}
		const { values, bitmap } = this;
		const old = values[i];
		values[i] = value;
		if (bitmap) {
			bitmap.clearBit(old, i);
			bitmap.setBit(value, i);
		}
	}

	getRow(i: number) {
		return this.values[i];
	}

	removeRow(i: number): void {
		this.values.copyWithin(i, i + 1, this.table.length);
		this.values[this.table.length - 1] = 0;
		this.bitmap?.removeBit(i);
	}

	toJSON() {
		return {
			values: Array.from(this.values.subarray(0, this.table.length)),
		};
	}
}
