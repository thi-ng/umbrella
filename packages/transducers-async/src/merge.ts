import { __inflightIters, __iterNext } from "./internal/iter.js";

/**
 * Async iterator version of [thi.ng/rstream's merge()
 * construct](https://docs.thi.ng/umbrella/rstream/functions/merge.html).
 *
 * @remarks
 * Also see {@link sync} for an alternative way of merging.
 *
 * @param src
 */
export async function* merge<T>(
	src: AsyncIterable<T>[]
): AsyncIterableIterator<T> {
	const iters = <{ id: number; iter: AsyncIterator<any> }[]>(
		src.map((v, id) => ({ id, iter: v[Symbol.asyncIterator]() }))
	);
	let n = iters.length;
	const $remove = (id: number) => {
		iters.splice(id, 1);
		if (!--n) return true;
		for (let i = id; i < n; i++) iters[i].id--;
	};
	// array of in-flight promises
	const promises = __inflightIters(iters);
	while (true) {
		const { iter, res } = await Promise.race(promises);
		if (res.done) {
			promises.splice(iter.id, 1);
			if ($remove(iter.id)) return;
		} else {
			yield res.value;
			__iterNext(promises, iter);
		}
	}
}
