import { IObjectOf } from "@thi.ng/api/api";
import { isArray } from "@thi.ng/checks/is-array";

import { Reducer, Transducer } from "../api";

/**
 * This transducer is intended for synchronization and provenance
 * tracking of possibly previously merged inputs. It partitions the
 * input into labeled tuple objects with the object keys obtained from
 * the user provided `keyfn`. A new result is only produced once values
 * from **all** given labeled sources have been consumed. Only labels
 * contained in the provided key set are allowed, others are skipped.
 * The tuples will contain the most recent consumed value from each
 * labeled input. In dataflow scenarios this can be used to ensure a
 * subsequent operation consuming these tuples has all necessary inputs,
 * regardless of the individual rates of change of each original
 * (pre-merge) input.
 *
 * ```
 * src = [
 *   ["a", 1], ["a", 2], ["d", 100], ["b", 10],
 *   ["b", 11], ["c", 0], ["a", 3]
 * ];
 * // form tuples for values only from sources "a" & "b"
 * // here the label is the first element of each input item
 * [...iterator(partitionSync(["a", "b"], (x) => x[0]), src)]
 * // [ { a: ["a", 2], b: ["b", 10] },
 * //   { b: ["b", 11], a: ["a", 3] } ]
 * ```
 *
 * In addition to the default mode of operation, i.e. waiting for new
 * values from *all* named inputs before a new tuple is produced, the
 * behavior for *all but the first tuple* can be changed to emit new
 * tuples as soon as a new value with a qualifying label has become
 * available (with other values in the tuple remaining). Compare with
 * above example:
 *
 * ```
 * // passing `false` to disable tuple reset
 * [...iterator(partitionSync(["a", "b"], (x) => x[0], false), src)]
 * // [ { a: ["a", 2], b: ["b", 10] },
 * //   { a: ["a", 2], b: ["b", 11] },
 * //   { a: ["a", 3], b: ["b", 11] } ]
 *
 * By default, the last emitted tuple is allowed to be incomplete (in
 * case the input closed). To only allow complete tuples, set the
 * optional `all` arg to false.
 *
 * Note: If the `keys` set of allowed labels is modified externally, the
 * tuple size will adjust accordingly (only if given as set, will not work
 * if keys are provided as array).
 *
 * @param keys allowed label set
 * @param keyfn label extraction function
 * @param reset true if each tuple should contain only new values
 * @param all true if last tuple is allowed to be incomplete
 */
export function partitionSync<T>(keys: PropertyKey[] | Set<PropertyKey>, keyfn: (x: T) => PropertyKey, reset = true, all = true): Transducer<T, IObjectOf<T>> {
    return ([init, complete, reduce]: Reducer<any, IObjectOf<T>>) => {
        let curr = {};
        let first = true;
        const currKeys = new Set<PropertyKey>();
        const ks = isArray(keys) ? new Set(keys) : keys;
        return [
            init,
            (acc) => {
                if ((reset && all && currKeys.size > 0) || (!reset && first)) {
                    acc = reduce(acc, curr);
                    curr = undefined;
                    currKeys.clear();
                    first = false;
                }
                return complete(acc);
            },
            (acc, x: T) => {
                const k = keyfn(x);
                if (ks.has(k)) {
                    curr[k] = x;
                    currKeys.add(k);
                    if (currKeys.size >= ks.size) {
                        acc = reduce(acc, curr);
                        first = false;
                        if (reset) {
                            curr = {};
                            currKeys.clear();
                        } else {
                            curr = { ...curr };
                        }
                    }
                }
                return acc;
            }];
    };
}