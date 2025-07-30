// SPDX-License-Identifier: Apache-2.0
import type { Fn2 } from "@thi.ng/api";
import type { ReadonlyVec } from "@thi.ng/vectors";

/** @internal */
export const filterSamples = (
	pred: Fn2<ReadonlyVec, number, boolean>,
	img: Iterable<ReadonlyVec>
) => {
	const samples: ReadonlyVec[] = [];
	let i = 0;
	for (let p of img) {
		if (pred(p, i)) samples.push(p);
		i++;
	}
	return samples;
};
