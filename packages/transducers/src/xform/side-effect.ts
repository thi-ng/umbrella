import { Transducer } from "../api";
import { map } from "./map";

/**
 * Helper transducer. Applies given `fn` to each input value, presumably
 * for side effects. Discards function's result and yields original
 * inputs.
 *
 * @param fn side effect
 */
export function sideEffect<T>(fn: (x: T) => void): Transducer<T, T> {
    return map((x) => (fn(x), x));
}
