import type { Fn, Maybe } from "@thi.ng/api";
import { isReduced } from "@thi.ng/transducers/reduced";
import type { AsyncTxLike } from "./api.js";
import { ensureAsyncTransducer } from "./ensure.js";
import { push } from "./push.js";

export const step = <A, B>(
	tx: AsyncTxLike<A, B>,
	unwrap = true
): Fn<A, Promise<Maybe<B | B[]>>> => {
	const [_, complete, reduce] = ensureAsyncTransducer(tx)(push());
	let done = false;
	return async (x: A) => {
		if (!done) {
			let acc = await reduce([], x);
			done = isReduced(acc);
			if (done) {
				acc = await complete(acc.deref());
			}
			return acc.length === 1 && unwrap
				? acc[0]
				: acc.length > 0
				? acc
				: undefined;
		}
	};
};
