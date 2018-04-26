import { IDeref } from "@thi.ng/api/api";
import { illegalArity, illegalState } from "@thi.ng/api/error";
import { implementsFunction } from "@thi.ng/checks/implements-function";
import { isFunction } from "@thi.ng/checks/is-function";
import { isString } from "@thi.ng/checks/is-string";
import { Reducer, SEMAPHORE, Transducer } from "@thi.ng/transducers/api";
import { comp } from "@thi.ng/transducers/func/comp";
import { isReduced, unreduced } from "@thi.ng/transducers/reduced";
import { push } from "@thi.ng/transducers/rfn/push";

import {
    DEBUG,
    ISubscribable,
    ISubscriber,
    State
} from "./api";

export class Subscription<A, B> implements
    IDeref<B>,
    ISubscriber<A>,
    ISubscribable<B> {

    static NEXT_ID = 0;

    id: string;

    protected parent: ISubscribable<A>;
    protected subs: Set<ISubscriber<B>>;
    protected xform: Reducer<B[], A>;
    protected state: State = State.IDLE;

    protected last: any;

    constructor(sub?: ISubscriber<B>, xform?: Transducer<A, B>, parent?: ISubscribable<A>, id?: string) {
        this.parent = parent;
        this.id = id || `sub-${Subscription.NEXT_ID++}`;
        this.last = SEMAPHORE;
        this.subs = new Set();
        if (sub) {
            this.subs.add(<ISubscriber<B>>sub);
        }
        if (xform) {
            this.xform = xform(push());
        }
    }

    deref() {
        return this.last !== SEMAPHORE ? this.last : undefined;
    }

    getState() {
        return this.state;
    }

    /**
     * Creates new child subscription with given subscriber and/or
     * transducer and optional subscription ID.
     */
    subscribe(sub: Partial<ISubscriber<B>>, id?: string): Subscription<B, B>
    subscribe<C>(xform: Transducer<B, C>, id?: string): Subscription<B, C>;
    subscribe<C>(sub: Partial<ISubscriber<C>>, xform: Transducer<B, C>, id?: string): Subscription<B, C>
    subscribe(...args: any[]) {
        this.ensureState();
        let sub, xform, id;
        switch (args.length) {
            case 1:
            case 2:
                if (isFunction(args[0])) {
                    xform = args[0];
                    id = args[1] || `xform-${Subscription.NEXT_ID++}`;
                } else {
                    sub = args[0];
                    if (isFunction(args[1])) {
                        xform = args[1];
                    } else {
                        id = args[1];
                    }
                }
                break;
            case 3:
                [sub, xform, id] = args;
                break;
            default:
                illegalArity(args.length);
        }
        if (implementsFunction(sub, "subscribe")) {
            sub.parent = this;
        } else {
            sub = new Subscription(sub, xform, this, id);
        }
        if (this.last !== SEMAPHORE) {
            sub.next(this.last);
        }
        return <Subscription<B, B>>this.addWrapped(sub);
    }

    /**
     * Returns array of new child subscriptions for all given
     * subscribers.
     *
     * @param subs
     */
    subscribeAll(...subs: ISubscriber<B>[]) {
        const wrapped: Subscription<B, B>[] = [];
        for (let s of subs) {
            wrapped.push(this.subscribe(s));
        }
        return wrapped;
    }

    /**
     * Creates a new child subscription using given transducers and
     * optional subscription ID. Supports up to 4 transducers and if
     * more than one transducer is given, composes them in left-to-right
     * order using @thi.ng/transducers `comp()`.
     *
     * Shorthand for `subscribe(comp(xf1, xf2,...), id)`
     */
    transform<C>(a: Transducer<B, C>, id?: string): Subscription<B, C>;
    transform<C, D>(a: Transducer<B, C>, b: Transducer<C, D>, id?: string): Subscription<B, D>;
    transform<C, D, E>(a: Transducer<B, C>, b: Transducer<C, D>, c: Transducer<D, E>, id?: string): Subscription<B, E>;
    transform<C, D, E, F>(a: Transducer<B, C>, b: Transducer<C, D>, c: Transducer<D, E>, d: Transducer<E, F>, id?: string): Subscription<B, F>;
    transform(...xf: any[]) {
        const n = xf.length - 1;
        if (isString(xf[n])) {
            return this.subscribe((<any>comp)(...xf.slice(0, n)), xf[n]);
        } else {
            return this.subscribe((<any>comp)(...xf));
        }
    }

    /**
     * If called without arg, removes this subscription from parent (if
     * any), cleans up internal state and goes into DONE state. If
     * called with arg, removes the sub from internal pool and if no
     * other subs are remaining also cleans up itself and goes into DONE
     * state.
     *
     * @param sub
     */
    unsubscribe(sub?: Subscription<B, any>) {
        DEBUG && console.log(this.id, "unsub start", sub ? sub.id : "self");
        if (!sub) {
            let res = true;
            if (this.parent) {
                res = this.parent.unsubscribe(this);
            }
            this.state = State.DONE;
            this.cleanup();
            return res;
        }
        if (this.subs) {
            DEBUG && console.log(this.id, "unsub child", sub.id);
            if (this.subs.has(sub)) {
                this.subs.delete(sub);
                if (!this.subs.size) {
                    this.unsubscribe();
                }
                return true;
            }
        }
        return false;
    }

    next(x: A) {
        if (this.state < State.DONE) {
            if (this.xform) {
                const acc = this.xform[2]([], x);
                const uacc = unreduced(acc);
                const n = uacc.length;
                for (let i = 0; i < n; i++) {
                    this.dispatch(uacc[i]);
                }
                if (isReduced(acc)) {
                    this.done();
                }
            } else {
                this.dispatch(<any>x);
            }
        }
    }

    done() {
        DEBUG && console.log(this.id, "done start");
        if (this.state < State.DONE) {
            if (this.xform) {
                const acc = this.xform[1]([]);
                const uacc = unreduced(acc);
                const n = uacc.length;
                for (let i = 0; i < n; i++) {
                    this.dispatch(uacc[i]);
                }
            }
            this.state = State.DONE;
            for (let s of [...this.subs]) {
                s.done && s.done();
            }
            this.unsubscribe();
            DEBUG && console.log(this.id, "done");
        }
    }

    error(e: any) {
        this.state = State.ERROR;
        let notified = false;
        if (this.subs && this.subs.size) {
            for (let s of [...this.subs]) {
                if (s.error) {
                    s.error(e);
                    notified = true;
                }
            }
        }
        if (!notified) {
            console.log(this.id, "unhandled error:", e);
            if (this.parent) {
                DEBUG && console.log(this.id, "unsubscribing...");
                this.unsubscribe();
                this.state = State.ERROR;
            }
        }
    }

    protected addWrapped(wrapped: Subscription<any, any>) {
        this.subs.add(wrapped);
        this.state = State.ACTIVE;
        return wrapped;
    }

    protected dispatch(x: B) {
        DEBUG && console.log(this.id, "dispatch", x);
        this.last = x;
        for (let s of this.subs) {
            try {
                s.next && s.next(x);
            } catch (e) {
                s.error ? s.error(e) : this.error(e);
            }
        }
    }

    protected ensureState() {
        if (this.state >= State.DONE) {
            illegalState(`operation not allowed in ${State[this.state]} state`);
        }
    }

    protected cleanup() {
        DEBUG && console.log(this.id, "cleanup");
        this.subs.clear();
        delete this.parent;
        delete this.xform;
        delete this.last;
    }
}
