import { Transducer } from "../api";
import { delay } from "../func/delay";
import { map } from "./map";

/**
 * Yields transducer which wraps incoming values in promises, which
 * resolve after specified delay time (in ms).
 *
 * **Only to be used in async contexts and NOT with `transduce`
 * directly.**
 *
 * @param t
 */
export function delayed<T>(t: number): Transducer<T, Promise<T>> {
    return map((x) => delay(x, t));
}
