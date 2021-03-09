import { Fn, Nullable, NULL_LOGGER, SEMAPHORE } from "@thi.ng/api";
import { peek } from "@thi.ng/arrays";
import { implementsFunction, isPlainObject } from "@thi.ng/checks";
import { illegalState } from "@thi.ng/errors";
import {
    comp,
    isReduced,
    map,
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
import { nextID, optsWithID } from "./utils/idgen";

/**
 * Creates a new {@link Subscription} instance, the fundamental datatype
 * and building block provided by this package.
 *
 * @remarks
 * Most other types in rstream, including {@link Stream}s, are
 * `Subscription`s and all can be:
 *
 * - connected into directed graphs (sync or async & not necessarily
 *   DAGs)
 * - transformed using transducers (incl. support for early termination)
 * - can have any number of subscribers (optionally each w/ their own
 *   transducers)
 * - recursively unsubscribe themselves from parent after their last
 *   subscriber unsubscribed (configurable)
 * - will go into a non-recoverable error state if none of the
 *   subscribers has an error handler itself
 * - implement the {@link @thi.ng/api#IDeref} interface
 *
 * If a transducer is provided (via the `xform` option), all received
 * values will be first processed by the transducer and only its
 * transformed result(s) (if any) will be passed to downstream
 * subscribers. Any uncaught errors *inside* the transducer will cause
 * this subscription's error handler to be called and will stop this
 * subscription from receiving any further values (by default, unless
 * overridden).
 *
 * Subscription behavior can be customized via the additional (optional)
 * options arg. See {@link CommonOpts} and {@link SubscriptionOpts} for
 * further details.
 *
 * @example
 * ```ts
 * // as reactive value mechanism (same as with stream() above)
 * s = subscription();
 * s.subscribe(trace("s1"));
 * s.subscribe(trace("s2"), { xform: tx.filter((x) => x > 25) });
 *
 * // external trigger
 * s.next(23);
 * // s1 23
 * s.next(42);
 * // s1 42
 * // s2 42
 * ```
 *
 * @param sub -
 * @param opts -
 */
export const subscription = <A, B>(
    sub: Nullable<Partial<ISubscriber<B>>>,
    opts?: Partial<SubscriptionOpts<A, B>>
) => new Subscription(sub, opts);

/**
 * @see {@link subscription} for reference & examples.
 */
export class Subscription<A, B> implements ISubscription<A, B> {
    id: string;

    closeIn: CloseMode;
    closeOut: CloseMode;

    parent?: ISubscription<any, A>;

    protected subs: Partial<ISubscriber<B>>[];
    protected xform?: Reducer<B[], A>;
    protected state: State = State.IDLE;

    protected cacheLast: boolean;
    protected last: any;

    constructor(
        sub: Nullable<Partial<ISubscriber<B>>>,
        opts: Partial<SubscriptionOpts<A, B>> = {}
    ) {
        this.parent = opts.parent;
        this.closeIn =
            opts.closeIn !== undefined ? opts.closeIn : CloseMode.LAST;
        this.closeOut =
            opts.closeOut !== undefined ? opts.closeOut : CloseMode.LAST;
        this.cacheLast = opts.cache !== false;
        this.id = opts.id || `sub-${nextID()}`;
        this.last = SEMAPHORE;
        this.subs = [];
        if (sub) {
            this.subs.push(sub);
        }
        if (opts.xform) {
            this.xform = opts.xform(push());
        }
    }

    deref(): B | undefined {
        return this.last !== SEMAPHORE ? this.last : undefined;
    }

    getState() {
        return this.state;
    }

    /**
     * Creates new child subscription with given subscriber and/or
     * transducer and options.
     */
    subscribe<C>(sub: ISubscription<B, C>): ISubscription<B, C>;
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
        this.ensureState();
        let $sub: Subscription<any, any>;
        if (implementsFunction(sub, "subscribe") && !opts.xform) {
            $sub = <Subscription<any, any>>sub;
            $sub.parent = this;
        } else {
            $sub = subscription<B, B>(sub, { parent: this, ...opts });
        }
        this.last !== SEMAPHORE && $sub.next(this.last);
        return this.addWrapped($sub);
    }

    /**
     * Returns array of new child subscriptions for all given
     * subscribers.
     *
     * @param subs -
     */
    subscribeAll(...subs: ISubscriber<B>[]) {
        const wrapped: ISubscription<B, B>[] = [];
        for (let s of subs) {
            wrapped.push(this.subscribe(s));
        }
        return wrapped;
    }

    /**
     * Creates a new child subscription using given transducers and
     * optional subscription ID. Supports up to 4 transducers and if
     * more than one transducer is given, composes them in left-to-right
     * order using {@link @thi.ng/transducers#(comp:1)}.
     *
     * Shorthand for `subscribe(comp(xf1, xf2,...), id)`
     */
    transform<C>(
        a: Transducer<B, C>,
        opts?: Partial<WithErrorHandlerOpts>
    ): ISubscription<B, C>;
    transform<C, D>(
        a: Transducer<B, C>,
        b: Transducer<C, D>,
        opts?: Partial<WithErrorHandlerOpts>
    ): ISubscription<B, D>;
    transform<C, D, E>(
        a: Transducer<B, C>,
        b: Transducer<C, D>,
        c: Transducer<D, E>,
        opts?: Partial<WithErrorHandlerOpts>
    ): ISubscription<B, E>;
    transform<C, D, E, F>(
        a: Transducer<B, C>,
        b: Transducer<C, D>,
        c: Transducer<D, E>,
        d: Transducer<E, F>,
        opts?: Partial<WithErrorHandlerOpts>
    ): ISubscription<B, F>;
    transform<C>(
        opts: WithTransform<B, C> & Partial<WithErrorHandlerOpts>
    ): ISubscription<B, C>;
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

    /**
     * If called without arg, removes this subscription from parent (if
     * any), cleans up internal state and goes into DONE state. If
     * called with arg, removes the sub from internal pool and if no
     * other subs are remaining also cleans up itself and goes into DONE
     * state.
     *
     * @param sub -
     */
    unsubscribe(sub?: ISubscription<B, any>) {
        LOGGER.debug(this.id, "unsub start", sub ? sub.id : "self");
        if (!sub) {
            let res = true;
            if (this.parent) {
                res = this.parent.unsubscribe(this);
            }
            this.state = State.DONE;
            this.cleanup();
            return res;
        }
        LOGGER.debug(this.id, "unsub child", sub.id);
        const idx = this.subs.indexOf(sub);
        if (idx >= 0) {
            this.subs.splice(idx, 1);
            if (
                this.closeOut === CloseMode.FIRST ||
                (!this.subs.length && this.closeOut !== CloseMode.NEVER)
            ) {
                this.unsubscribe();
            }
            return true;
        }
        return false;
    }

    next(x: A) {
        if (this.state >= State.DONE) return;
        this.xform ? this.dispatchXform(<any>x) : this.dispatch(<any>x);
    }

    done() {
        LOGGER.debug(this.id, "entering done()");
        if (this.state < State.DONE) {
            try {
                if (this.xform) {
                    const acc = this.xform[1]([]);
                    const uacc = unreduced(acc);
                    const n = uacc.length;
                    for (let i = 0; i < n; i++) {
                        this.dispatch(uacc[i]);
                    }
                }
            } catch (e) {
                this.error(e);
                return;
            }
            this.state = State.DONE;
            for (let s of this.subs.slice()) {
                try {
                    s.done && s.done();
                } catch (e) {
                    s.error ? s.error(e) : this.error(e);
                }
            }
            this.unsubscribe();
            LOGGER.debug(this.id, "exiting done()");
        }
    }

    error(e: any) {
        this.state = State.ERROR;
        const subs = this.subs;
        let notified = false;
        if (subs.length) {
            for (let s of subs.slice()) {
                if (s.error) {
                    s.error(e);
                    notified = true;
                }
            }
        }
        if (!notified) {
            // ensure error is at least logged to console
            // even if default NULL_LOGGER is used...
            (LOGGER !== NULL_LOGGER ? LOGGER : console).warn(
                this.id,
                "unhandled error:",
                e
            );
            if (this.parent) {
                LOGGER.debug(this.id, "unsubscribing...");
                this.unsubscribe();
                this.state = State.ERROR;
            }
        }
        return notified;
    }

    protected addWrapped(sub: Subscription<any, any>) {
        this.subs.push(sub);
        this.state = State.ACTIVE;
        return sub;
    }

    protected dispatch(x: B) {
        // LOGGER.debug(this.id, "dispatch", x);
        this.cacheLast && (this.last = x);
        const subs = this.subs;
        let n = subs.length;
        let s: Partial<ISubscriber<B>>;
        if (n === 1) {
            s = subs[0];
            try {
                s.next && s.next(x);
            } catch (e) {
                s.error ? s.error(e) : this.error(e);
            }
        } else {
            for (; --n >= 0; ) {
                s = subs[n];
                try {
                    s.next && s.next(x);
                } catch (e) {
                    s.error ? s.error(e) : this.error(e);
                }
            }
        }
    }

    protected dispatchXform(x: A) {
        let acc: B[] | Reduced<B[]>;
        try {
            acc = this.xform![2]([], x);
        } catch (e) {
            this.error(e);
            return;
        }
        const uacc = unreduced(acc);
        const n = uacc.length;
        for (let i = 0; i < n; i++) {
            this.dispatch(uacc[i]);
        }
        isReduced(acc) && this.done();
    }

    protected ensureState() {
        if (this.state >= State.DONE) {
            illegalState(`operation not allowed in state ${this.state}`);
        }
    }

    protected cleanup() {
        LOGGER.debug(this.id, "cleanup");
        this.subs.length = 0;
        delete this.parent;
        delete this.xform;
        delete this.last;
    }
}
