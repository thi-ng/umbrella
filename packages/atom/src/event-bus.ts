import { IObjectOf } from "@thi.ng/api/api";
import { isArray } from "@thi.ng/checks/is-array";
import { isFunction } from "@thi.ng/checks/is-function";
import { DCons } from "@thi.ng/dcons";

import * as api from "./api";

export class EventBus {

    state: api.IAtom<any>;
    eventQueue: api.Event[];
    currQueue: api.Event[];

    handlers: IObjectOf<api.Interceptor[]>;
    effects: IObjectOf<api.SideEffect>;
    priorites: DCons<[number, string]>;

    constructor(state: api.IAtom<any>, handlers?: IObjectOf<api.EventDef>, effects?: IObjectOf<api.EffectDef>) {
        this.state = state;
        this.handlers = {};
        this.effects = {};
        this.eventQueue = [];
        this.priorites = new DCons();
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
        this.priorites.insertSorted([priority, id], (a, b) => a[0] - b[0]);
    }

    addEffects(specs: IObjectOf<api.EffectDef>) {
        for (let id in specs) {
            this.addEffect(id, specs[id][0], specs[id][1]);
        }
    }

    dispatch(e: api.Event) {
        this.eventQueue.push(e);
    }

    dispatchNow(e: api.Event) {
        (this.currQueue || this.eventQueue).push(e);
    }

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

    protected processEvent(fx: any, e: api.Event) {
        const iceps = this.handlers[e[0]];
        const n = iceps.length - 1;
        let hasPost = false;
        for (let i = 0; i <= n && !fx[api.FX_CANCEL]; i++) {
            const icep = iceps[i];
            if (icep.pre) {
                this.mergeEffects(fx, icep.pre(fx.state, e));
            }
            hasPost = hasPost || !!icep.post;
        }
        if (!hasPost) {
            return;
        }
        for (let i = n; i >= 0 && !fx[api.FX_CANCEL]; i--) {
            const icep = iceps[i];
            if (icep.post) {
                this.mergeEffects(fx, icep.post(fx.state, e));
            }
        }
    }

    protected processEffects(fx: any) {
        const effects = this.effects;
        for (let p of this.priorites) {
            const id = p[1];
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
