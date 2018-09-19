import { fromIterable } from "./from/iterable";
import { Stream } from "./stream";

/**
 * Utility stream. Returns a new stream which emits a single `true`
 * value and then closes.
 */
export function trigger(): Stream<boolean> {
    return fromIterable([true]);
}
