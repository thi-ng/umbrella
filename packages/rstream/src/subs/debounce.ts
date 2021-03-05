import { fromIterable } from "../from/iterable";
import { metaStream, MetaStreamOpts } from "../metastream";
import { optsWithID } from "../utils/idgen";

/**
 * Returns a subscription which buffers any intermediate inputs arriving faster
 * than given `delay` time period, then emits last received value after `delay`
 * milliseconds.
 *
 * @example
 * ```ts
 * const src = fromIterable([1, 2, 3], { delay: 10 })
 * src.subscribe(debounce(20)).subscribe({ next: console.log });
 * // 3
 * ```
 *
 * @param delay
 */
export const debounce = <T>(delay: number, opts?: Partial<MetaStreamOpts>) =>
    metaStream(
        (x: T) => fromIterable([x], { delay }),
        optsWithID("debounce", {
            emitLast: true,
            ...opts,
        })
    );
