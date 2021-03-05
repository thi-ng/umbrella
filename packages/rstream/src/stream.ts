import { isFunction } from "@thi.ng/checks";
import type { Transducer } from "@thi.ng/transducers";
import {
    CloseMode,
    CommonOpts,
    IStream,
    ISubscriber,
    LOGGER,
    StreamCancel,
    StreamSource,
} from "./api";
import { Subscription } from "./subscription";
import { optsWithID } from "./utils/idgen";

/**
 * Creates a new {@link Stream} instance, optionally with given
 * `StreamSource` function and / or options.
 *
 * @remarks
 * If a `src` function is provided, the function will be only called
 * (with the `Stream` instance as single argument) once the first
 * subscriber has attached to the stream. If the function returns
 * another function, it will be used for cleanup purposes if the stream
 * is cancelled, e.g. if the first / last subscriber has unsubscribed
 * (depending on `closeOut` option). Streams are intended as (primarily
 * async) data sources in a dataflow graph and are the primary construct
 * for the various `from*()` functions provided by this package.
 * However, streams can also be triggered manually (from outside the
 * stream), in which case the user should call `stream.next()` to cause
 * value propagation.
 *
 * Streams (like {@link Subscription}) implement the
 * {@link @thi.ng/api#IDeref} interface which provides read access to a
 * stream's last received value. This is useful for various purposes,
 * e.g. in combination with {@link @thi.ng/hdom# | @thi.ng/hdom}, which
 * supports direct embedding of streams (i.e. their values) into UI
 * components (and will be deref them automatically). If the stream has
 * not yet emitted a value, value caching is disabled or if the stream
 * is done, it will deref to `undefined`.
 *
 * @example
 * ```ts
 * a = stream((s) => {
 *     s.next(1);
 *     s.next(2);
 *     s.done()
 * });
 * a.subscribe(trace("a"))
 * // a 1
 * // a 2
 * // a done
 *
 * // as reactive value mechanism
 * b = stream();
 * // or alternatively
 * // b = subscription();
 *
 * b.subscribe(trace("b1"));
 * b.subscribe(trace("b2"));
 *
 * // external / manual trigger
 * b.next(42);
 * // b1 42
 * // b2 42
 * ```
 *
 * @param src -
 * @param opts -
 */
export function stream<T>(opts?: Partial<CommonOpts>): Stream<T>;
// prettier-ignore
export function stream<T>(src: StreamSource<T>, opts?: Partial<CommonOpts>): Stream<T>;
export function stream<T>(src?: any, opts?: Partial<CommonOpts>): Stream<T> {
    return new Stream<T>(src, opts);
}

/**
 * Syntax sugar for {@link stream}. Creates new stream which is
 * immediately seeded with initial `val` and configured with optional
 * `opts`.
 *
 * @param val -
 * @param opts -
 */
export const reactive = <T>(val: T, opts?: Partial<CommonOpts>) => {
    const res = new Stream<T>(opts);
    res.next(val);
    return res;
};

/**
 * @see {@link stream} & {@link reactive} for reference & examples.
 */
export class Stream<T> extends Subscription<T, T> implements IStream<T> {
    src?: StreamSource<T>;

    protected _cancel: StreamCancel | undefined;
    protected _inited: boolean;

    constructor(opts?: Partial<CommonOpts>);
    constructor(src: StreamSource<T>, opts?: Partial<CommonOpts>);
    // prettier-ignore
    constructor(src?: StreamSource<T> | Partial<CommonOpts>, opts?: Partial<CommonOpts>) {
        const [_src, _opts] = isFunction(src) ? [src, opts] : [undefined, src];
        super(undefined, optsWithID("stream", _opts));
        this.src = _src;
        this._inited = false;
    }

    subscribe(
        sub: ISubscriber<T>,
        opts?: Partial<CommonOpts>
    ): Subscription<T, T>;
    subscribe<C>(sub: Subscription<T, C>): Subscription<T, C>;
    subscribe<C>(
        sub: Partial<ISubscriber<C>>,
        xform: Transducer<T, C>,
        opts?: Partial<CommonOpts>
    ): Subscription<T, C>;
    subscribe(...args: any[]): any {
        const sub = super.subscribe.apply(this, <any>args);
        if (!this._inited) {
            this._cancel = (this.src && this.src(this)) || (() => void 0);
            this._inited = true;
        }
        return sub;
    }

    unsubscribe(sub?: Subscription<T, any>) {
        const res = super.unsubscribe(sub);
        if (
            res &&
            (!sub ||
                ((!this.subs || !this.subs.length) &&
                    this.closeOut !== CloseMode.NEVER))
        ) {
            this.cancel();
        }
        return res;
    }

    done() {
        this.cancel();
        super.done();
        delete this.src;
        delete this._cancel;
    }

    error(e: any) {
        super.error(e);
        this.cancel();
    }

    cancel() {
        if (this._cancel) {
            LOGGER.debug(this.id, "cancel");
            const f = this._cancel;
            delete this._cancel;
            f();
        }
    }
}
