import { Stream } from "../stream";
import { Subscription } from "../subscription";

/**
 * Creates a new `Stream` of given iterable which asynchronously calls
 * `.next()` for each item of the iterable when the first (and in this
 * case the only one) subscriber becomes available. The values are
 * processed via `setInterval()` using the given `delay` value (default:
 * 0). Once the iterable is exhausted (if finite), then calls `.done()`
 * by default, but can be avoided by passing `false` as last argument.
 *
 * @param src
 * @param delay
 * @param close
 */
export function fromIterable<T>(src: Iterable<T>, delay = 0, close = true) {
    return new Stream<T>(
        (stream) => {
            const iter = src[Symbol.iterator]();
            const id = setInterval(() => {
                let val: IteratorResult<T>;
                if ((val = iter.next()).done) {
                    clearInterval(id);
                    close && stream.done();
                } else {
                    stream.next(val.value);
                }
            }, delay);
            return () => clearInterval(id);
        },
        `iterable-${Subscription.NEXT_ID++}`
    );
}

/**
 * Creates a new `Stream` of given iterable which synchronously calls
 * `.next()` for each item of the iterable when the first (and in this
 * case the only one) subscriber becomes available. Once the iterable is
 * exhausted (MUST be finite!), then calls `.done()` by default, but can
 * be avoided by passing `false` as last argument.
 *
 * @param src
 * @param close
 */
export function fromIterableSync<T>(src: Iterable<T>, close = true) {
    return new Stream<T>(
        (stream) => {
            for (let s of src) {
                stream.next(s);
            }
            close && stream.done();
            return null;
        },
        `iterable-${Subscription.NEXT_ID++}`
    );
}
