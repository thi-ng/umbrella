import type { Maybe, TypedArray } from "@thi.ng/api";
import type { BitmapIndex } from "../bitmap";

/** @internal */
export const __replaceValue = (
	bitmap: Maybe<BitmapIndex>,
	values: any[] | TypedArray,
	currVal: any,
	newVal: any
) => {
	bitmap?.index.delete(currVal);
	let result = false;
	for (let i = 0; i < values.length; i++) {
		if (values[i] === currVal) {
			values[i] = newVal;
			bitmap?.setBit(newVal, i); // TODO avoid repeated index lookups
			result = true;
		}
	}
	return result;
};
