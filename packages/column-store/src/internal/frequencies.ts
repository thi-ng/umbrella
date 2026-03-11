// SPDX-License-Identifier: Apache-2.0
import type { TypedArray } from "@thi.ng/api";
import { BidirIndex } from "@thi.ng/bidir-index";

/**
 * Constructs a new bidir index, sorted by key frequency, based on given index
 * and pre-computed histogram.
 *
 * @param dict
 * @param bins
 */
export const __frequencyIndex = (
	dict: BidirIndex<any>,
	bins: Map<number, number>
) => {
	const newDict = new BidirIndex();
	for (const bin of [...bins].sort((a, b) => b[1] - a[1])) {
		newDict.add(dict.getID(bin[0]));
	}
	return newDict;
};

/**
 * Computes histogram of `values`, sorted frequency. Returns array of
 * `[value,count]` bins. Nullish values in
 *
 * @internal
 */
export const __frequencies = (rows: TypedArray | (number | null)[]) => {
	const bins = new Map<number, number>();
	for (const row of rows) {
		if (row == null) continue;
		const n = bins.get(row);
		bins.set(row, n != null ? n + 1 : 1);
	}
	return bins;
};

/**
 * Same as {@link __frequencies}, but for tuple-based columns. Computes
 * histogram for unique component values inside tuples, not for the tuples
 * themselves.
 *
 * @internal
 */
export const __frequenciesTuples = (rows: (number[] | null)[]) => {
	const bins = new Map<number, number>();
	for (const row of rows) {
		if (row == null) continue;
		for (const v of row) {
			const n = bins.get(v);
			bins.set(v, n != null ? n + 1 : 1);
		}
	}
	return bins;
};
