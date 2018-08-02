import { Transducer } from "../api";
import { juxt } from "../func/juxt";
import { step } from "../step";
import { map } from "./map";

/**
 * Yields a new transducer which applies given transducers in parallel
 * (using `juxt()` & `step()`) and produces tuples of results.
 *
 * Tip: Use `noop()` transducer for lanes which should retain the
 * original input values.
 *
 * ```
 * [...iterator(
 *   multiplex(
 *     map(x => x.charAt(0)),
 *     map(x => x.toUpperCase()),
 *     map(x => x.length)
 *   ),
 *   ["Alice", "Bob", "Charlie", "Andy"]
 * )]
 * // [ [ "A", "ALICE", 5 ], [ "B", "BOB", 3 ], [ "C", "CHARLIE", 7 ] ]
 * ```
 *
 * @param a
 */
export function multiplex<T, A>(a: Transducer<T, A>): Transducer<T, [A]>;
export function multiplex<T, A, B>(a: Transducer<T, A>, b: Transducer<T, B>): Transducer<T, [A, B]>;
export function multiplex<T, A, B, C>(a: Transducer<T, A>, b: Transducer<T, B>, c: Transducer<T, C>): Transducer<T, [A, B, C]>;
export function multiplex<T, A, B, C, D>(a: Transducer<T, A>, b: Transducer<T, B>, c: Transducer<T, C>, d: Transducer<T, D>): Transducer<T, [A, B, C, D]>;
export function multiplex<T, A, B, C, D, E>(a: Transducer<T, A>, b: Transducer<T, B>, c: Transducer<T, C>, d: Transducer<T, D>, e: Transducer<T, E>): Transducer<T, [A, B, C, D, E]>;
export function multiplex<T, A, B, C, D, E, F>(a: Transducer<T, A>, b: Transducer<T, B>, c: Transducer<T, C>, d: Transducer<T, D>, e: Transducer<T, E>, f: Transducer<T, F>): Transducer<T, [A, B, C, D, E, F]>;
export function multiplex<T, A, B, C, D, E, F, G>(a: Transducer<T, A>, b: Transducer<T, B>, c: Transducer<T, C>, d: Transducer<T, D>, e: Transducer<T, E>, f: Transducer<T, F>, g: Transducer<T, G>): Transducer<T, [A, B, C, D, E, F, G]>;
export function multiplex<T, A, B, C, D, E, F, G, H>(a: Transducer<T, A>, b: Transducer<T, B>, c: Transducer<T, C>, d: Transducer<T, D>, e: Transducer<T, E>, f: Transducer<T, F>, g: Transducer<T, G>, h: Transducer<T, H>): Transducer<T, [A, B, C, D, E, F, G, H]>;
export function multiplex(...args: any[]) {
    return map(juxt.apply(null, args.map(step)));
}
