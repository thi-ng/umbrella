// SPDX-License-Identifier: Apache-2.0
import type { Fn2, NumericArray } from "@thi.ng/api";

/** @internal */
export const filterSamples = (
	pred: Fn2<NumericArray, number, boolean>,
	img: Iterable<NumericArray>
) => {
	const samples: NumericArray[] = [];
	let i = 0;
	for (let p of img) {
		if (pred(p, i)) samples.push(p);
		i++;
	}
	return samples;
};
