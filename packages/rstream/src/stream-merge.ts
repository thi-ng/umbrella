import { IID } from "@thi.ng/api/api";
import { Transducer } from "@thi.ng/transducers/api";

import { ISubscribable, State } from "./api";
import { Subscription } from "./subscription";

export interface StreamMergeOpts<A, B> extends IID<string> {
    /**
     * Input sources.
     */
    src: ISubscribable<A>[];
    /**
     * Optional transducer applied to each input value.
     */
    xform: Transducer<A, B>;
    /**
     * If true (default), the `StreamMerge` closes once all inputs are
     * exhausted. Set to false to keep the instance alive, regardless of
     * inputs.
     */
    close: boolean;
}

/**
 * Returns a new `StreamMerge` instance, a subscription type consuming
 * inputs from multiple inputs and passing received values on to any
 * subscribers. Input streams can be added and removed dynamically. By
 * default, `StreamMerge` calls `done()` when the last active input is
 * done, but this behavior can be overridden via the `close` option (set
 * it to `false`).
 *
 * ```
 * merge({
 *     // input streams w/ different frequencies
 *     src: [
 *         fromIterable([1, 2, 3], 10),
 *         fromIterable([10, 20, 30], 21),
 *         fromIterable([100, 200, 300], 7)
 *     ]
 * }).subscribe(trace());
 * // 100
 * // 1
 * // 200
 * // 10
 * // 2
 * // 300
 * // 3
 * // 20
 * // 30
 * ```
 *
 * Use the `labeled()` transducer for each input to create a stream of
 * labeled values and track their provenance:
 *
 * ```ts
 * merge({
 *     src: [
 *         fromIterable([1, 2, 3]).transform(labeled("a")),
 *         fromIterable([10, 20, 30]).transform(labeled("b")),
 *     ]
 * }).subscribe(trace());
 * // ["a", 1]
 * // ["b", 10]
 * // ["a", 2]
 * // ["b", 20]
 * // ["a", 3]
 * // ["b", 30]
 * ```
 */
export function merge<A, B>(opts?: Partial<StreamMergeOpts<A, B>>) {
    return new StreamMerge(opts);
}

export class StreamMerge<A, B> extends Subscription<A, B> {

    sources: Map<ISubscribable<A>, Subscription<A, any>>;
    autoClose: boolean;

    constructor(opts?: Partial<StreamMergeOpts<A, B>>) {
        opts = opts || {};
        super(null, opts.xform, null, opts.id || `streammerge-${Subscription.NEXT_ID++}`);
        this.sources = new Map();
        this.autoClose = opts.close !== false;
        if (opts.src) {
            this.addAll(opts.src);
        }
    }

    add(src: ISubscribable<A>) {
        this.ensureState();
        this.sources.set(
            src,
            src.subscribe(
                {
                    next: (x) => {
                        if (x instanceof Subscription) {
                            this.add(x);
                        } else {
                            this.next(x);
                        }
                    },
                    done: () => this.markDone(src),
                    __owner: this
                },
                `in-${src.id}`
            )
        );
    }

    addAll(src: ISubscribable<A>[]) {
        for (let s of src) {
            this.add(s);
        }
    }

    remove(src: ISubscribable<A>) {
        const sub = this.sources.get(src);
        if (sub) {
            this.sources.delete(src);
            sub.unsubscribe();
            return true;
        }
        return false;
    }

    removeID(id: string) {
        for (let s of this.sources) {
            if (s[0].id === id) {
                return this.remove(s[0]);
            }
        }
        return false;
    }

    removeAll(src: ISubscribable<A>[]) {
        let ok = true;
        for (let s of src) {
            ok = this.remove(s) && ok;
        }
        return ok;
    }

    removeAllIDs(ids: string[]) {
        let ok = true;
        for (let id of ids) {
            ok = this.removeID(id) && ok;
        }
        return ok;
    }

    unsubscribe(sub?: Subscription<B, any>) {
        if (!sub) {
            for (let s of this.sources.values()) {
                s.unsubscribe();
            }
            this.state = State.DONE;
            this.sources.clear();
        }
        return super.unsubscribe(sub);
    }

    protected markDone(src: ISubscribable<A>) {
        this.remove(src);
        if (this.autoClose && !this.sources.size) {
            this.done();
        }
    }
}
