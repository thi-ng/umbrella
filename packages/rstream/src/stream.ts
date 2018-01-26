import { Transducer } from "@thi.ng/transducers/api";

import { DEBUG, IStream, ISubscriber, StreamCancel, StreamSource } from "./api";
import { Subscription } from "./subscription";

export class Stream<T> extends Subscription<T, T>
    implements IStream<T> {

    static NEXT_ID = 0;

    src: StreamSource<T>;

    protected _cancel: StreamCancel;

    constructor(src: StreamSource<T>, id?: string) {
        super(null, null, null, id || `stream-${Stream.NEXT_ID++}`);
        this.src = src;
    }

    subscribe(sub: Partial<ISubscriber<T>>, id?: string): Subscription<T, T>
    subscribe<C>(xform: Transducer<T, C>, id?: string): Subscription<T, C>;
    subscribe<C>(sub: Partial<ISubscriber<C>>, xform: Transducer<T, C>, id?: string): Subscription<T, C>
    subscribe(...args: any[]) {
        const wrapped = super.subscribe.apply(this, args);
        if (this.subs.length === 1) {
            this._cancel = (this.src && this.src(this)) || (() => void 0);
        }
        return wrapped;
    }

    unsubscribe(sub?: Subscription<T, any>) {
        const res = super.unsubscribe(sub);
        if (res && (!this.subs || !this.subs.length)) {
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

    error(e: Error) {
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
