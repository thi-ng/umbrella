import type { Fn, FnO, Path } from "@thi.ng/api";
import { getInUnsafe } from "@thi.ng/paths/get-in";
import { defSetterUnsafe } from "@thi.ng/paths/setter";
import { defUpdaterUnsafe } from "@thi.ng/paths/updater";
import {
	Event,
	FX_CANCEL,
	FX_DISPATCH,
	FX_DISPATCH_NOW,
	FX_STATE,
	InterceptorFn,
	InterceptorPredicate,
} from "./api.js";

/**
 * Debug interceptor to log the current event to the console.
 */
export const trace: InterceptorFn = (_, e) => console.log("event:", e);

/**
 * Higher-order interceptor. Returns interceptor which unpacks payload
 * from event and assigns it as is to given side effect ID. Assigns
 * `true` to side effect if event has no payload.
 *
 * @param fxID - side effect ID
 */
export const forwardSideFx =
	(fxID: string): InterceptorFn =>
	(_, [__, body]) => ({ [fxID]: body !== undefined ? body : true });

/**
 * Higher-order interceptor. Returns interceptor which assigns given
 * event to `FX_DISPATCH` side effect.
 *
 * @param event -
 */
export const dispatch =
	(event: Event): InterceptorFn =>
	() => ({
		[FX_DISPATCH]: event,
	});

/**
 * Higher-order interceptor. Returns interceptor which assigns given
 * event to `FX_DISPATCH_NOW` side effect.
 *
 * @param event -
 */
export const dispatchNow =
	(event: Event): InterceptorFn =>
	() => ({
		[FX_DISPATCH_NOW]: event,
	});

/**
 * Higher-order interceptor. Returns interceptor which calls
 * `ctx[id].record()`, where `ctx` is the currently active
 * {@link InterceptorContext} passed to all event handlers and `ctx[id]`
 * is assumed to be a {@link @thi.ng/atom#History} instance, passed to
 * {@link EventBus.processQueue}. The default ID for the history
 * instance is `"history"`.
 *
 * Example usage:
 *
 * @example
 * ```ts
 * state = new Atom({});
 * history = new History(state);
 * bus = new EventBus(state);
 * // register event handler
 * // each time the `foo` event is triggered, a snapshot of
 * // current app state is recorded first
 * bus.addHandlers({
 *  foo: [snapshot(), valueSetter("foo")]
 * });
 * ...
 * // trigger event
 * bus.dispatch(["foo", 23]);
 *
 * // pass history instance via interceptor context to handlers
 * bus.processQueue({ history });
 * ```
 *
 * @param id -
 */
export const snapshot =
	(id = "history"): InterceptorFn =>
	(_, __, ___, ctx) =>
		ctx[id].record();

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
 * @param pred - predicate applied to given state & event
 * @param err - interceptor triggered on predicate failure
 */
export const ensurePred =
	(pred: InterceptorPredicate, err?: InterceptorFn): InterceptorFn =>
	(state, e, bus, ctx) =>
		!pred(state, e, bus, ctx)
			? {
					[FX_CANCEL]: true,
					...(err ? err(state, e, bus, ctx) : null),
			  }
			: undefined;

const eventPathState = (
	state: any,
	path: Fn<Event, Path> | undefined,
	e: Event
) => getInUnsafe(state, path ? path(e) : e[1]);

/**
 * Specialization of {@link ensurePred} to ensure a state value is less than
 * given max at the time when the event is being processed. The optional
 * `path` fn is used to extract or produce the path for the state value
 * to be validated. If omitted, the event's payload item is interpreted
 * as the value path.
 *
 * For example, without a provided `path` function and for an event of
 * this form: `["event-id", "foo.bar"]`, the term `"foo.bar"` would be
 * interpreted as path.
 *
 * If the event has this shape: `["event-id", ["foo.bar", 23]]`, we must
 * provide `(e) => e[1][0]` as path function to extract `"foo.bar"` from
 * the event.
 *
 * @param max -
 * @param path - path extractor
 * @param err - error interceptor
 */
export const ensureStateLessThan = (
	max: number,
	path?: Fn<Event, Path>,
	err?: InterceptorFn
) => ensurePred((state, e) => eventPathState(state, path, e) < max, err);

/**
 * Specialization of {@link ensurePred} to ensure a state value is greater
 * than given min. See {@link ensureStateLessThan} for further details.
 *
 * @param min -
 * @param path - path extractor
 * @param err - error interceptor
 */
export const ensureStateGreaterThan = (
	min: number,
	path?: Fn<Event, Path>,
	err?: InterceptorFn
) => ensurePred((state, e) => eventPathState(state, path, e) > min, err);

/**
 * Specialization of {@link ensurePred} to ensure a state value is within
 * given `min` / `max` closed interval. See {@link ensureStateLessThan} for
 * further details.
 *
 * @param min -
 * @param max -
 * @param path - path extractor
 * @param err - error interceptor
 */
export const ensureStateRange = (
	min: number,
	max: number,
	path?: Fn<Event, Path>,
	err?: InterceptorFn
) =>
	ensurePred((state, e) => {
		const x = eventPathState(state, path, e);
		return x >= min && x <= max;
	}, err);

/**
 * Specialization of {@link ensurePred} to ensure an event's payload value
 * is within given `min` / `max` closed interval. By default, assumes
 * event format like: `[event-id, value]`. However if `value` is given,
 * the provided function can be used to extract the value to be
 * validated from any event. If the value is outside the given interval,
 * triggers `FX_CANCEL` side effect and if `err` is given, the error
 * interceptor can return any number of other side effects and so be
 * used to dispatch alternative events instead.
 *
 * @param min -
 * @param max -
 * @param value - event value extractor
 * @param err - error interceptor
 */
export const ensureParamRange = (
	min: number,
	max: number,
	value?: Fn<Event, number>,
	err?: InterceptorFn
) =>
	ensurePred((_, e) => {
		const x = value ? value(e) : e[1];
		return x >= min && x <= max;
	}, err);

/**
 * Higher-order interceptor. Returns new interceptor to set state value
 * at provided path. This allows for dedicated events to set state
 * values more concisely, e.g. given this event definition:
 *
 * @example
 * ```ts
 * setFoo: valueSetter("foo.bar")
 * ```
 *
 * ...the `setFoo` event then can be triggered like so to update the
 * state value at `foo.bar`:
 *
 * @example
 * ```ts
 * bus.dispatch(["setFoo", 23])
 * ```
 *
 * @param path -
 * @param tx -
 */
export const valueSetter = <T>(path: Path, tx?: Fn<T, T>): InterceptorFn => {
	const $ = defSetterUnsafe(path);
	return (state, [_, val]) => ({ [FX_STATE]: $(state, tx ? tx(val) : val) });
};

/**
 * Higher-order interceptor. Returns new interceptor to update state
 * value at provided path with given function. This allows for dedicated
 * events to update state values more concisely, e.g. given this event
 * definition:
 *
 * @example
 * ```ts
 * incFoo: valueUpdater("foo.bar", (x, y) => x + y)
 * ```
 *
 * ...the `incFoo` event then can be triggered like so to update the
 * state value at `foo.bar` (where `1` is the extra arg provided to the
 * update fn:
 *
 * @example
 * ```ts
 * bus.dispatch(["incFoo", 1]) // results in value = value + 1
 * ```
 *
 * @param path -
 * @param fn -
 */
export const valueUpdater = <T>(path: Path, fn: FnO<T, T>): InterceptorFn => {
	const $ = defUpdaterUnsafe(path, fn);
	return (state, [_, ...args]) => ({ [FX_STATE]: $(state, ...args) });
};
