import { Path, getIn, setIn, updateIn } from "@thi.ng/paths";

import { FX_CANCEL, FX_STATE, Event, InterceptorFn, InterceptorPredicate } from "./api";

/**
 * Debug interceptor to log the current event to the console.
 */
export function trace(_, e) {
    console.log("event:", e);
}

/**
 * Higher-order interceptor. Return interceptor which unpacks payload
 * from event and assigns it as is to given side effect ID.
 *
 * @param id side effect ID
 */
export function forwardSideFx(id: string) {
    return (_, [__, body]) => ({ [id]: body });
}

/**
 * Higher-order interceptor for validation purposes. Takes a predicate
 * function and an optional interceptor function, which will only be
 * called if the predicate fails for a given event. By default the
 * `FX_CANCEL` side effect is triggered if the predicate failed, thus
 * ensuring the actual event handler for the failed event will not be
 * executed anymore. However, this can be overridden using the error
 * interceptor's result, which is merged into the result of this
 * interceptor.
 *
 * The error interceptor can return any number of other side effects and
 * so be used to dispatch alternative events instead, for example:
 *
 * ```
 * // this interceptor will cause cancellation of current event
 * // and trigger an "error" event instead
 * ensurePred(
 *   // a dummy predicate which always fails
 *   () => false
 *   // error interceptor fn
 *   () => ({[FX_DISPATCH_NOW]: ["error", "reason"]})
 * )
 * ```
 *
 * Note: For this interceptor to work as expected, it needs to be
 * provided BEFORE the main handler in the interceptor list for a given
 * event, i.e.
 *
 * ```
 * [
 *    ensurePred((state, e) => false),
 *    // actual event handler
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
 * Specialization of `ensurePred()` to ensure a state value is less than
 * given max at the time when the event is being processed. The optional
 * `path` fnis used to extract or produce the path for the state value to
 * be validated. If omitted, the event's payload item is interpreted as
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
 * Specialization of `ensurePred()` to ensure a state value is greater than
 * given min. See `ensureLessThan()` for further details.
 *
 * @param path path extractor
 */
export function ensureGreaterThan(min: number, path?: (e: Event) => Path, err?: InterceptorFn) {
    return ensurePred((state, e) => getIn(state, path ? path(e) : e[1]) > min, err);
}

/**
 * Higher-order interceptor. Returns new interceptor to set state value
 * at provided path. This allows for dedicated events to set state
 * values more concisely, e.g. given this event definition:
 *
 * ```
 * setFoo: valueSetter("foo.bar")
 * ```
 *
 * ...the `setFoo` event then can be triggered like so to update the
 * state value at `foo.bar`:
 *
 * ```
 * bus.dispatch(["setFoo", 23])
 * ```
 *
 * @param path
 * @param tx
 */
export function valueSetter<T>(path: Path, tx?: (x: T) => T): InterceptorFn {
    return (state, [_, val]) => ({ [FX_STATE]: setIn(state, path, tx ? tx(val) : val) });
}

/**
 * Higher-order interceptor. Returns new interceptor to update state
 * value at provided path with given function. This allows for dedicated
 * events to update state values more concisely, e.g. given this event
 * definition:
 *
 * ```
 * incFoo: valueUpdater("foo.bar", (x, y) => x + y)
 * ```
 *
 * ...the `incFoo` event then can be triggered like so to update the
 * state value at `foo.bar` (where `1` is the extra arg provided to the
 * update fn:
 *
 * ```
 * bus.dispatch(["incFoo", 1]) // results in value = value + 1
 * ```
 *
 * @param path
 * @param fn
 */
export function valueUpdater<T>(path: Path, fn: (x: T, ...args: any[]) => T): InterceptorFn {
    return (state, [_, ...args]) => ({ [FX_STATE]: updateIn(state, path, fn, ...args) });
}
