import { Transducer } from "../api";
import { delayed as _delayed } from "@thi.ng/compose";
import { map } from "./map";

/**
 * Yields transducer which wraps incoming values in promises, which each
 * resolve after specified delay time (in ms).
 *
 * **Only to be used in async contexts and NOT with `transduce`
 * directly.**
 *
 * @param t
 */
export const delayed = <T>(t: number): Transducer<T, Promise<T>> =>
    map((x) => _delayed(x, t));
