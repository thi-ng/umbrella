import { IID } from "@thi.ng/api/api";
import { Transducer } from "@thi.ng/transducers/api";

import { ISubscribable, State } from "./api";
import { Subscription } from "./subscription";

export interface StreamMergeOpts<A, B> extends IID<string> {
    src: Iterable<ISubscribable<A>>;
    xform: Transducer<A, B>;
    close: boolean;
}

/**
 * Subscription type consuming inputs from multiple inputs and passing
 * received values on to any subscribers. Input streams can be added and
 * removed dynamically. By default, the StreamMerge calls `done()` when
 * the last active input is done, but this behavior can be overridden via
 * the `close` constructor option (set to `false`).
 */
export class StreamMerge<A, B> extends Subscription<A, B> {

    sources: ISubscribable<A>[];
    wrappedSources: Subscription<A, any>[];
    autoClose: boolean;

    constructor(opts?: Partial<StreamMergeOpts<A, B>>) {
        opts = opts || {};
        super(null, opts.xform, null, opts.id || `streammerge-${Subscription.NEXT_ID++}`);
        this.sources = [];
        this.wrappedSources = [];
        this.autoClose = opts.close !== false;
        if (opts.src) {
            this.addAll(opts.src);
        }
    }

    add(src: ISubscribable<A>) {
        this.ensureState();
        this.wrappedSources.push(
            src.subscribe({
                next: (x) => this.next(x),
                done: () => this.markDone(src)
            }));
        this.sources.push(src);
    }

    addAll(src: Iterable<ISubscribable<A>>) {
        for (let s of src) {
            this.add(s);
        }
    }

    remove(src: ISubscribable<A>) {
        const idx = this.sources.indexOf(src);
        if (idx >= 0) {
            this.sources.splice(idx, 1);
            const sub = this.wrappedSources.splice(idx, 1)[0];
            sub.unsubscribe();
        }
    }

    removeAll(src: Iterable<ISubscribable<A>>) {
        for (let s of src) {
            this.remove(s);
        }
    }

    unsubscribe(sub?: Subscription<B, any>) {
        if (!sub) {
            for (let s of this.wrappedSources) {
                s.unsubscribe();
            }
            this.state = State.DONE;
            delete this.sources;
            delete this.wrappedSources;
            return true;
        }
        if (super.unsubscribe(sub)) {
            if (!this.subs.length) {
                return this.unsubscribe();
            }
            return true;
        }
        return false;
    }

    done() {
        super.done();
        delete this.wrappedSources;
    }

    protected markDone(src: ISubscribable<A>) {
        this.remove(src);
        if (this.autoClose && !this.sources.length) {
            this.done();
        }
    }
}
