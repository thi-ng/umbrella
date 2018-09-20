import { fromIterable } from "./from/iterable";
import { Stream } from "./stream";

/**
 * Utility stream. Returns a new stream which emits a single value `x`
 * (if given) and then closes. If no arg is provided, the stream emits a
 * single `true`.
 */
export function trigger(): Stream<boolean>;
export function trigger<T>(x: T): Stream<T>;
export function trigger(x: any = true) {
    return fromIterable([x]);
}
