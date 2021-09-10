import { delayed as _delayed } from "@thi.ng/compose/delayed";
import type { Transducer } from "../api";
import { map } from "./map";

/**
 * Yields transducer which wraps incoming values in promises, which each
 * resolve after specified delay time (in ms).
 *
 * @remarks
 * Only to be used in async contexts and NOT with {@link (transduce:1)}
 * directly.
 *
 * @param t -
 */
export const delayed = <T>(t: number): Transducer<T, Promise<T>> =>
    map((x) => _delayed<T>(x, t));
