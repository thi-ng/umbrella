import { isFunction } from "@thi.ng/checks/is-function";
import {
    CloseMode,
    CommonOpts,
    IStream,
    ISubscriber,
    ISubscription,
    StreamCancel,
    StreamSource,
    TransformableOpts,
    WithErrorHandlerOpts,
} from "./api.js";
import { __optsWithID } from "./idgen.js";
import { LOGGER } from "./logger.js";
import { Subscription } from "./subscription.js";

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
export function stream<T>(opts?: Partial<WithErrorHandlerOpts>): Stream<T>;
export function stream<T>(
    src: StreamSource<T>,
    opts?: Partial<WithErrorHandlerOpts>
): Stream<T>;
export function stream<T>(
    src?: any,
    opts?: Partial<WithErrorHandlerOpts>
): Stream<T> {
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

    constructor(opts?: Partial<WithErrorHandlerOpts>);
    constructor(src: StreamSource<T>, opts?: Partial<WithErrorHandlerOpts>);
    constructor(
        src?: StreamSource<T> | Partial<WithErrorHandlerOpts>,
        opts?: Partial<WithErrorHandlerOpts>
    ) {
        const [_src, _opts] = isFunction(src)
            ? [src, opts || {}]
            : [undefined, src || {}];
        super(
            _opts.error ? { error: _opts.error } : undefined,
            __optsWithID("stream", _opts)
        );
        this.src = _src;
        this._inited = false;
    }

    subscribe<C>(sub: ISubscription<T, C>): ISubscription<T, C>;
    subscribe(
        sub: Partial<ISubscriber<T>>,
        opts?: Partial<CommonOpts>
    ): ISubscription<T, T>;
    subscribe<C>(
        sub: Partial<ISubscriber<C>>,
        opts?: Partial<TransformableOpts<T, C>>
    ): ISubscription<T, C>;
    subscribe(
        sub: Partial<ISubscriber<any>>,
        opts: Partial<TransformableOpts<any, any>> = {}
    ): any {
        const $sub = super.subscribe(sub, opts);
        if (!this._inited) {
            if (this.src) {
                try {
                    this._cancel = this.src(this) || (() => void 0);
                } catch (e) {
                    let s = this.wrapped;
                    if (!s || !s.error || !s.error(e)) {
                        this.unhandledError(e);
                    }
                }
            }
            this._inited = true;
        }
        return $sub;
    }

    unsubscribe(sub?: ISubscription<T, any>) {
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
        if (super.error(e)) return true;
        this.cancel();
        return false;
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
