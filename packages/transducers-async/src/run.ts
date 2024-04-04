import type { Fn, MaybeAsyncIterable, MaybePromise } from "@thi.ng/api";
import { NO_OP } from "@thi.ng/api/api";
import type { AsyncTxLike } from "./api.js";
import { transduce } from "./transduce.js";

export async function run<A>(
	tx: AsyncTxLike<A, any>,
	src: MaybeAsyncIterable<A>
): Promise<void>;
export async function run<A, B>(
	tx: AsyncTxLike<A, B>,
	fx: Fn<B, MaybePromise<unknown>>,
	src: MaybeAsyncIterable<A>
): Promise<void>;
export async function run<A, B>(tx: AsyncTxLike<A, B>, ...args: any[]) {
	if (args.length === 1) {
		await transduce(tx, <any>[NO_OP, NO_OP, NO_OP], args[0]);
	} else {
		const fx: Fn<B, Promise<unknown>> = args[0];
		await transduce(
			tx,
			<any>[NO_OP, NO_OP, (_: any, x: B) => fx(x)],
			args[1]
		);
	}
}
