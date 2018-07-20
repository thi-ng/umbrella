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
