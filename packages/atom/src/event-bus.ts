import { IObjectOf, IDeref } from "@thi.ng/api/api";
import { isArray } from "@thi.ng/checks/is-array";
import { isFunction } from "@thi.ng/checks/is-function";
import { isPromise } from "@thi.ng/checks/is-promise";

import * as api from "./api";
import { Atom } from "./atom";
import { setIn, updateIn } from "./path";

const FX_CANCEL = api.FX_CANCEL;
const FX_DISPATCH_NOW = api.FX_DISPATCH_NOW;
const FX_STATE = api.FX_STATE;

/**
 * Batched event processor for using composable interceptors for event
 * handling and side effects to execute the result of handled events.
 *
 * Events processed by this class are simple 2-element tuples/arrays of
 * this form: `["event-id", payload?]`, where the `payload` is optional
 * and can be any data.
 *
 * Events are processed by registered handlers which transform each
 * event into a number of side effects to be executed later. This
 * separation ensures event handlers themselves are pure functions and
 * too leads to more efficient reuse of side effecting operations. The
 * pure data nature until the last stage of processing (the application
 * side effects) also means event flow can be much easier inspected and
 * debugged.
 *
 * In this model an event handler itself is an array of objects with
 * `pre` and/or `post` keys and functions attached to each key. These
 * functions are called interceptors, since each intercepts the
 * processing of an event and can contribute their own side effects. The
 * outcome of this setup is a more aspect-oriented, composable approach
 * to event handling and allows to inject common, re-usable behaviors
 * for multiple event types (logging, validation, undo/redo triggers
 * etc.)
 *
 * The overall approach of this type of event processing is heavily
 * based on the pattern initially pioneered by @Day8/re-frame, with the
 * following differences:
 *
 * - standalone implementation (no assumptions about surrounding
 *   context/framework)
 * - manual trigger of event queue processing
 * - supports event cancellation
 * - side effect collection (multiple side effects for same effect type
 *   per frame)
 * - side effect priorities (to control execution order)
 * - dynamic addition/removal of handlers & effects
 */
export class EventBus implements
    IDeref<any>,
    api.IDispatch {

    readonly state: api.IAtom<any>;

    protected eventQueue: api.Event[];
    protected currQueue: api.Event[];
    protected currCtx: api.InterceptorContext;

    protected handlers: IObjectOf<api.Interceptor[]>;
    protected effects: IObjectOf<api.SideEffect>;
    protected priorities: api.EffectPriority[];

    /**
     * Creates a new event bus instance with given parent state, handler
     * and effect definitions (all optional). If no state is given,
     * automatically creates an `Atom` with empty state object.
     *
     * In addition to the user provided handlers & effects, a number of
     * built-ins are added automatically. See `addBuiltIns()`.
     *
     * @param state
     * @param handlers
     * @param effects
     */
    constructor(state?: api.IAtom<any>, handlers?: IObjectOf<api.EventDef>, effects?: IObjectOf<api.EffectDef>) {
        this.state = state || new Atom({});
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
     * Returns value of internal state. Shorthand for:
     * `bus.state.deref()`
     */
    deref() {
        return this.state.deref();
    }

    /**
     * Add built-in event & side effect handlers:
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
     * ### Side effects
     *
     * #### `FX_DISPATCH`
     * #### `FX_DISPATCH_ASYNC`
     * #### `FX_STATE`
     *
     */
    addBuiltIns(): any {
        // handlers
        this.addHandler(api.EV_SET_VALUE,
            (state, [_, [path, val]]) =>
                ({ [FX_STATE]: setIn(state, path, val) }));
        this.addHandler(api.EV_UPDATE_VALUE,
            (state, [_, [path, fn, ...args]]) =>
                ({ [FX_STATE]: updateIn(state, path, fn, ...args) }));

        // effects
        this.addEffect(FX_STATE, (x) => this.state.reset(x), -1000);
        this.addEffect(api.FX_DISPATCH, (e) => this.dispatch(e), -999);
        this.addEffect(api.FX_DISPATCH_ASYNC,
            ([id, arg, success, err]) => {
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
            },
            -999
        );
    }

    addHandler(id: string, spec: api.EventDef) {
        const iceps = isArray(spec) ?
            (<any>spec).map((i) => isFunction(i) ? { pre: i } : i) :
            isFunction(spec) ? [{ pre: spec }] : [spec];
        if (iceps.length > 0) {
            if (this.handlers[id]) {
                this.removeHandler(id);
                console.warn(`overriding handler for ID: ${id}`);
            }
            this.handlers[id] = iceps;
        } else {
            throw new Error(`no handlers in spec for ID: ${id}`);
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

    context() {
        return this.currCtx;
    }

    /**
     * Adds given event to event queue to be processed by
     * `processQueue()` later on.
     *
     * @param e
     */
    dispatch(e: api.Event) {
        this.eventQueue.push(e);
    }

    /**
     * Adds given event to whatever is the current event queue. If
     * triggered via the `FX_DISPATCH_NOW` side effect the event will
     * still be executed in the currently active batch. If called from
     * elsewhere, the result is the same as calling `dispatch()`.
     *
     * @param e
     */
    dispatchNow(e: api.Event) {
        (this.currQueue || this.eventQueue).push(e);
    }

    /**
     * Triggers processing of current event queue and returns `true` if
     * the any of the processed events caused a state change.
     *
     * If an event handler triggers the `FX_DISPATCH_NOW` side effect,
     * the new event will be added to the currently processed batch and
     * therefore executed in the same frame. Also see `dispatchNow()`.
     */
    processQueue() {
        if (this.eventQueue.length > 0) {
            const prev = this.state.deref();
            this.currQueue = [...this.eventQueue];
            this.eventQueue.length = 0;
            const fx = this.currCtx = { [FX_STATE]: prev };
            for (let e of this.currQueue) {
                this.processEvent(fx, e);
            }
            this.currQueue = this.currCtx = undefined;
            this.processEffects(fx);
            return this.state.deref() !== prev;
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
     * Processing of the current event stops immediatedly, if an
     * interceptor sets the `FX_CANCEL` side effect key to `true`.
     * However, the results of any previous interceptors (incl. the one
     * which cancelled) are kept and processed further as usual.
     *
     * @param fx
     * @param e
     */
    protected processEvent(fx: api.InterceptorContext, e: api.Event) {
        const iceps = this.handlers[e[0]];
        if (!iceps) {
            console.warn(`missing handler for event type: ${e[0]}`);
            return;
        }
        const n = iceps.length - 1;
        let hasPost = false;
        for (let i = 0; i <= n && !fx[FX_CANCEL]; i++) {
            const icep = iceps[i];
            if (icep.pre) {
                this.mergeEffects(fx, icep.pre(fx[FX_STATE], e, this));
            }
            hasPost = hasPost || !!icep.post;
        }
        if (!hasPost) {
            return;
        }
        for (let i = n; i >= 0 && !fx[FX_CANCEL]; i--) {
            const icep = iceps[i];
            if (icep.post) {
                this.mergeEffects(fx, icep.post(fx[FX_STATE], e, this));
            }
        }
    }

    /**
     * Takes a collection of side effects generated during event
     * processing and applies them in order of configured priorities.
     *
     * @param fx
     */
    protected processEffects(fx: api.InterceptorContext) {
        const effects = this.effects;
        for (let p of this.priorities) {
            const id = p[0];
            const val = fx[id];
            if (val !== undefined) {
                const fn = effects[id];
                if (id !== FX_STATE) {
                    for (let v of val) {
                        fn(v, this);
                    }
                } else {
                    fn(val, this);
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
     * accept a single value:
     *
     * - `FX_CANCEL`
     * - `FX_STATE`
     *
     * Note that because of this support (of multiple values), the value
     * of a single side effect MUST NOT be a nested array itself, or
     * rather not its first item.
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
     * @param fx
     * @param ret
     */
    protected mergeEffects(fx: api.InterceptorContext, ret: any) {
        if (!ret) {
            return;
        }
        for (let k in ret) {
            const v = ret[k];
            if (k === FX_STATE || k === FX_CANCEL) {
                fx[k] = v;
            } else if (k === FX_DISPATCH_NOW) {
                if (isArray(v[0])) {
                    for (let e of v) {
                        this.dispatchNow(e);
                    }
                } else {
                    this.dispatchNow(v);
                }
            } else {
                if (fx[k]) {
                    if (isArray(v[0])) {
                        Array.prototype.push.apply(fx[k], v);
                    } else {
                        fx[k].push(v)
                    }
                } else {
                    fx[k] = [v];
                }
            }
        }
    }
}
