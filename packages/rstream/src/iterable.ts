import { CloseMode, CommonOpts } from "./api.js";
import { __optsWithID } from "./idgen.js";
import { stream } from "./stream.js";

export interface FromIterableOpts extends CommonOpts {
    /**
     * Time delay (in ms) between emitted values. The default value of
     * 0, means as fast as possible (but still via `setInterval`).
     *
     * @defaultValue 0
     */
    delay: number;
}

/**
 * Returns a {@link Stream} of values from provided iterable, emitted at
 * the given `delay` interval.
 *
 * @remarks
 * Asynchronously starts pulling values from source iterable when the
 * first subscriber becomes available. The values are processed &
 * emitted via `setInterval()`, using the given `delay` value (default:
 * 0). By default, once the iterable is exhausted (if finite), calls
 * {@link ISubscriber.done} to close the stream, but this can be
 * re-configured via provided {@link CommonOpts | options}.
 *
 * @param src -
 * @param opts -
 */
export const fromIterable = <T>(
    src: Iterable<T>,
    opts: Partial<FromIterableOpts> = {}
) =>
    stream<T>((stream) => {
        const iter = src[Symbol.iterator]();
        const id = setInterval(() => {
            let val: IteratorResult<T>;
            if ((val = iter.next()).done) {
                clearInterval(id);
                stream.closeIn !== CloseMode.NEVER && stream.done();
            } else {
                stream.next(val.value);
            }
        }, opts.delay || 0);
        return () => clearInterval(id);
    }, __optsWithID("iterable", opts));

/**
 * Creates a new {@link Stream} of given iterable which synchronously calls
 * `.next()` for each item of the iterable when the first (and in this
 * case the only one) subscriber becomes available. Once the iterable is
 * exhausted (MUST be finite!), then calls `.done()` by default, but can
 * be avoided by passing `false` as last argument.
 *
 * @param src -
 * @param opts -
 */
export const fromIterableSync = <T>(
    src: Iterable<T>,
    opts?: Partial<CommonOpts>
) =>
    stream<T>((stream) => {
        for (let s of src) {
            stream.next(s);
        }
        stream.closeIn !== CloseMode.NEVER && stream.done();
    }, __optsWithID("iterable-sync", opts));
