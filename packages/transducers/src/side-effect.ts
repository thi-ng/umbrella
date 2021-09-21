import type { Fn } from "@thi.ng/api";
import type { Transducer } from "./api";
import { map } from "./map";

/**
 * Helper transducer. Applies given `fn` to each input value, presumably
 * for side effects. Discards function's result and yields original
 * inputs.
 *
 * @param fn - side effect
 */
export const sideEffect = <T>(fn: Fn<T, void>): Transducer<T, T> =>
    map((x) => (fn(x), x));
