import { isFunction } from "@thi.ng/checks/is-function";
import { implementsFunction } from "@thi.ng/checks/implements-function";
import { Reducer, Transducer } from "@thi.ng/transducers/api";
import { push } from "@thi.ng/transducers/rfn/push";
import { isReduced, unreduced } from "@thi.ng/transducers/reduced";

import { DEBUG, ISubscribable, ISubscriber, State } from "./api";

export class Subscription<A, B> implements
    ISubscriber<A>,
    ISubscribable<B> {

    static NEXT_ID = 0;

    id: string;

    protected parent: ISubscribable<A>;
    protected subs: Set<ISubscriber<B>>;
    protected xform: Reducer<B[], A>;
    protected state: State = State.IDLE;

    constructor(sub?: ISubscriber<B>, xform?: Transducer<A, B>, parent?: ISubscribable<A>, id?: string) {
        this.parent = parent;
        this.id = id || `sub-${Subscription.NEXT_ID++}`;
        this.subs = new Set();
        if (sub) {
            this.subs.add(<ISubscriber<B>>sub);
        }
        if (xform) {
            this.xform = xform(push());
        }
    }

    getState() {
        return this.state;
    }

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
                throw new Error(`illegal arity: ${args.length}`);
        }
        if (implementsFunction(sub, "subscribe")) {
            sub.parent = this;
        } else {
            sub = new Subscription(sub, xform, this, id);
        }
        return <Subscription<B, B>>this.addWrapped(sub);
    }

    subscribeAll(...subs: ISubscriber<B>[]) {
        const wrapped: Subscription<B, B>[] = [];
        for (let s of subs) {
            wrapped.push(this.subscribe(s));
        }
        return wrapped;
    }

    unsubscribe(sub?: Subscription<B, any>) {
        if (!sub) {
            if (this.parent) {
                return this.parent.unsubscribe(this);
            }
            return true;
        }
        if (this.subs) {
            DEBUG && console.log(this.id, "unsub", sub.id);
            if (this.subs.has(sub)) {
                this.subs.delete(sub);
                return true;
            }
            return false;
        }
        return true;
    }

    next(x: A) {
        // this.ensureState();
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
            this.parent && this.parent.unsubscribe(this);
            delete this.parent;
            delete this.subs;
            delete this.xform;
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
            }
        }
    }

    protected addWrapped(wrapped: Subscription<any, any>) {
        this.subs.add(wrapped);
        this.state = State.ACTIVE;
        return wrapped;
    }

    protected dispatch(x: B) {
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
            throw new Error(`operation not allowed in ${State[this.state]} state`);
        }
    }
}
