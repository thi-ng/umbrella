import { Transducer } from "./api";
import { transduce } from "./transduce";

const nop = () => { };

/**
 * Transforms `xs` with given transducer and optional side effect
 * without any reduction step. If `fx` is given it will be called with
 * every value produced by the transducer. If `fx` is *not* given, the
 * transducer is assumed to include at least one `sideEffect()` step
 * itself. Returns nothing.
 *
 * @param tx
 * @param fx
 * @param xs
 */
export function run<A, B>(tx: Transducer<A, B>, xs: Iterable<A>): void;
export function run<A, B>(tx: Transducer<A, B>, fx: (x: B) => void, xs: Iterable<A>): void;
export function run<A, B>(tx: Transducer<A, B>, ...args: any[]) {
    if (args.length === 1) {
        transduce(tx, [nop, nop, nop], args[0]);
    } else {
        const fx = args[0];
        transduce(tx, [nop, nop, (_, x) => fx(x)], args[1]);
    }
}
