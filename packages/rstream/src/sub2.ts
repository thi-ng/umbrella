import { assert, SEMAPHORE } from "@thi.ng/api";
import { isPlainObject } from "@thi.ng/checks";
import {
    comp,
    isReduced,
    peek,
    push,
    Reduced,
    Reducer,
    Transducer,
    unreduced,
} from "@thi.ng/transducers";
import {
    CloseMode,
    CommonOpts,
    ISubscriber,
    ISubscription,
    State,
    SubscriptionOpts,
    TransformableOpts,
    WithErrorHandlerOpts,
    WithTransform,
} from "./api";
import type { Subscription } from "./subscription";
import { optsWithID } from "./utils/idgen";

/**
 * WIP implementation of new subscription type (will replace existing
 * `Subscription` class)
 */
export class Sub2<A, B> implements ISubscription<A, B> {
    id: string;
    closeIn: CloseMode;
    closeOut: CloseMode;
    parent?: ISubscription<any, A>;
    __owner?: ISubscription<any>;

    protected xform?: Reducer<B[], A>;
    protected cacheLast: boolean;
    protected last: any = SEMAPHORE;
    protected state = State.IDLE;
    protected subs = new Set<Partial<ISubscriber<B>>>();

    constructor(
        protected wrapped?: Partial<ISubscriber<B>>,
        opts?: Partial<SubscriptionOpts<A, B>>
    ) {
        opts = optsWithID(`$sub`, {
            closeIn: CloseMode.LAST,
            closeOut: CloseMode.LAST,
            cache: true,
            ...opts,
        });
        this.parent = opts.parent;
        this.id = opts.id!;
        this.closeIn = opts.closeIn!;
        this.closeOut = opts.closeOut!;
        this.cacheLast = opts.cache!;
        opts.xform && (this.xform = opts.xform(push()));
    }

    deref(): B | undefined {
        return this.last !== SEMAPHORE ? this.last : undefined;
    }

    getState(): State {
        return this.state;
    }

    subscribe<C>(sub: Sub2<B, C>): ISubscription<B, C>;
    subscribe(
        sub: Partial<ISubscriber<B>>,
        opts?: Partial<CommonOpts>
    ): ISubscription<B, B>;
    subscribe<C>(
        sub: Partial<ISubscriber<C>>,
        opts?: Partial<TransformableOpts<B, C>>
    ): ISubscription<B, C>;
    subscribe(
        sub: Partial<ISubscriber<any>>,
        opts: Partial<TransformableOpts<any, any>> = {}
    ): any {
        let $sub: ISubscriber<any>;
        if (sub instanceof Sub2) {
            assert(!!sub.parent, `sub '${sub.id}' already has a parent`);
            sub.parent = this;
            $sub = sub;
        } else {
            $sub = new Sub2(sub, { ...opts, parent: this });
        }
        this.subs.add($sub);
        this.last != SEMAPHORE && $sub.next(this.last);
        return $sub;
    }

    transform<C>(
        a: Transducer<B, C>,
        opts?: Partial<WithErrorHandlerOpts>
    ): Subscription<B, C>;
    transform<C, D>(
        a: Transducer<B, C>,
        b: Transducer<C, D>,
        opts?: Partial<WithErrorHandlerOpts>
    ): Subscription<B, D>;
    transform<C, D, E>(
        a: Transducer<B, C>,
        b: Transducer<C, D>,
        c: Transducer<D, E>,
        opts?: Partial<WithErrorHandlerOpts>
    ): Subscription<B, E>;
    transform<C, D, E, F>(
        a: Transducer<B, C>,
        b: Transducer<C, D>,
        c: Transducer<D, E>,
        d: Transducer<E, F>,
        opts?: Partial<WithErrorHandlerOpts>
    ): Subscription<B, F>;
    transform<C>(
        opts: WithTransform<B, C> & Partial<WithErrorHandlerOpts>
    ): Subscription<B, C>;
    transform(...args: any[]) {
        let sub: Partial<ISubscriber<B>> | undefined;
        let opts: Partial<SubscriptionOpts<any, any>> | undefined;
        if (isPlainObject(peek(args))) {
            opts = args.pop();
            sub = { error: (<WithErrorHandlerOpts>opts).error };
        }
        return this.subscribe(
            <any>sub,
            optsWithID(
                "xform",
                args.length > 0
                    ? {
                          ...opts!,
                          // @ts-ignore
                          xform: comp(...args),
                      }
                    : opts
            )
        );
    }

    next(x: A) {
        if (this.state >= State.DONE) return;
        this.xform ? this.dispatchXform(x) : this.dispatch(<any>x);
    }

    dispatch(x: B) {
        this.cacheLast && (this.last = x);
        let s: Partial<ISubscriber<B>> | undefined = this.wrapped;
        if (s) {
            try {
                s.next && s.next(x);
            } catch (e) {
                // give wrapped sub a chance to handle error
                if (!this.error(e)) return;
            }
        }
        for (s of this.subs) {
            try {
                s.next && s.next(x);
            } catch (e) {
                // give sub a chance to handle error
                // but terminate if handler missing or unsuccessful
                if (!s.error || !s.error(e)) {
                    this.unhandledError(e);
                    return;
                }
            }
        }
    }

    dispatchXform(x: A) {
        let acc: B[] | Reduced<B[]>;
        try {
            acc = this.xform![2]([], x);
        } catch (e) {
            // error in transducer can only be handled by the wrapped
            // subscriber's error handler (if avail)
            this.error(e);
            // don't dispatch value(s)
            return;
        }
        const uacc = unreduced(acc);
        const n = uacc.length;
        for (let i = 0; i < n; i++) {
            this.dispatch(uacc[i]);
            if (this.state === State.ERROR) return;
        }
        isReduced(acc) && this.done();
    }

    done() {}

    error(e: any) {
        // only the wrapped sub's error handler gets a chance
        // to deal with the error
        const sub = this.wrapped;
        // flag success if error handler returns true
        // (i.e. could handle/recover from the error)
        // else detach this entire sub...
        return (sub && sub.error && sub.error(e)) || this.unhandledError(e);
    }

    unhandledError(e: any) {
        console.warn("uncaught error", e);
        this.unsubscribe();
        this.state = State.ERROR;
        return false;
    }

    unsubscribe(sub?: Partial<ISubscriber<B>>) {
        if (!sub) {
            this.parent && this.parent.unsubscribe(this);
            this.state = State.DONE;
            this.release();
            return true;
        }
        if (this.subs.delete(sub)) {
            if (
                this.closeOut === CloseMode.FIRST ||
                (!this.subs.size && this.closeOut !== CloseMode.NEVER)
            ) {
                this.unsubscribe();
            }
            return true;
        }
        return false;
    }

    release() {
        this.subs.clear();
        delete this.parent;
        delete this.xform;
        delete this.last;
    }
}
