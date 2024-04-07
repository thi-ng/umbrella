import type { NumOrString } from "@thi.ng/api";

export type SyncSources<T extends Record<NumOrString, any>> = {
	[id in keyof T]: AsyncIterable<T[id]>;
};

/**
 * Async iterator version of [thi.ng/rstream's sync()
 * construct](https://docs.thi.ng/umbrella/rstream/functions/sync.html).
 *
 * @param src
 */
export async function* sync<T extends Record<NumOrString, any>>(
	src: SyncSources<T>
): AsyncIterableIterator<T> {
	let iters = <{ key: keyof T; id: number; iter: AsyncIterator<any> }[]>(
		Object.entries(src).map(([key, v], id) => ({
			key,
			id,
			iter: v[Symbol.asyncIterator](),
		}))
	);
	let n = iters.length;
	const $remove = (id: number) => {
		iters.splice(id, 1);
		n--;
		if (!n) return true;
		for (let i = id; i < n; i++) iters[i].id--;
	};
	// wait for all sources
	const initial = await Promise.all(iters.map(({ iter }) => iter.next()));
	// keep active iterators only, update successive IDs
	for (let i = 0; i < n; ) {
		if (initial[i].done) {
			initial.splice(i, 1);
			if ($remove(i)) return;
		} else i++;
	}
	// build initial tuple
	const tuple = initial.reduce(
		(acc, x, i) => ((acc[iters[i].key] = x.value), acc),
		<T>{}
	);
	yield { ...tuple };
	// array of in-flight promises
	const promises = iters.map((iter) =>
		iter.iter.next().then((res) => ({ iter, res }))
	);
	while (true) {
		const { iter, res } = await Promise.any(promises);
		if (res.done) {
			promises.splice(iter.id, 1);
			if ($remove(iter.id)) return;
		} else {
			tuple[iter.key] = res.value;
			yield { ...tuple };
			promises[iter.id] = iter.iter.next().then((res) => ({ res, iter }));
		}
	}
}
