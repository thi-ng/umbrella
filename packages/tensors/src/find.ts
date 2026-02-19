// SPDX-License-Identifier: Apache-2.0
import type { Predicate } from "@thi.ng/api";
import type { ITensor1 } from "./api.js";

export const findIndex = <T = number>(
	a: ITensor1<T>,
	pred: Predicate<T>,
	start = 0,
	end = a.length
) => {
	const {
		offset: oa,
		stride: [ta],
		data: adata,
	} = a;
	for (let i = start; i < end; i++) {
		if (pred(adata[oa + i * ta])) return i;
	}
	return -1;
};
