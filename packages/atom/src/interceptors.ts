import { Event, InterceptorFn, InterceptorPredicate, FX_CANCEL, Path } from "./api";
import { getIn } from "./path";

/**
 * Debug interceptor to log the current event to the console.
 */
export function trace(_, e) {
    console.log("event:", e);
}

/**
 * Higher-order interceptor for validation purposes.
 * Takes a predicate function and an optional interceptor function,
 * which will only be called if the predicate fails for a given event.
 * By default the `FX_CANCEL` side effect is triggered if the predicate
 * failed, thus ensuring the actual event handler for the failed event
 * will not be executed anymore. However, this can be overridden using
 * the error interceptor's result, which is merged into the result of
 * this interceptor.
 *
 * Note: For this interceptor to work as expected, it needs to be provided
 * BEFORE the main handler in the interceptor list for a given event, i.e.
 *
 * ```
 * [
 *    ensurePred((state, e) => false),
 *    (state, e) => console.log("no one never calls me")
 * ]
 * ```
 *
 * @param pred predicate applied to given state & event
 * @param err interceptor triggered on predicate failure
 */
export function ensurePred(pred: InterceptorPredicate, err?: InterceptorFn): InterceptorFn {
    return (state, e, fx) => {
        if (!pred(state, e, fx)) {
            return { [FX_CANCEL]: true, ...(err ? err(state, e, fx) : null) };
        }
    };
}

/**
 * Specialization of `ensurePred()` to ensure a state value is less than given max.
 * The optional `path` fn is used to extract or produce the path for the state
 * value to be validated. If omitted, the event's payload item is interpreted as
 * the value path.
 *
 * For example, without a provided `path` function and for an event
 * of this form: `["event-id", "foo.bar"]`, the term `"foo.bar"` would be
 * interpreted as path.
 *
 * If the event has this shape: `["event-id", ["foo.bar", 23]]`, we must provide
 * `(e) => e[1][0]` as path function to extract `"foo.bar"` from the event.
 *
 * @param path path extractor
 */
export function ensureLessThan(max: number, path?: (e: Event) => Path, err?: InterceptorFn) {
    return ensurePred((state, e) => getIn(state, path ? path(e) : e[1]) < max, err);
}

/**
 * Specialization of `ensurePred()` to ensure a state value is greater than given min.
 * See `ensureLessThan()` for further details.
 *
 * @param path path extractor
 */
export function ensureGreaterThan(min: number, path?: (e: Event) => Path, err?: InterceptorFn) {
    return ensurePred((state, e) => getIn(state, path ? path(e) : e[1]) > min, err);
}
