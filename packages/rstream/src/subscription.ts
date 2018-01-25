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
    protected subs: ISubscriber<B>[] = [];
    protected xform: Reducer<B[], A>;
    protected state: State = State.IDLE;

    constructor(sub?: ISubscriber<B>, xform?: Transducer<A, B>, parent?: ISubscribable<A>, id?: string) {
        this.parent = parent;
        this.id = id || `sub-${Subscription.NEXT_ID++}`;
        if (sub) {
            this.subs.push(<ISubscriber<B>>sub);
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
        if (this.state < State.DONE) {
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
        throw new Error(`called subscribe() in ${State[this.state]} state`);
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
            } else {
                throw new Error("subscription has no parent");
            }
        }
        if (this.subs) {
            DEBUG && console.log(this.id, "unsub", sub.id);
            const idx = this.subs.indexOf(sub);
            if (idx >= 0) {
                this.subs.splice(idx, 1);
                return true;
            }
            return false;
        }
        return true;
    }

    next(x: A) {
        if (this.state < State.DONE) {
            if (this.xform) {
                const acc = this.xform[2]([], x),
                    uacc = unreduced(acc),
                    n = uacc.length;
                for (let i = 0; i < n; i++) {
                    this.dispatch(uacc[i]);
                }
                if (isReduced(acc)) {
                    this.done();
                }
            } else {
                this.dispatch(<any>x);
            }
        } else {
            throw new Error(`called next() in ${State[this.state]} state`);
        }
    }

    done() {
        if (this.state !== State.DONE) {
            if (this.xform) {
                const acc = this.xform[1]([]),
                    uacc = unreduced(acc),
                    n = uacc.length;
                for (let i = 0; i < n; i++) {
                    this.dispatch(uacc[i]);
                }
            }
            this.state = State.DONE;
            this.dispatch(undefined, [...this.subs], "done");
            this.parent && this.parent.unsubscribe(this);
            delete this.parent;
            delete this.subs;
            delete this.xform;
            DEBUG && console.log(this.id, "done");
        }
    }

    error(e: Error) {
        this.state = State.ERROR;
        console.log(this.id, "unhandled error:", e);
        if (this.parent) {
            DEBUG && console.log(this.id, "unsubscribing...");
            this.unsubscribe();
        }
    }

    protected addWrapped(wrapped: Subscription<any, any>) {
        this.subs.push(wrapped);
        this.state = State.ACTIVE;
        return wrapped;
    }

    protected dispatch(x: B, subs = this.subs, op = "next") {
        for (let i = 0, n = subs.length; i < n; i++) {
            const s = subs[i];
            try {
                s[op] && s[op](x);
            } catch (e) {
                s.error ? s.error(e) : this.error(e);
            }
        }
    }
}
