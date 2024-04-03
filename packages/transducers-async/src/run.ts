import type { Fn, MaybeAsyncIterable } from "@thi.ng/api";
import { NO_OP } from "@thi.ng/api/api";
import type { AsyncTxLike } from "./api.js";
import { transduce } from "./transduce.js";

export function run<A>(tx: AsyncTxLike<A, any>, xs: Iterable<A>): void;
export function run<A, B>(
	tx: AsyncTxLike<A, B>,
	fx: Fn<B, Promise<unknown>>,
	xs: MaybeAsyncIterable<A>
): void;
export function run<A, B>(tx: AsyncTxLike<A, B>, ...args: any[]) {
	if (args.length === 1) {
		transduce(tx, <any>[NO_OP, NO_OP, NO_OP], args[0]);
	} else {
		const fx: Fn<B, Promise<unknown>> = args[0];
		transduce(tx, <any>[NO_OP, NO_OP, (_: any, x: B) => fx(x)], args[1]);
	}
}
