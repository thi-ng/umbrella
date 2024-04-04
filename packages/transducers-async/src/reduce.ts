import { asyncIdentity, type MaybeAsyncIterable } from "@thi.ng/api/async";
import { isReduced } from "@thi.ng/transducers/reduced";
import type { AsyncReducer, AsyncReducerInit, AsyncReduction } from "./api.js";

export async function reduce<A, B>(
	rfn: AsyncReducer<A, B>,
	src: MaybeAsyncIterable<A>
): Promise<B>;
export async function reduce<A, B>(
	rfn: AsyncReducer<A, B>,
	acc: B,
	src: MaybeAsyncIterable<B>
): Promise<B>;
export async function reduce<A, B>(
	[init, complete, $reduce]: AsyncReducer<A, B>,
	...xs: any[]
) {
	let acc: B = xs.length < 2 ? await init() : xs.shift();
	for await (let x of <MaybeAsyncIterable<A>>xs[0]) {
		const y = await $reduce(acc, x);
		if (isReduced(y)) {
			acc = y.deref();
			break;
		}
		acc = y;
	}
	return await complete(acc);
}

/**
 * Convenience helper for building a full {@link AsyncReducer} using
 * [asyncIdentity](https://docs.thi.ng/umbrella/api/functions/asyncIdentity.html)
 * as completion step (true for 90% of all bundled transducers).
 *
 * @param init - init step of reducer
 * @param rfn - reduction step of reducer
 */
export const reducer = <A, B>(
	init: AsyncReducerInit<B>,
	rfn: AsyncReduction<A, B>
) => <AsyncReducer<A, B>>[init, asyncIdentity, rfn];
