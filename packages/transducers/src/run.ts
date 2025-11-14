// SPDX-License-Identifier: Apache-2.0
import type { Fn } from "@thi.ng/api";
import { NO_OP } from "@thi.ng/api/api";
import type { IReducible, Reducer, TxLike } from "./api.js";
import { transduce } from "./transduce.js";

const NO_OP_REDUCER: Reducer<any, void> = [NO_OP, NO_OP, NO_OP];

/**
 * Transforms `src` with given transducer `tx` and optional side-effect `fx`
 * without any reduction step. If `fx` is given it will be called with every
 * value produced by the transducer. If `fx` is *not* given, the transducer is
 * assumed to include at least one {@link sideEffect} step itself. Returns
 * nothing.
 *
 * @param tx -
 * @param src -
 */
export function run<A>(tx: TxLike<A, any>, src: Iterable<A>): void;
export function run<A>(tx: TxLike<A, any>, src: IReducible<A, any>): void;
export function run<A, B>(
	tx: TxLike<A, B>,
	fx: Fn<B, void>,
	src: Iterable<A>
): void;
export function run<A, B>(
	tx: TxLike<A, B>,
	fx: Fn<B, void>,
	src: IReducible<A, any>
): void;
export function run<A, B>(tx: TxLike<A, B>, ...args: any[]) {
	if (args.length === 1) {
		transduce(tx, NO_OP_REDUCER, args[0]);
	} else {
		const fx: Fn<B, void> = args[0];
		transduce(tx, [NO_OP, NO_OP, (_, x) => fx(x)], args[1]);
	}
}
