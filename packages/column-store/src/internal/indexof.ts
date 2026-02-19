// SPDX-License-Identifier: Apache-2.0
import type { Maybe } from "@thi.ng/api";
import type { BitmapIndex } from "../bitmap.js";

/** @internal */
export const __indexOfSingle = (
	needle: any,
	values: ArrayLike<any>,
	bitmap: Maybe<BitmapIndex>,
	max: number,
	start: number,
	end = max
) => {
	start = Math.max(start, 0);
	end = Math.min(end, max);
	if (bitmap) return bitmap.index.get(needle)?.first(start, end) ?? -1;
	for (let i = start; i < end; i++) {
		if (values[i] === needle) return i;
	}
	return -1;
};

export const __indexOfTuple = (
	needle: ArrayLike<any> | null,
	values: ArrayLike<any>,
	max: number,
	start: number,
	end = max
) => {
	start = Math.max(start, 0);
	end = Math.min(end, max);
	if (needle == null) {
		for (let i = start; i < end; i++) {
			if (!values[i]) return i;
		}
	}
	const n = needle!.length;
	let i: number, j: number, row: number[] | null;
	outer: for (i = start; i < end; i++) {
		row = values[i];
		if (row?.length === n) {
			for (j = 0; j < n; j++) {
				if (row[j] !== needle![j]) continue outer;
			}
			return i;
		}
	}
	return -1;
};
