export const __inflightIters = <T extends { iter: AsyncIterator<any> }>(
	iters: T[]
) => iters.map((iter) => iter.iter.next().then((res) => ({ iter, res })));

export const __iterNext = <T extends { id: number; iter: AsyncIterator<any> }>(
	promises: Promise<{ iter: T; res: IteratorResult<any, any> }>[],
	iter: T
) => {
	promises[iter.id] = iter.iter.next().then((res) => ({ res, iter }));
};
