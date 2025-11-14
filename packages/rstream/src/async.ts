// SPDX-License-Identifier: Apache-2.0
import type { Fn, Nullable } from "@thi.ng/api";
import { SEMAPHORE } from "@thi.ng/api/api";
import { State, type ISubscription, type WithErrorHandlerOpts } from "./api.js";
import { stream } from "./stream.js";

/**
 * Creates a new {@link stream} from given async iterable `src` and `opts`.
 *
 * @param src
 * @param opts
 */
export const fromAsync = <T>(
	src: AsyncIterable<T>,
	opts?: Partial<WithErrorHandlerOpts>
) =>
	stream<T>(($stream) => {
		let active = true;
		(async () => {
			try {
				for await (let x of src) {
					if (!active) return;
					$stream.next(x);
				}
				$stream.done();
			} catch (e) {
				$stream.error(e);
			}
		})();
		return () => (active = false);
	}, opts);

/**
 * Reverse operation of {@link fromAsync}. Returns an async iterator which
 * subscribes to given `src` sub and yields values as long as the `src` is
 * intact.
 *
 * @param src
 */
export async function* asAsync<T>(src: ISubscription<any, T>) {
	let resolve: Fn<T | typeof SEMAPHORE, void>;
	let initial: Nullable<Promise<T | typeof SEMAPHORE>>;
	const $newInitial = () => {
		return (initial = new Promise(($resolve) => {
			resolve = $resolve;
		}));
	};
	const promises: Promise<T | typeof SEMAPHORE>[] = [$newInitial()];
	src.subscribe({
		next(x) {
			if (initial) {
				resolve(x);
				initial = undefined;
			} else promises.push(Promise.resolve(x));
		},
		done() {
			if (initial) {
				resolve(SEMAPHORE);
				initial = undefined;
			} else promises.push(Promise.resolve(SEMAPHORE));
		},
	});

	while (promises.length && src.getState() < State.ERROR) {
		const res = await promises.shift()!;
		if (res === SEMAPHORE) break;
		if (!promises.length) promises[0] = $newInitial();
		yield res;
	}
}
