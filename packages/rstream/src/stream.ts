import { isString } from "@thi.ng/checks/is-string";
import { illegalArity } from "@thi.ng/errors/illegal-arity";
import { Transducer } from "@thi.ng/transducers/api";

import {
    DEBUG,
    IStream,
    ISubscriber,
    StreamCancel,
    StreamSource
} from "./api";
import { Subscription } from "./subscription";

/**
 * Creates a new `Stream` instance, optionally with given `StreamSource`
 * function and / or ID. If a `src` function is provided, the function
 * will be only called (with the `Stream` instance as single argument)
 * once the first subscriber has attached to the stream. If the function
 * returns another function, it will be used for cleanup purposes if the
 * stream is cancelled, e.g. if the last subscriber has unsubscribed.
 *
 * Streams are intended as (primarily async) data sources in a dataflow
 * graph and are the primary construct for the various `from*()`
 * functions provided by the package. However, streams can also be
 * triggered manually (from outside the stream), in which case the user
 * should call `stream.next()` to cause value propagation.
 *
 * ```
 * a = stream((s) => {
 *   s.next(1);
 *   s.next(2);
 *   s.done()
 * });
 * a.subscribe(trace("a:"))
 * // a: 1
 * // a: 2
 * // a: done
 * ```
 *
 * `Stream` (like `Subscription`) implements the @thi.ng/api `IDeref`
 * interface which provides read access to the stream's last received
 * value. This is useful for UI purposes, e.g. in combination with
 * @thi.ng/hdom, which supports direct embedding of streams into UI
 * components (will be deref'd automatically).
 *
 * @param id
 * @param src
 */
export function stream(): Stream<any>;
export function stream(id: string): Stream<any>;
export function stream<T>(src: StreamSource<T>);
export function stream<T>(src: StreamSource<T>, id: string);
export function stream(src?, id?) {
    return new Stream(src, id);
}

export class Stream<T> extends Subscription<T, T>
    implements IStream<T> {

    static NEXT_ID = 0;

    src: StreamSource<T>;

    protected _cancel: StreamCancel;

    constructor();
    constructor(id: string);
    constructor(src: StreamSource<T>);
    constructor(src: StreamSource<T>, id: string);
    constructor(...args: any[]) {
        let src, id;
        switch (args.length) {
            case 0:
                break;
            case 1:
                if (isString(args[0])) {
                    id = args[0];
                } else {
                    src = args[0];
                }
                break;
            case 2:
                [src, id] = args;
                break;
            default:
                illegalArity(args.length);
        }
        super(null, null, null, id || `stream-${Stream.NEXT_ID++}`);
        this.src = src;
    }

    subscribe<C>(sub: Partial<ISubscriber<C>>, xform: Transducer<T, C>, id?: string): Subscription<T, C>;
    // subscribe<S extends Subscription<T, C>, C>(sub: S): S;
    subscribe<C>(sub: Subscription<T, C>): Subscription<T, C>;
    subscribe<C>(xform: Transducer<T, C>, id?: string): Subscription<T, C>;
    subscribe(sub: Partial<ISubscriber<T>>, id?: string): Subscription<T, T>;
    subscribe(...args: any[]) {
        const wrapped = super.subscribe.apply(this, args);
        if (this.subs.length === 1) {
            this._cancel = (this.src && this.src(this)) || (() => void 0);
        }
        return wrapped;
    }

    unsubscribe(sub?: Subscription<T, any>) {
        const res = super.unsubscribe(sub);
        if (res && (!sub || (!this.subs || !this.subs.length))) {
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
            DEBUG && console.log(this.id, "cancel");
            const f = this._cancel;
            delete this._cancel;
            f();
        }
    }
}
