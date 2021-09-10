import type { Fn } from "@thi.ng/api";
import { NO_OP } from "@thi.ng/api/constants";
import type { IReducible, Reducer, TxLike } from "./api";
import { transduce } from "./transduce";

const NO_OP_REDUCER: Reducer<void, any> = [NO_OP, NO_OP, NO_OP];

/**
 * Transforms `xs` with given transducer and optional side effect
 * without any reduction step. If `fx` is given it will be called with
 * every value produced by the transducer. If `fx` is *not* given, the
 * transducer is assumed to include at least one {@link sideEffect} step
 * itself. Returns nothing.
 *
 * @param tx -
 * @param fx -
 * @param xs -
 */
export function run<A>(tx: TxLike<A, any>, xs: Iterable<A>): void;
export function run<A>(tx: TxLike<A, any>, xs: IReducible<any, A>): void;
export function run<A, B>(
    tx: TxLike<A, B>,
    fx: Fn<B, void>,
    xs: Iterable<A>
): void;
export function run<A, B>(
    tx: TxLike<A, B>,
    fx: Fn<B, void>,
    xs: IReducible<any, A>
): void;
export function run<A, B>(tx: TxLike<A, B>, ...args: any[]) {
    if (args.length === 1) {
        transduce(tx, NO_OP_REDUCER, args[0]);
    } else {
        const fx: Fn<B, void> = args[0];
        transduce(tx, [NO_OP, NO_OP, (_, x) => fx(x)], args[1]);
    }
}
