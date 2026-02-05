// SPDX-License-Identifier: Apache-2.0
import type { Maybe, TypedArray } from "@thi.ng/api";
import type { BitmapIndex } from "../bitmap.js";

/** @internal */
export const __replaceValue = (
	bitmap: Maybe<BitmapIndex>,
	values: any[] | TypedArray,
	currVal: any,
	newVal: any
) => {
	const bits = bitmap?.ensure(newVal);
	bitmap?.index.delete(currVal);
	let result = false;
	for (let i = 0; i < values.length; i++) {
		if (values[i] === currVal) {
			values[i] = newVal;
			bits?.setBit(i);
			result = true;
		}
	}
	return result;
};
