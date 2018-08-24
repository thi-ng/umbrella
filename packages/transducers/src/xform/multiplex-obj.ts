import { IObjectOf } from "@thi.ng/api/api";

import { Reducer, Transducer } from "../api";
import { comp } from "../func/comp";
import { $iter } from "../iterator";
import { multiplex } from "./multiplex";
import { rename } from "./rename";

/**
 * Transducer. Similar to (and building on) `multiplex()`, but takes an
 * object of transducers and produces a result object for each input.
 *
 * ```
 * [...multiplexObj(
 *   {
 *     initial: map(x => x.charAt(0)),
 *     upper:   map(x => x.toUpperCase()),
 *     length:  map(x => x.length)
 *   },
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
 * @param src
 */
export function multiplexObj<A, B>(xforms: IObjectOf<Transducer<A, any>>, rfn?: Reducer<B, [PropertyKey, any]>): Transducer<A, B>;
export function multiplexObj<A, B>(xforms: IObjectOf<Transducer<A, any>>, src: Iterable<A>): IterableIterator<B>;
export function multiplexObj<A, B>(xforms: IObjectOf<Transducer<A, any>>, rfn: Reducer<B, [PropertyKey, any]>, src: Iterable<A>): IterableIterator<B>;
export function multiplexObj(...args: any[]): any {
    const iter = $iter(multiplexObj, args);
    if (iter) {
        return iter;
    }
    const [xforms, rfn] = args;
    const ks = Object.keys(xforms);
    return comp(
        multiplex.apply(null, ks.map((k) => xforms[k])),
        rename(ks, rfn)
    );
}
