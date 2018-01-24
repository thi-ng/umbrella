import { Transducer } from "@thi.ng/transducers/api";
import { StreamCancel, IStream, ISubscriber, StreamSource } from "./api";
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

    subscribe<C>(xform: Transducer<T, C>, id?: string): Subscription<T, C>;
    subscribe<C>(sub: ISubscriber<T>, xform: Transducer<T, C>, id?: string): Subscription<T, C>;
    subscribe(sub: ISubscriber<T>, id?: string): Subscription<T, T>;
    subscribe(...args: any[]) {
        const wrapped = super.subscribe.apply(this, args);
        if (this.subs.length === 1) {
            this._cancel = (this.src && this.src(this)) || (() => void 0);
        }
        return wrapped;
    }

    transform<B>(xform: Transducer<T, B>, id?: string): Subscription<T, B> {
        const wrapped = super.subscribe(xform, id);
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

    error(_, e: Error) {
        super.error(_, e);
        this.cancel();
    }

    cancel() {
        if (this._cancel) {
            console.log(this.id, "cancel");
            this._cancel();
            delete this._cancel;
        }
    }
}
