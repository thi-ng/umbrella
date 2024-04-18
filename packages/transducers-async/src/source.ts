import type { Fn, FnO, IDeref } from "@thi.ng/api";
import { illegalState } from "@thi.ng/errors/illegal-state";
import type { ClosableAsyncGenerator } from "./api.js";

export interface Source<T>
	extends ClosableAsyncGenerator<T>,
		IDeref<T | undefined> {
	reset(x?: T): void;
	update(fn: FnO<T | undefined, T | undefined>, ...args: any[]): void;
}

/**
 * @example
 * ```ts tangle:../export/source.ts
 * import { source, map, run } from "@thi.ng/transducers-async";
 *
 * const src = source();
 *
 * (async () =>
 *   run(map(async (x) => x * 10), console.log, src)
 * )();
 *
 * src.send(23);
 * // 230
 *
 * // close/terminate source
 * src.close();
 * ```
 *
 * @param initial
 * @param capacity
 */
export const source = <T>(initial?: T, capacity = 1) => {
	const queue: (T | undefined)[] = [];
	let last: T | undefined = initial;
	let isClosed = false;
	let promise: Promise<T | undefined>;
	let resolve: Fn<T | undefined, void> | undefined;
	const newPromise = () => {
		promise = new Promise<T | undefined>(($resolve) => {
			resolve = $resolve;
		});
	};
	newPromise();
	const gen = <Source<T>>(async function* () {
		while (true) {
			const val = await promise!;
			if (val === undefined) break;
			last = val;
			yield val;
			newPromise();
			if (queue.length) resolve!(queue.shift());
		}
		isClosed = true;
	})();
	gen.reset = (x) => {
		if (isClosed) return;
		if (resolve) {
			resolve(x);
			resolve = undefined;
		} else if (queue.length < capacity) {
			queue.push(x);
		} else illegalState(`buffer overflow (max capacity=${capacity})`);
	};
	gen.update = (fn, ...args: any[]) => gen.reset(fn(last, ...args));
	gen.close = () => gen.reset(undefined);
	gen.deref = () => last;
	if (initial !== undefined) gen.reset(initial);
	return gen;
};
