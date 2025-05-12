// SPDX-License-Identifier: Apache-2.0
import type { Type } from "@thi.ng/api";
import { always } from "@thi.ng/api/fn";
import { typedArray, TYPEDARRAY_CTORS } from "@thi.ng/api/typedarray";
import type { ITensorStorage, StorageRegistry } from "./api.js";

/** @internal */
const __impl = (type: Type): ITensorStorage<number> => ({
	alloc: (size) => typedArray(type, size),
	from: (iter) => TYPEDARRAY_CTORS[type].from(iter),
	release: always,
});

export const STORAGE: StorageRegistry = {
	u8: __impl("u8"),
	u8c: __impl("u8c"),
	i8: __impl("i8"),
	u16: __impl("u16"),
	i16: __impl("i16"),
	u32: __impl("u32"),
	i32: __impl("i32"),
	f32: __impl("f32"),
	f64: __impl("f64"),
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
