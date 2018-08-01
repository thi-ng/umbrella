import { IDeref, IObjectOf } from "@thi.ng/api/api";
import { IAtom } from "@thi.ng/atom/api";
import { Atom } from "@thi.ng/atom/atom";
import { implementsFunction } from "@thi.ng/checks/implements-function";
import { isArray } from "@thi.ng/checks/is-array";
import { isFunction } from "@thi.ng/checks/is-function";
import { isPromise } from "@thi.ng/checks/is-promise";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { setIn, updateIn } from "@thi.ng/paths";

import * as api from "./api";

const FX_CANCEL = api.FX_CANCEL;
const FX_DISPATCH_NOW = api.FX_DISPATCH_NOW;
const FX_STATE = api.FX_STATE;

/**
 * Batched event processor for using composable interceptors for event
 * handling and side effects to execute the result of handled events.
 *
 * Events processed by this class are simple 2-element tuples/arrays of
 * this form: `["event-id", payload?]`, where the `payload` is optional
 * and can be of any type.
 *
 * Events are processed by registered handlers which transform each
 * event into a number of side effect descriptions to be executed later.
 * This separation ensures event handlers themselves are pure functions
 * and leads to more efficient reuse of side effecting operations. The
 * pure data nature until the last stage of processing (the application
 * side effects) too means that event flow can be much easier inspected
 * and debugged.
 *
 * In this model a single event handler itself is an array of objects
 * with `pre` and/or `post` keys and functions attached to each key.
 * These functions are called interceptors, since each intercepts the
 * processing of an event and can contribute their own side effects.
 * Each event's interceptor chain is processed bi-directionally (`pre`
 * in forward, `post` in reverse order) and the effects returned from
 * each interceptor are merged/collected. The outcome of this setup is a
 * more aspect-oriented, composable approach to event handling and
 * allows to inject common, re-usable behaviors for multiple event types
 * (logging, validation, undo/redo triggers etc.).
 *
 * Side effects are only processed after all event handlers have run.
 * Furthermore, their order of execution can be configured with optional
 * priorities.
 *
 * See for further details:
 *
 * - `processQueue()`
 * - `processEvent()`
 * - `processEffects()`
 * - `mergeEffects()`
 *
 * The overall approach of this type of event processing is heavily
 * based on the pattern initially pioneered by @Day8/re-frame, with the
 * following differences:
 *
 * - stateless (see `EventBus` for the more common stateful alternative)
 * - standalone implementation (no assumptions about surrounding
 *   context/framework)
 * - manual control over event queue processing
 * - supports event cancellation (via FX_CANCEL side effect)
 * - side effect collection (multiple side effects for same effect type
 *   per frame)
 * - side effect priorities (to control execution order)
 * - dynamic addition/removal of handlers & effects
 */
export class StatelessEventBus implements
    api.IDispatch {

    state: any;

    protected eventQueue: api.Event[];
    protected currQueue: api.Event[];
    protected currCtx: api.InterceptorContext;

    protected handlers: IObjectOf<api.Interceptor[]>;
    protected effects: IObjectOf<api.SideEffect>;
    protected priorities: api.EffectPriority[];

    /**
     * Creates a new event bus instance with given handler and effect
     * definitions (all optional).
     *
     * In addition to the user provided handlers & effects, a number of
     * built-ins are added automatically. See `addBuiltIns()`. User
     * handlers can override built-ins.
     *
     * @param handlers
     * @param effects
     */
    constructor(handlers?: IObjectOf<api.EventDef>, effects?: IObjectOf<api.EffectDef>) {
        this.handlers = {};
        this.effects = {};
        this.eventQueue = [];
        this.priorities = [];
        this.addBuiltIns();
        if (handlers) {
            this.addHandlers(handlers);
        }
        if (effects) {
            this.addEffects(effects);
        }
    }

    /**
     * Adds built-in event & side effect handlers. Also see additional
     * built-ins defined by the stateful `EventBus` extension of this
     * class, as well as comments for these class methods:
     *
     * - `mergeEffects()`
     * - `processEvent()`
     *
     * ### Handlers
     *
     * currently none...
     *
     * ### Side effects
     *
     * #### `FX_CANCEL`
     *
     * If assigned `true`, cancels processing of current event, though
     * still applies any side effects already accumulated.
     *
     * #### `FX_DISPATCH`
     *
     * Dispatches assigned events to be processed in next frame.
     *
     * #### `FX_DISPATCH_ASYNC`
     *
     * Async wrapper for promise based side effects.
     *
     * #### `FX_DISPATCH_NOW`
     *
     * Dispatches assigned events as part of currently processed event
     * queue (no delay).
     *
     * #### `FX_DELAY`
     *
     * Async side effect. Only to be used in conjunction with
     * `FX_DISPATCH_ASYNC`. Triggers given event after `x` milliseconds.
     *
     * ```
     * // this triggers `[EV_SUCCESS, "ok"]` event after 1000 ms
     * { [FX_DISPATCH_ASYNC]: [FX_DELAY, [1000, "ok"], EV_SUCCESS, EV_ERROR] }
     * ```
     *
     * #### `FX_FETCH`
     *
     * Async side effect. Only to be used in conjunction with
     * `FX_DISPATCH_ASYNC`. Performs `fetch()` HTTP request and triggers
     * success with received response, or if there was an error with
     * response's `statusText`. The error event is only triggered if the
     * fetched response's `ok` field is non-truthy.
     *
     * - https://developer.mozilla.org/en-US/docs/Web/API/Response/ok
     * - https://developer.mozilla.org/en-US/docs/Web/API/Response/statusText
     *
     * ```
     * // fetches "foo.json" and then dispatches EV_SUCCESS or EV_ERROR event
     * { [FX_DISPATCH_ASYNC]: [FX_FETCH, "foo.json", EV_SUCCESS, EV_ERROR] }
     * ```
     */
    addBuiltIns(): any {
        this.addEffects({

            [api.FX_DISPATCH]:
                [(e) => this.dispatch(e), -999],

            [api.FX_DISPATCH_ASYNC]:
                [([id, arg, success, err]) => {
                    const fx = this.effects[id];
                    if (fx) {
                        const p = fx(arg, this);
                        if (isPromise(p)) {
                            p.then((res) => this.dispatch([success, res]))
                                .catch((e) => this.dispatch([err, e]));
                        } else {
                            console.warn("async effect did not return Promise");
                        }
                    } else {
                        console.warn(`skipping invalid async effect: ${id}`);
                    }
                }, -999],

            [api.FX_DELAY]:
                [([x, body]) => new Promise((res) => setTimeout(() => res(body), x)),
                    1000],

            [api.FX_FETCH]:
                [(req) =>
                    fetch(req).then((resp) => {
                        if (!resp.ok) {
                            throw new Error(resp.statusText);
                        }
                        return resp;
                    }), 1000]
        });
    }

    addHandler(id: string, spec: api.EventDef) {
        const iceps = isArray(spec) ?
            (<any>spec).map(asInterceptor) :
            isFunction(spec) ? [{ pre: spec }] : [spec];
        if (iceps.length > 0) {
            if (this.handlers[id]) {
                this.removeHandler(id);
                console.warn(`overriding handler for ID: ${id}`);
            }
            this.handlers[id] = iceps;
        } else {
            illegalArgs(`no handlers in spec for ID: ${id}`);
        }
    }

    addHandlers(specs: IObjectOf<api.EventDef>) {
        for (let id in specs) {
            this.addHandler(id, specs[id]);
        }
    }

    addEffect(id: string, fx: api.SideEffect, priority = 1) {
        if (this.effects[id]) {
            this.removeEffect(id);
            console.warn(`overriding effect for ID: ${id}`);
        }
        this.effects[id] = fx;
        const p: api.EffectPriority = [id, priority];
        const priors = this.priorities;
        for (let i = 0; i < priors.length; i++) {
            if (p[1] < priors[i][1]) {
                priors.splice(i, 0, p);
                return;
            }
        }
        priors.push(p);
    }

    addEffects(specs: IObjectOf<api.EffectDef>) {
        for (let id in specs) {
            const fx = specs[id];
            if (isArray(fx)) {
                this.addEffect(id, fx[0], fx[1]);
            } else {
                this.addEffect(id, fx);
            }
        }
    }

    /**
     * Prepends given interceptors (or interceptor functions) to
     * selected handlers. If no handler IDs are given, applies
     * instrumentation to all currently registered handlers.
     *
     * @param inject
     * @param ids
     */
    instrumentWith(inject: (api.Interceptor | api.InterceptorFn)[], ids?: string[]) {
        const iceps = inject.map(asInterceptor);
        const handlers = this.handlers;
        for (let id of ids || Object.keys(handlers)) {
            const h = handlers[id];
            if (h) {
                handlers[id] = iceps.concat(h);
            }
        }
    }

    removeHandler(id: string) {
        delete this.handlers[id];
    }

    removeHandlers(ids: string[]) {
        for (let id of ids) {
            this.removeHandler(id);
        }
    }

    removeEffect(id: string) {
        delete this.effects[id];
        const p = this.priorities;
        for (let i = p.length - 1; i >= 0; i--) {
            if (id === p[i][0]) {
                p.splice(i, 1);
                return;
            }
        }
    }

    removeEffects(ids: string[]) {
        for (let id of ids) {
            this.removeEffect(id);
        }
    }

    /**
     * If called during event processing, returns current side effect
     * accumulator / interceptor context. Otherwise returns nothing.
     */
    context() {
        return this.currCtx;
    }

    /**
     * Adds given events to event queue to be processed by
     * `processQueue()` later on. It's the user's responsibility to call
     * that latter function repeatedly in a timely manner, preferably
     * via `requestAnimationFrame()` or similar.
     *
     * @param e
     */
    dispatch(...e: api.Event[]) {
        this.eventQueue.push(...e);
    }

    /**
     * Adds given events to whatever is the current event queue. If
     * triggered via the `FX_DISPATCH_NOW` side effect from an event
     * handler / interceptor, the event will still be executed in the
     * currently active batch / frame. If called from elsewhere, the
     * result is the same as calling `dispatch()`.
     *
     * @param e
     */
    dispatchNow(...e: api.Event[]) {
        (this.currQueue || this.eventQueue).push(...e);
    }

    /**
     * Dispatches given event after `delay` milliseconds (by default
     * 17). Note: Since events are only processed by calling
     * `processQueue()`, it's the user's responsibility to call that
     * latter function repeatedly in a timely manner, preferably via
     * `requestAnimationFrame()` or similar.
     *
     * @param e
     * @param delay
     */
    dispatchLater(e: api.Event, delay = 17) {
        setTimeout(() => this.dispatch(e), delay);
    }

    /**
     * Triggers processing of current event queue and returns `true` if
     * any events have been processed.
     *
     * If an event handler triggers the `FX_DISPATCH_NOW` side effect,
     * the new event will be added to the currently processed batch and
     * therefore executed in the same frame. Also see `dispatchNow()`.
     *
     * An optional `ctx` (context) object can be provided, which is used
     * to collect any side effect definitions during processing. This
     * can be useful for debugging, inspection or post-processing
     * purposes.
     *
     * @param ctx
     */
    processQueue(ctx?: api.InterceptorContext) {
        if (this.eventQueue.length > 0) {
            this.currQueue = [...this.eventQueue];
            this.eventQueue.length = 0;
            ctx = this.currCtx = ctx || {};
            for (let e of this.currQueue) {
                this.processEvent(ctx, e);
            }
            this.currQueue = this.currCtx = undefined;
            this.processEffects(ctx);
            return true;
        }
        return false;
    }

    /**
     * Processes a single event using its configured handler/interceptor
     * chain. Logs warning message and skips processing if no handler is
     * available for the event type.
     *
     * The array of interceptors is processed in bi-directional order.
     * First any `pre` interceptors are processed in forward order. Then
     * `post` interceptors are processed in reverse.
     *
     * Each interceptor can return a result object of side effects,
     * which are being merged and collected for `processEffects()`.
     *
     * Any interceptor can trigger zero or more known side effects, each
     * (side effect) will be collected in an array to support multiple
     * invocations of the same effect type per frame. If no side effects
     * are requested, an interceptor can return `undefined`.
     *
     * Processing of the current event stops immediately, if an
     * interceptor sets the `FX_CANCEL` side effect key to `true`.
     * However, the results of any previous interceptors (incl. the one
     * which cancelled) are kept and processed further as usual.
     *
     * @param ctx
     * @param e
     */
    protected processEvent(ctx: api.InterceptorContext, e: api.Event) {
        const iceps = this.handlers[<any>e[0]];
        if (!iceps) {
            console.warn(`missing handler for event type: ${e[0].toString()}`);
            return;
        }
        const n = iceps.length - 1;
        let hasPost = false;
        for (let i = 0; i <= n && !ctx[FX_CANCEL]; i++) {
            const icep = iceps[i];
            if (icep.pre) {
                this.mergeEffects(ctx, icep.pre(ctx[FX_STATE], e, this, ctx));
            }
            hasPost = hasPost || !!icep.post;
        }
        if (!hasPost) {
            return;
        }
        for (let i = n; i >= 0 && !ctx[FX_CANCEL]; i--) {
            const icep = iceps[i];
            if (icep.post) {
                this.mergeEffects(ctx, icep.post(ctx[FX_STATE], e, this, ctx));
            }
        }
    }

    /**
     * Takes a collection of side effects generated during event
     * processing and applies them in order of configured priorities.
     *
     * @param ctx
     */
    protected processEffects(ctx: api.InterceptorContext) {
        const effects = this.effects;
        for (let p of this.priorities) {
            const id = p[0];
            const val = ctx[id];
            if (val !== undefined) {
                const fn = effects[id];
                if (id !== FX_STATE) {
                    for (let v of val) {
                        fn(v, this, ctx);
                    }
                } else {
                    fn(val, this, ctx);
                }
            }
        }
    }

    /**
     * Merges the new side effects returned from an interceptor into the
     * internal effect accumulator.
     *
     * Any events assigned to the `FX_DISPATCH_NOW` effect key are
     * immediately added to the currently active event batch.
     *
     * If an interceptor wishes to cause multiple invocations of a
     * single side effect type (e.g. dispatch multiple other events), it
     * MUST return an array of these values. The only exceptions to this
     * are the following effects, which for obvious reasons can only
     * accept a single value.
     *
     * **Note:** the `FX_STATE` effect is not actually defined by this
     * class here, but is supported to avoid code duplication in
     * `StatefulEventBus`.
     *
     * - `FX_CANCEL`
     * - `FX_STATE`
     *
     * Because of this support (multiple values), the value of a single
     * side effect MUST NOT be a nested array itself, or rather its
     * first item can't be an array.
     *
     * For example:
     *
     * ```
     * // interceptor result map to dispatch a single event
     * { [FX_DISPATCH]: ["foo", "bar"]}
     *
     * // result map format to dispatch multiple events
     * { [FX_DISPATCH]: [ ["foo", "bar"], ["baz", "beep"] ]}
     * ```
     *
     * Any `null` / `undefined` values directly assigned to a side
     * effect are ignored and will not trigger the effect.
     *
     * @param fx
     * @param ret
     */
    protected mergeEffects(ctx: api.InterceptorContext, ret: any) {
        if (!ret) {
            return;
        }
        for (let k in ret) {
            const v = ret[k];
            if (v == null) {
                continue;
            }
            if (k === FX_STATE || k === FX_CANCEL) {
                ctx[k] = v;
            } else if (k === FX_DISPATCH_NOW) {
                if (isArray(v[0])) {
                    for (let e of v) {
                        e && this.dispatchNow(e);
                    }
                } else {
                    this.dispatchNow(v);
                }
            } else {
                ctx[k] || (ctx[k] = []);
                if (isArray(v[0])) {
                    for (let e of v) {
                        e !== undefined && ctx[k].push(e);
                    }
                } else {
                    ctx[k].push(v)
                }
            }
        }
    }
}

/**
 * Stateful version of `StatelessEventBus`. Wraps an `IAtom` state
 * container (Atom/Cursor) and provides additional pre-defined event
 * handlers and side effects to manipulate wrapped state. Prefer this
 * as the default implementation for most use cases.
 */
export class EventBus extends StatelessEventBus implements
    IDeref<any>,
    api.IDispatch {

    readonly state: IAtom<any>;

    /**
     * Creates a new event bus instance with given parent state, handler
     * and effect definitions (all optional). If no state is given,
     * automatically creates an `Atom` with empty state object.
     *
     * In addition to the user provided handlers & effects, a number of
     * built-ins are added automatically. See `addBuiltIns()`. User
     * handlers can override built-ins.
     *
     * @param state
     * @param handlers
     * @param effects
     */
    constructor(state?: IAtom<any>, handlers?: IObjectOf<api.EventDef>, effects?: IObjectOf<api.EffectDef>) {
        super(handlers, effects);
        this.state = state || new Atom({});
    }

    /**
     * Returns value of internal state. Shorthand for:
     * `bus.state.deref()`
     */
    deref() {
        return this.state.deref();
    }

    /**
     * Adds same built-in event & side effect handlers as in
     * `StatelessEventBus.addBuiltIns()` and the following additions:
     *
     * ### Handlers
     *
     * #### `EV_SET_VALUE`
     *
     * Resets state path to provided value. See `setIn()`.
     *
     * Example event definition:
     * ```
     * [EV_SET_VALUE, ["path.to.value", val]]
     * ```
     *
     * #### `EV_UPDATE_VALUE`
     *
     * Updates a state path's value with provided function and optional
     * extra arguments. See `updateIn()`.
     *
     * Example event definition:
     * ```
     * [EV_UPDATE_VALUE, ["path.to.value", (x, y) => x + y, 1]]
     * ```
     *
     * #### `EV_TOGGLE_VALUE`
     *
     * Negates a boolean state value at given path.
     *
     * Example event definition:
     * ```
     * [EV_TOGGLE_VALUE, "path.to.value"]
     * ```
     *
     * #### `EV_UNDO`
     *
     * Calls `ctx[id].undo()` and uses return value as new state.
     * Assumes `ctx[id]` is a @thi.ng/atom `History` instance, provided
     * via e.g. `processQueue({ history })`. The event can be triggered
     * with or without ID. By default `"history"` is used as default key
     * to lookup the `History` instance. Furthermore, an additional
     * event can be triggered based on if a previous state has been
     * restored or not (basically, if the undo was successful). This is
     * useful for resetting/re-initializing stateful resources after a
     * successful undo action or to notify the user that no more undo's
     * are possible. The new event will be processed in the same frame
     * and has access to the (possibly) restored state. The event
     * structure for these options is shown below:
     *
     * ```
     * // using default ID
     * bus.dispatch([EV_UNDO]);
     *
     * // using custom history ID
     * bus.dispatch([EV_UNDO, ["custom"]]);
     *
     * // using custom ID and dispatch another event after undo
     * bus.dispatch([EV_UNDO, ["custom", ["ev-undo-success"], ["ev-undo-fail"]]]);
     * ```
     *
     * #### `EV_REDO`
     *
     * Similar to `EV_UNDO`, but for redo actions.
     *
     * ### Side effects
     *
     * #### `FX_STATE`
     *
     * Resets state atom to provided value (only a single update per
     * processing frame).
     */
    addBuiltIns(): any {
        super.addBuiltIns();
        // handlers
        this.addHandlers({
            [api.EV_SET_VALUE]: (state, [_, [path, val]]) =>
                ({ [FX_STATE]: setIn(state, path, val) }),
            [api.EV_UPDATE_VALUE]: (state, [_, [path, fn, ...args]]) =>
                ({ [FX_STATE]: updateIn(state, path, fn, ...args) }),
            [api.EV_TOGGLE_VALUE]: (state, [_, path]) =>
                ({ [FX_STATE]: updateIn(state, path, (x) => !x) }),
            [api.EV_UNDO]: undoHandler("undo"),
            [api.EV_REDO]: undoHandler("redo"),
        });

        // effects
        this.addEffects({
            [FX_STATE]: [(state) => this.state.reset(state), -1000],
        });
    }

    /**
     * Triggers processing of current event queue and returns `true` if
     * the any of the processed events caused a state change.
     *
     * If an event handler triggers the `FX_DISPATCH_NOW` side effect,
     * the new event will be added to the currently processed batch and
     * therefore executed in the same frame. Also see `dispatchNow()`.
     *
     * If the optional `ctx` arg is provided it will be merged into the
     * `InterceptorContext` object passed to each interceptor. Since the
     * merged object is also used to collect triggered side effects,
     * care must be taken that there're no key name clashes.
     *
     * In order to use the built-in `EV_UNDO`, `EV_REDO` events, users
     * MUST provide a @thi.ng/atom History (or compatible undo history
     * instance) via the `ctx` arg, e.g.
     *
     * ```
     * bus.processQueue({ history });
     * ```
     */
    processQueue(ctx?: api.InterceptorContext) {
        if (this.eventQueue.length > 0) {
            const prev = this.state.deref();
            this.currQueue = [...this.eventQueue];
            this.eventQueue.length = 0;
            ctx = this.currCtx = { ...ctx, [FX_STATE]: prev };
            for (let e of this.currQueue) {
                this.processEvent(ctx, e);
            }
            this.currQueue = this.currCtx = undefined;
            this.processEffects(ctx);
            return this.state.deref() !== prev;
        }
        return false;
    }
}

const asInterceptor = (i: api.Interceptor | api.InterceptorFn) =>
    isFunction(i) ? { pre: i } : i;

const undoHandler = (action: string) =>
    (_, [__, ev], bus, ctx) => {
        let id = ev ? ev[0] : "history";
        if (implementsFunction(ctx[id], action)) {
            const ok = ctx[id][action]();
            return {
                [FX_STATE]: bus.state.deref(),
                [FX_DISPATCH_NOW]: ev ?
                    ok !== undefined ? ev[1] : ev[2] :
                    undefined,
            };
        } else {
            console.warn("no history in context");
        }
    };

