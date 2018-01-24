import { isFunction } from "@thi.ng/checks/is-function";
import { isString } from "@thi.ng/checks/is-string";
import { Transducer } from "@thi.ng/transducers/api";
import { ISubscribable } from "./api";
import { Subscription } from "./subscription";

export class StreamMerge<A, B> extends Subscription<A, B> {

    sources: ISubscribable<A>[];
    wrappedSources: Subscription<A, any>[];

    constructor(sources: Iterable<ISubscribable<A>>, id?: string);
    constructor(xform: Transducer<A, B>, id?: string);
    constructor(sources: Iterable<ISubscribable<A>>, xform: Transducer<A, B>, id?: string);
    constructor(...args: any[]) {
        let id = isString(args[args.length - 1]) ? args.pop() : `streammerge-${Subscription.NEXT_ID++}`,
            src, xform;
        switch (args.length) {
            case 2:
                src = args[0];
                xform = args[1];
                break;
            case 1:
                if (isFunction(args[0])) {
                    xform = args[0];
                } else {
                    src = args[0];
                }
                break;
            default:
                throw new Error(`illegal arity ${args.length}`);
        }
        super(null, xform, null, id);
        this.sources = [];
        this.wrappedSources = [];
        if (src) {
            for (let s of src) {
                this.add(s);
            }
        }
    }

    add(src: ISubscribable<A>) {
        this.sources.push(src);
        this.wrappedSources.push(
            src.subscribe({
                next: (x) => this.next(x),
                done: () => this.markDone(src)
            }));
    }

    remove(src: ISubscribable<A>) {
        const idx = this.sources.indexOf(src);
        if (idx >= 0) {
            this.sources.splice(idx, 1);
            const sub = this.wrappedSources.splice(idx, 1)[0];
            sub.unsubscribe();
        }
    }

    unsubscribe(sub?: Subscription<B, any>) {
        if (!sub) {
            for (let s of this.wrappedSources) {
                s.unsubscribe();
            }
            delete this.wrappedSources;
            return true;
        }
        return super.unsubscribe(sub);
    }

    done() {
        super.done();
        delete this.wrappedSources;
    }

    protected markDone(src: ISubscribable<A>) {
        this.remove(src);
        if (!this.sources.length) {
            this.done();
        }
    }
}
