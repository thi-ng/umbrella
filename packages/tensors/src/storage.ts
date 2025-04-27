import { type Type as $Type } from "@thi.ng/api";
import { always } from "@thi.ng/api/fn";
import { typedArray, TYPEDARRAY_CTORS } from "@thi.ng/api/typedarray";
import type { ITensorStorage, StorageRegistry } from "./api.js";

const impl = (type: $Type): ITensorStorage<number> => ({
	alloc: (size) => typedArray(type, size),
	from: (iter) => TYPEDARRAY_CTORS[type].from(iter),
	release: always,
});

export const STORAGE: StorageRegistry = {
	u8: impl("u8"),
	u8c: impl("u8c"),
	i8: impl("i8"),
	u16: impl("u16"),
	i16: impl("i16"),
	u32: impl("u32"),
	i32: impl("i32"),
	f32: impl("f32"),
	f64: impl("f64"),
	num: {
		alloc: (size) => new Array<number>(size).fill(0),
		from: (iter) => [...iter],
		release: always,
	},
	str: {
		alloc: (size) => new Array<string>(size).fill(""),
		from: (iter) => [...iter],
		release: always,
	},
};
