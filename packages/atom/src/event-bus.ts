import { IObjectOf } from "@thi.ng/api/api";
import { isArray } from "@thi.ng/checks/is-array";
import { isFunction } from "@thi.ng/checks/is-function";

import * as api from "./api";

/**
 * Batched event processor for using composable interceptors for event handling
 * and side effects to execute the result of handled events.
 *
 * In this model an event handler is an array of objects with `pre` and/or `post`
 * keys and functions attached to each key. These functions are called interceptors,
 * since each intercepts the processing of an event and can contribute their
 * own side effects. The outcome of this setup is a more aspect-oriented, composable
 * approach to event handling and allows to inject common, re-usable behaviors
 * for multiple event types (tracing, validation, undo/redo triggers etc.)
 *
 * The overall approach of this type of event processing is heavily based on the
 * pattern initially pioneered by @Day8/re-frame, with the following differences:
 *
 * - standalone implementation (no assumptions about surrounding context/framework)
 * - manual trigger of event queue processing
 * - supports event cancellation
 * - side effect collection (multiple side effects for same effect type per frame)
 * - side effect priorities (to better control execution order)
 * - dynamic addition/removal of handlers & effects
 *
 */
export class EventBus {

    state: api.IAtom<any>;
    eventQueue: api.Event[];
    currQueue: api.Event[];

    handlers: IObjectOf<api.Interceptor[]>;
    effects: IObjectOf<api.SideEffect>;
    priorities: api.EffectPriority[];

    constructor(state: api.IAtom<any>, handlers?: IObjectOf<api.EventDef>, effects?: IObjectOf<api.EffectDef>) {
        this.state = state;
        this.handlers = {};
        this.effects = {};
        this.eventQueue = [];
        this.priorities = [];
        this.addEffect(api.FX_STATE, (x) => this.state.reset(x), -1000);
        this.addEffect(api.FX_DISPATCH, (e) => this.dispatch(e), -999);
        if (handlers) {
            this.addHandlers(handlers);
        }
        if (effects) {
            this.addEffects(effects);
        }
    }

    addHandler(id: string, spec: api.EventDef) {
        const iceps = isArray(spec) ?
            (<any>spec).map((i) => isFunction(i) ? { pre: i } : i) :
            isFunction(spec) ? [{ pre: spec }] : [spec];
        if (iceps.length > 0) {
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

    /**
     * Adds given event to event queue to be processed
     * by `processQueue()` later on.
     *
     * @param e
     */
    dispatch(e: api.Event) {
        this.eventQueue.push(e);
    }

    /**
     * Adds given event to whatever is the current
     * event queue. If triggered via the `FX_DISPATCH_NOW`
     * side effect the event will still be executed
     * in the currently active batch. If called from
     * elsewhere, the result is the same as calling
     * `dispatch()`.
     *
     * @param e
     */
    dispatchNow(e: api.Event) {
        (this.currQueue || this.eventQueue).push(e);
    }

    /**
     * Triggers processing of current event queue and
     * returns `true` if the any of the processed events
     * caused a state change.
     *
     * If an event handler triggers the `FX_DISPATCH_NOW`
     * side effect, the new event will be added to the
     * currently processed batch and therefore executed
     * in the same frame. Also see `dispatchNow()`.
     */
    processQueue() {
        if (this.eventQueue.length > 0) {
            const prev = this.state.deref();
            this.currQueue = [...this.eventQueue];
            this.eventQueue.length = 0;
            let fx = { state: prev };
            for (let e of this.currQueue) {
                this.processEvent(fx, e);
            }
            this.currQueue = null;
            this.processEffects(fx);
            return this.state.deref() !== prev;
        }
        return false;
    }

    /**
     * Processes a single event using the configured handler/interceptor chain.
     * Logs warning message and skips processing if no handler
     * is available for the event.
     *
     * This function processes the array of interceptors in bi-directional
     * order. First any `pre` interceptors are processed in
     * forward order. Then `post` interceptors are processed in reverse.
     *
     * Each interceptor can return a result object of side effects,
     * which are being merged and collected for `processEffects()`.
     *
     * Any interceptor can trigger zero or more known side effects,
     * each (side effect) will be collected in an array to support
     * multiple invocations of the same effect type per frame. If no
     * side effects are requested, an interceptor can return `undefined`.
     *
     * Processing of the current event stops immediatedly, if an
     * interceptor includes the `FX_CANCEL` side effect. However, the
     * results interceptors (incl. the one which cancelled) are kept and
     * processed further as usual.
     *
     * @param fx
     * @param e
     */
    protected processEvent(fx: any, e: api.Event) {
        const iceps = this.handlers[e[0]];
        if (!iceps) {
            console.warn(`missing handler for event type: ${e[0]}`);
            return;
        }
        const n = iceps.length - 1;
        let hasPost = false;
        for (let i = 0; i <= n && !fx[api.FX_CANCEL]; i++) {
            const icep = iceps[i];
            if (icep.pre) {
                this.mergeEffects(fx, icep.pre(fx.state, e, fx));
            }
            hasPost = hasPost || !!icep.post;
        }
        if (!hasPost) {
            return;
        }
        for (let i = n; i >= 0 && !fx[api.FX_CANCEL]; i--) {
            const icep = iceps[i];
            if (icep.post) {
                this.mergeEffects(fx, icep.post(fx.state, e, fx));
            }
        }
    }

    /**
     * Takes a collection of side effects generated during
     * event processing and applies them in order of configured
     * priorities.
     *
     * @param fx
     */
    protected processEffects(fx: any) {
        const effects = this.effects;
        for (let p of this.priorities) {
            const id = p[0];
            const val = fx[id];
            if (val !== undefined) {
                const fn = effects[id];
                if (id !== api.FX_STATE) {
                    for (let v of val) {
                        fn(v);
                    }
                } else {
                    fn(val);
                }
            }
        }
    }

    protected mergeEffects(fx: any, ret: any) {
        if (!ret) {
            return;
        }
        for (let k in ret) {
            if (k === api.FX_STATE || k === api.FX_CANCEL) {
                fx[k] = ret[k];
            } else if (k === api.FX_DISPACH_NOW) {
                this.dispatchNow(ret[k]);
            } else {
                fx[k] ? fx[k].push(ret[k]) : (fx[k] = [ret[k]]);
            }
        }
    }
}
