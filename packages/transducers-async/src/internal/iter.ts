// SPDX-License-Identifier: Apache-2.0
/** @internal */
export const __inflightIters = <T extends { iter: AsyncIterator<any> }>(
	iters: T[]
) => iters.map((iter) => iter.iter.next().then((res) => ({ iter, res })));

/** @internal */
export const __iterNext = <T extends { id: number; iter: AsyncIterator<any> }>(
	promises: Promise<{ iter: T; res: IteratorResult<any, any> }>[],
	iter: T
) => {
	promises[iter.id] = iter.iter.next().then((res) => ({ res, iter }));
};

/** @internal */
export const __iterRemove = <
	T extends { id: number; iter: AsyncIterator<any> }
>(
	iters: T[],
	id: number
) => {
	iters.splice(id, 1);
	const n = iters.length;
	if (!n) return true;
	for (let i = id; i < n; i++) iters[i].id--;
};
