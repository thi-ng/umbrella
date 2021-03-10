import { assert, Fn, NULL_LOGGER, SEMAPHORE } from "@thi.ng/api";
import { isPlainObject } from "@thi.ng/checks";
import {
    comp,
    isReduced,
    map,
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
    LOGGER,
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

    /**
     * Syntax sugar for {@link Subscription.transform} when using a
     * single {@link @thi.ng/transducers#map} transducer only. The given
     * function `fn` is used as `map`'s transformation fn.
     *
     * @param fn
     * @param opts
     */
    map<C>(
        fn: Fn<B, C>,
        opts?: Partial<WithErrorHandlerOpts>
    ): ISubscription<B, C> {
        return this.transform(map(fn), opts || {});
    }

    unsubscribe(sub?: Partial<ISubscriber<B>>) {
        LOGGER.debug(this.id, "unsub start", sub ? sub.id : "self");
        if (!sub) {
            this.parent && this.parent.unsubscribe(this);
            this.state = State.UNSUBSCRIBED;
            this.release();
            return true;
        }
        LOGGER.debug(this.id, "unsub child", sub.id);
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

    next(x: A) {
        if (this.state >= State.DONE) return;
        this.xform ? this.dispatchXform(x) : this.dispatch(<any>x);
    }

    done() {
        LOGGER.debug(this.id, "entering done()");
        if (this.state >= State.DONE) return;
        if (this.xform) {
            if (!this.dispatchXformDone()) return;
        }
        // attempt to call .done in wrapped sub
        if (!this.dispatchTo("done")) return;
        // disconnect from parent & internal cleanup
        this.unsubscribe();
        this.state = State.DONE;
        LOGGER.debug(this.id, "exiting done()");
    }

    error(e: any) {
        // only the wrapped sub's error handler gets a chance
        // to deal with the error
        const sub = this.wrapped;
        const hasErrorHandler = sub && sub.error;
        hasErrorHandler &&
            LOGGER.debug(this.id, "attempting wrapped error handler");
        // flag success if error handler returns true
        // (i.e. it could handle/recover from the error)
        // else detach this entire sub by going into error state...
        return (hasErrorHandler && sub!.error!(e)) || this.unhandledError(e);
    }

    protected unhandledError(e: any) {
        // ensure error is at least logged to console
        // even if default NULL_LOGGER is used...
        (LOGGER !== NULL_LOGGER ? LOGGER : console).warn(
            this.id,
            "unhandled error:",
            e
        );
        this.unsubscribe();
        this.state = State.ERROR;
        return false;
    }

    protected dispatchTo(type: "next" | "done", x?: B) {
        let s: Partial<ISubscriber<B>> | undefined = this.wrapped;
        if (s) {
            try {
                s[type] && s[type]!(x!);
            } catch (e) {
                // give wrapped sub a chance to handle error
                // (if that failed then we're already in error state now & terminate)
                if (!this.error(e)) return false;
            }
        }
        // process other child subs
        for (s of type === "next" ? this.subs : [...this.subs]) {
            try {
                s[type] && s[type]!(x!);
            } catch (e) {
                if (!s.error || !s.error(e)) {
                    // if no or failed handler, go into error state
                    return this.unhandledError(e);
                }
            }
        }
        return true;
    }

    protected dispatch(x: B) {
        LOGGER.debug(this.id, "dispatch", x);
        this.cacheLast && (this.last = x);
        this.dispatchTo("next", x);
    }

    protected dispatchXform(x: A) {
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
        if (this.dispatchXformVals(acc)) {
            isReduced(acc) && this.done();
        }
    }

    protected dispatchXformDone() {
        let acc: B[] | Reduced<B[]>;
        try {
            // collect remaining values from transducer
            acc = this.xform![1]([]);
        } catch (e) {
            // error in transducer can only be handled by the wrapped
            // subscriber's error handler (if avail)
            return this.error(e);
        }
        return this.dispatchXformVals(acc);
    }

    protected dispatchXformVals(acc: B[] | Reduced<B[]>) {
        const uacc = unreduced(acc);
        for (
            let i = 0, n = uacc.length;
            i < n && this.state < State.DONE;
            i++
        ) {
            this.dispatch(uacc[i]);
        }
        return this.state < State.ERROR;
    }

    protected release() {
        this.subs.clear();
        delete this.parent;
        delete this.xform;
        delete this.last;
    }
}
