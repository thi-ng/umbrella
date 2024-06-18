import type { Maybe, NumOrString } from "@thi.ng/api";
import { __inflightIters, __iterNext } from "./internal/iter.js";

export type SyncSources<T extends Record<NumOrString, any>> = {
	[id in keyof T]: AsyncIterable<T[id]>;
};

export interface SyncOpts {
	/**
	 * If true, {@link sync} waits for new values from *all* remaining inputs
	 * before a new tuple is produced. If false, that synchronization only
	 * happens for the very first tuple and afterwards any changed input will
	 * trigger a tuple update.
	 *
	 * @defaultValue false
	 */
	reset: boolean;
	/**
	 * Only used if {@link SyncOpts.reset} is disabled. If true (default: false)
	 * *no* input synchronization (waiting for values) is applied and
	 * {@link sync} will emit potentially partially populated tuple objects for
	 * each received input value. However, as with the default behavior, tuples
	 * will retain the most recent consumed value from other inputs.
	 */
	mergeOnly: boolean;
}

/**
 * Async iterator version of [thi.ng/rstream's sync()
 * construct](https://docs.thi.ng/umbrella/rstream/functions/sync.html).
 *
 * @remarks
 * Also see {@link merge} for an alternative way of merging.
 *
 * @param src
 * @param opts
 */
export function sync<T extends Record<NumOrString, any>>(
	src: SyncSources<T>,
	opts?: Partial<SyncOpts> & { mergeOnly: true }
): AsyncIterableIterator<Partial<T>>;
export function sync<T extends Record<NumOrString, any>>(
	src: SyncSources<T>,
	opts?: Partial<SyncOpts>
): AsyncIterableIterator<T>;
export async function* sync<T extends Record<NumOrString, any>>(
	src: SyncSources<T>,
	opts?: Partial<SyncOpts>
) {
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
		if (!--n) return true;
		for (let i = id; i < n; i++) iters[i].id--;
	};
	const $initial = async () => {
		// wait for all sources
		const res = await Promise.all(iters.map(({ iter }) => iter.next()));
		// keep active iterators only, update successive IDs
		for (let i = 0; i < n; ) {
			if (res[i].done) {
				res.splice(i, 1);
				if ($remove(i)) return;
			} else i++;
		}
		// build tuple
		return res.reduce(
			(acc, x, i) => ((acc[iters[i].key] = x.value), acc),
			<T>{}
		);
	};
	if (opts?.reset) {
		let tuple: Maybe<T>;
		let curr: Maybe<T>;
		while ((curr = await $initial())) {
			tuple = { ...tuple, ...curr };
			yield tuple;
		}
	} else {
		let tuple: Maybe<T>;
		if (opts?.mergeOnly) {
			tuple = <T>{};
		} else {
			tuple = await $initial();
			if (!tuple) return;
			yield { ...tuple };
		}
		// array of in-flight promises
		const promises = __inflightIters(iters);
		while (true) {
			const { iter, res } = await Promise.race(promises);
			if (res.done) {
				promises.splice(iter.id, 1);
				if ($remove(iter.id)) return;
			} else {
				tuple[iter.key] = res.value;
				yield { ...tuple };
				__iterNext(promises, iter);
			}
		}
	}
}
