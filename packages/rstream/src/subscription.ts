import type { Fn } from "@thi.ng/api";
import { SEMAPHORE } from "@thi.ng/api/api";
import { peek } from "@thi.ng/arrays/peek";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { assert } from "@thi.ng/errors/assert";
import { illegalState } from "@thi.ng/errors/illegal-state";
import { NULL_LOGGER } from "@thi.ng/logger/null";
import type { Reducer, Transducer } from "@thi.ng/transducers";
import { comp } from "@thi.ng/transducers/comp";
import { map } from "@thi.ng/transducers/map";
import { push } from "@thi.ng/transducers/push";
import { isReduced, Reduced, unreduced } from "@thi.ng/transducers/reduced";
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
import { optsWithID } from "./utils/idgen";

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
    sub?: Partial<ISubscriber<B>>,
    opts?: Partial<SubscriptionOpts<A, B>>
) => new Subscription(sub, opts);

export class Subscription<A, B> implements ISubscription<A, B> {
    id: string;
    closeIn: CloseMode;
    closeOut: CloseMode;
    parent?: ISubscription<any, A>;
    __owner?: ISubscription<any, any>;

    protected xform?: Reducer<B[], A>;
    protected cacheLast: boolean;
    protected last: any = SEMAPHORE;
    protected state = State.IDLE;
    protected subs: Partial<ISubscriber<B>>[] = [];

    constructor(
        protected wrapped?: Partial<ISubscriber<B>>,
        opts?: Partial<SubscriptionOpts<A, B>>
    ) {
        opts = optsWithID(`sub`, {
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

    getState() {
        return this.state;
    }

    protected setState(state: State) {
        this.state = state;
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
        let $sub: ISubscriber<any>;
        if (sub instanceof Subscription && !opts.xform) {
            sub.ensureState();
            // ensure sub is still unattached
            assert(!sub.parent, `sub '${sub.id}' already has a parent`);
            sub.parent = this;
            $sub = sub;
        } else {
            $sub = new Subscription(sub, { ...opts, parent: this });
        }
        this.subs.push($sub);
        this.setState(State.ACTIVE);
        $sub.setState(State.ACTIVE);
        this.last != SEMAPHORE && $sub.next(this.last);
        return $sub;
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

    unsubscribe(sub?: ISubscription<B, any>) {
        return sub ? this.unsubscribeChild(sub) : this.unsubscribeSelf();
    }

    protected unsubscribeSelf() {
        LOGGER.debug(this.id, "unsub self");
        this.parent && this.parent.unsubscribe(this);
        this.state < State.UNSUBSCRIBED && (this.state = State.UNSUBSCRIBED);
        this.release();
        return true;
    }

    protected unsubscribeChild(sub: ISubscription<B, any>) {
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
        this.xform ? this.dispatchXform(x) : this.dispatch(<any>x);
    }

    done() {
        LOGGER.debug(this.id, "entering done()");
        if (this.state >= State.DONE) return;
        if (this.xform) {
            if (!this.dispatchXformDone()) return;
        }
        this.state = State.DONE;
        // attempt to call .done in wrapped sub
        if (this.dispatchTo("done")) {
            // disconnect from parent & internal cleanup
            this.state < State.UNSUBSCRIBED && this.unsubscribe();
        }
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

    protected dispatchTo(type: "next" | "done" | "error", x?: B) {
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
        const subs = type === "next" ? this.subs : [...this.subs];
        for (let i = subs.length; --i >= 0; ) {
            s = subs[i];
            try {
                s[type] && s[type]!(x!);
            } catch (e) {
                if (type === "error" || !s.error || !s.error(e)) {
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

    protected ensureState() {
        if (this.state >= State.DONE) {
            illegalState(`operation not allowed in state ${this.state}`);
        }
    }

    protected release() {
        this.subs.length = 0;
        delete this.parent;
        delete this.xform;
        delete this.last;
    }
}
