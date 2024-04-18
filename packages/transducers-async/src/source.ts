import type { Fn } from "@thi.ng/api";
import { illegalState } from "@thi.ng/errors/illegal-state";
import type { ClosableAsyncGenerator } from "./api.js";

export interface Source<T> extends ClosableAsyncGenerator<T> {
	send(x?: T): void;
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
	let promise: Promise<T | undefined>;
	let resolve: Fn<T | undefined, void> | undefined;
	let isClosed = false;
	const queue: (T | undefined)[] = [];
	const reset = () => {
		promise = new Promise<T | undefined>(($resolve) => {
			resolve = $resolve;
		});
	};
	reset();
	const gen = <Source<T>>(async function* () {
		while (true) {
			const val = await promise!;
			if (val === undefined) break;
			yield val;
			reset();
			if (queue.length) resolve!(queue.shift());
		}
		isClosed = true;
	})();
	gen.send = (x) => {
		if (isClosed) return;
		if (resolve) {
			resolve(x);
			resolve = undefined;
		} else if (queue.length < capacity) {
			queue.push(x);
		} else illegalState(`buffer overflow (max capacity=${capacity})`);
	};
	gen.close = () => gen.send(undefined);
	if (initial !== undefined) gen.send(initial);
	return gen;
};
