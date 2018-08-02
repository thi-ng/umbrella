import { IObjectOf } from "@thi.ng/api/api";

import { Reducer, Transducer } from "../api";
import { comp } from "../func/comp";
import { multiplex } from "./multiplex";
import { rename } from "./rename";

/**
 * Transducer. Similar to (and building on) `multiplex()`, but takes an
 * object of transducers and produces a result object for each input.
 *
 * ```
 * [...iterator(
 *   multiplexObj({
 *     initial: map(x => x.charAt(0)),
 *     upper:   map(x => x.toUpperCase()),
 *     length:  map(x => x.length)
 *   }),
 *   ["Alice", "Bob", "Charlie", "Andy"]
 * )]
 * // [ { length: 5, upper: 'ALICE', initial: 'A' },
 * //   { length: 3, upper: 'BOB', initial: 'B' },
 * //   { length: 7, upper: 'CHARLIE', initial: 'C' },
 * //   { length: 4, upper: 'ANDY', initial: 'A' } ]
 * ```
 *
 * @param xforms object of transducers
 * @param rfn
 */
export function multiplexObj<A, B>(xforms: IObjectOf<Transducer<A, any>>, rfn?: Reducer<B, [PropertyKey, any]>): Transducer<A, B> {
    const ks = Object.keys(xforms);
    return comp(
        multiplex.apply(null, ks.map((k) => xforms[k])),
        rename(ks, rfn)
    );
}
