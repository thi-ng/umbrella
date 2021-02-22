import { fromIterable } from "../from/iterable";
import { metaStream, MetaStreamOpts } from "../metastream";
import { optsWithID } from "../utils/idgen";

/**
 * Returns a subscription which ignores any intermediate inputs arriving
 * faster than given `delay` time period.
 *
 * @example
 * ```ts
 *
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
