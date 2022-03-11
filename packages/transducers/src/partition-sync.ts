import type { Fn, IObjectOf } from "@thi.ng/api";
import { isArray } from "@thi.ng/checks/is-array";
import { identity } from "@thi.ng/compose/identity";
import { illegalState } from "@thi.ng/errors/illegal-state";
import type { Reducer, Transducer } from "./api.js";
import { __iter, iterator } from "./iterator.js";
import { isReduced } from "./reduced.js";

export interface PartitionSync<T> extends Transducer<T, IObjectOf<T>> {
    /**
     * Returns set of currently required input IDs.
     */
    keys(): Set<PropertyKey>;
    /**
     * Removes all inputs and clears received values.
     */
    clear(): void;
    /**
     * Adds `id` to set of required inputs.
     *
     * @param id - 
     */
    add(id: PropertyKey): void;
    /**
     * Removes `id` from required inputs. If `clean` is true (default),
     * also removes any previously received value(s) for that input in
     * the result tuple.
     *
     * @param id - 
     * @param clean - 
     */
    delete(id: PropertyKey, clean?: boolean): void;
}

export interface PartitionSyncOpts<T> {
    key: Fn<T, PropertyKey>;
    mergeOnly: boolean;
    reset: boolean;
    all: boolean;
    /**
     * If greater than 0, then each labeled input will cache upto the
     * stated number of input values, even if other inputs have not yet
     * produced new values. Once the limit is reached, `partitionSync()`
     * will throw an `IllegalState` error.
     *
     * Enabling this option will cause the same behavior as if `reset`
     * is enabled (regardless of the actual configured `reset` setting).
     * I.e. new results are only produced when ALL required inputs have
     * available values...
     */
    backPressure: number;
}

/**
 * Transducer intended for synchronization and provenance tracking of
 * possibly previously merged inputs. Partitions the input into labeled
 * tuple objects with the object keys obtained from the user provided
 * `keyfn` (which is applied to each input value).
 *
 * @remarks
 * By default, a new result is only produced once values from **all**
 * given labeled sources have been received. Only labels contained in
 * the provided key set are used, others are skipped. The result tuples
 * will contain the most recent consumed value from each labeled input.
 * In dataflow scenarios this can be used to ensure a subsequent
 * operation consuming these tuples has all necessary inputs, regardless
 * of the individual rates of change of each original (pre-merge) input.
 *
 * If the `mergeOnly` option is set to true (default: false), **no**
 * synchronization (waiting) of inputs is applied and potentially
 * partially populated tuple objects will be emitted for each received
 * input value, however as with the default behavior, tuples will retain
 * the most recent consumed value from other inputs.
 *
 * Required keys (input ID labels) can be dynamically added or removed
 * via `.add(id)` or `.delete(id)` on the returned transducer.
 *
 * @example
 * ```ts
 * src = [
 *   ["a", 1], ["a", 2], ["d", 100], ["b", 10],
 *   ["b", 11], ["c", 0], ["a", 3]
 * ];
 *
 * // form tuples for values only from sources "a" & "b"
 * // here the label is the first element of each input item
 * [...partitionSync(["a", "b"], { key: (x) => x[0] }, src)]
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
 * ```ts
 * // passing `false` to disable tuple reset
 * [...partitionSync(
 *   ["a", "b"],
 *   {
 *     key: (x) => x[0],
 *     reset: false
 *   },
 *   src
 * )]
 * // [ { a: ["a", 2], b: ["b", 10] },
 * //   { a: ["a", 2], b: ["b", 11] },
 * //   { a: ["a", 3], b: ["b", 11] } ]
 * ```
 *
 * By default, the last emitted tuple is allowed to be incomplete (in
 * case the input closed). To only allow complete tuples, set the
 * optional `all` arg to false.
 *
 * @param keys - allowed label set
 * @param keyfn - label extraction function
 * @param reset - true if each tuple should contain only new values
 * @param all - true if last tuple is allowed to be incomplete
 */
// prettier-ignore
export function partitionSync<T>(keys: PropertyKey[] | Set<PropertyKey>, opts?: Partial<PartitionSyncOpts<T>>): PartitionSync<T>;
// prettier-ignore
export function partitionSync<T>(keys: PropertyKey[] | Set<PropertyKey>, src: Iterable<T>): IterableIterator<IObjectOf<T>>;
// prettier-ignore
export function partitionSync<T>(keys: PropertyKey[] | Set<PropertyKey>, opts: Partial<PartitionSyncOpts<T>>, src: Iterable<T>): IterableIterator<IObjectOf<T>>;
export function partitionSync<T>(...args: any[]): any {
    const iter = __iter(partitionSync, args, iterator);
    if (iter) return iter;

    const { key, mergeOnly, reset, all, backPressure } = <PartitionSyncOpts<T>>{
        key: <any>identity,
        mergeOnly: false,
        reset: true,
        all: true,
        backPressure: 0,
        ...args[1],
    };
    const requiredKeys: Set<PropertyKey> = isArray(args[0])
        ? new Set(args[0])
        : args[0];
    const currKeys = new Set<PropertyKey>();
    const cache: Map<PropertyKey, T[]> = new Map();
    let curr: IObjectOf<T> = {};

    const xform = ([init, complete, reduce]: Reducer<any, IObjectOf<T>>) => {
        let first = true;
        if (mergeOnly || backPressure < 1) {
            return <Reducer<any, T>>[
                init,
                (acc) => {
                    if (
                        (reset && all && currKeys.size > 0) ||
                        (!reset && first)
                    ) {
                        acc = reduce(acc, curr);
                        curr = {};
                        currKeys.clear();
                        first = false;
                    }
                    return complete(acc);
                },
                (acc, x) => {
                    const k = key(x);
                    if (requiredKeys.has(k)) {
                        curr[<any>k] = x;
                        currKeys.add(k);
                        if (
                            mergeOnly ||
                            requiredInputs(requiredKeys, currKeys)
                        ) {
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
                },
            ];
        } else {
            // with backpressure / caching...
            return <Reducer<any, T>>[
                init,
                (acc) => {
                    if (all && currKeys.size > 0) {
                        acc = reduce(acc, collect(cache, currKeys));
                        cache.clear();
                        currKeys.clear();
                    }
                    return complete(acc);
                },
                (acc, x) => {
                    const k = key(x);
                    if (requiredKeys.has(k)) {
                        let slot = cache.get(k);
                        !slot && cache.set(k, (slot = []));
                        slot.length >= backPressure &&
                            illegalState(
                                `max back pressure (${backPressure}) exceeded for input: ${String(
                                    k
                                )}`
                            );
                        slot.push(x);
                        currKeys.add(k);
                        while (requiredInputs(requiredKeys, currKeys)) {
                            acc = reduce(acc, collect(cache, currKeys));
                            first = false;
                            if (isReduced(acc)) break;
                        }
                    }
                    return acc;
                },
            ];
        }
    };
    xform.keys = () => requiredKeys;
    xform.clear = () => {
        cache.clear();
        requiredKeys.clear();
        currKeys.clear();
        curr = {};
    };
    xform.add = (id: PropertyKey) => {
        requiredKeys.add(id);
    };
    xform.delete = (id: PropertyKey, clean = true) => {
        cache.delete(id);
        requiredKeys.delete(id);
        if (clean) {
            currKeys.delete(id);
            delete curr[<any>id];
        }
    };
    return xform;
}

const requiredInputs = (required: Set<PropertyKey>, curr: Set<PropertyKey>) => {
    if (curr.size < required.size) return false;
    for (let id of required) {
        if (!curr.has(id)) return false;
    }
    return true;
};

const collect = <T>(
    cache: Map<PropertyKey, T[]>,
    currKeys: Set<PropertyKey>
) => {
    const curr: IObjectOf<T> = {};
    for (let id of currKeys) {
        const slot = cache.get(id)!;
        curr[<any>id] = slot.shift()!;
        !slot.length && currKeys.delete(id);
    }
    return curr;
};
