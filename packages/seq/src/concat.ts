// SPDX-License-Identifier: Apache-2.0
import type { ISeq, ISeqable, Maybe, Nullable } from "@thi.ng/api";
import { ensureSeq } from "./ensure.js";

/**
 * Returns the concatenation sequence of given nullable
 * [`ISeq`](https://docs.thi.ng/umbrella/api/interfaces/ISeq.html) or
 * [`ISeqable`](https://docs.thi.ng/umbrella/api/interfaces/ISeqable.html)
 * values.
 *
 * @param args -
 */
export const concat = <T>(
	...args: Nullable<ISeq<T> | ISeqable<T>>[]
): Maybe<ISeq<T>> => {
	const seqs: ISeq<T>[] = [];
	for (let i = 0, n = args.length; i < n; i++) {
		const x = ensureSeq(args[i]);
		x && seqs.push(x);
	}
	const $seq = (curr: Nullable<ISeq<T>>, i: number) => {
		if (!curr) {
			curr = seqs[++i];
		}
		return curr
			? {
					first() {
						return curr!.first();
					},
					next() {
						return $seq(curr!.next(), i);
					},
			  }
			: undefined;
	};
	return $seq(seqs[0], 0);
};

/**
 * Same as {@link concat}, but optimized for nullable arraylike values.
 *
 * @param args -
 */
export const concatA = <T>(...args: Nullable<ArrayLike<T>>[]) => {
	const seqs: ArrayLike<T>[] = [];
	for (let i = 0, n = args.length; i < n; i++) {
		const x = args[i];
		x?.length && seqs.push(x);
	}
	const $seq = (i: number, j: number): Maybe<ISeq<T>> => {
		if (!seqs[i] || j >= seqs[i].length) {
			i++;
			j = 0;
		}
		return i < seqs.length
			? {
					first() {
						return seqs[i][j];
					},
					next() {
						return $seq(i, j + 1);
					},
			  }
			: undefined;
	};
	return $seq(0, 0);
};
