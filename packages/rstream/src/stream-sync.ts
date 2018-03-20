import { IObjectOf, IID } from "@thi.ng/api/api";
import { Transducer } from "@thi.ng/transducers/api";
import { comp } from "@thi.ng/transducers/func/comp";
import { labeled } from "@thi.ng/transducers/xform/labeled";
import { mapVals } from "@thi.ng/transducers/xform/map-vals";
import { partitionSync } from "@thi.ng/transducers/xform/partition-sync";

import { ISubscribable, State } from "./api";
import { Subscription } from "./subscription";

export interface StreamSyncOpts<A, B> extends IID<string> {
    src: Iterable<ISubscribable<A>>;
    xform: Transducer<IObjectOf<A>, B>;
    reset: boolean;
    all: boolean;
    close: boolean;
}

/**
 * Similar to `StreamMerge`, but with extra synchronization of inputs.
 * Before emitting any new values, `StreamSync` collects values until at
 * least one has been received from *all* inputs. Once that's the case,
 * the collected values are sent as labeled tuple object to downstream
 * subscribers and the process repeats until all inputs are exhausted.
 *
 * In addition to the default mode of operation, i.e. waiting for new
 * values from *all* inputs before another tuple is produced, the
 * behavior for *all but the first tuple* can be changed to emit new
 * tuples as soon as a new value from any input has become available
 * (with other values in the tuple remaining). This behavior can be
 * achieved by setting the `reset` ctor option to `false`.
 *
 * Each value in the emitted tuple objects is stored under their input
 * stream ID. Only the last value received from each input is passed on.
 *
 * ```
 * sync = StreamSync({src: [a=new Stream("a"), b=new Stream("b")]});
 * sync.subscribe(trace());
 *
 * a.next(1);
 * b.next(2);
 * // { a: 1, b: 2 }
 * ```
 *
 * Input streams can be added and removed dynamically and the emitted
 * tuple size adjusts to the current number of inputs. By default,
 * `StreamSync` calls `done()` when the last active input is done, but
 * this behavior can be overridden via the `close` constructor option
 * (set to `false`).
 *
 * By default, the last emitted tuple is allowed to be incomplete (in
 * case the input closed). To only allow complete tuples, set the
 * optional `all` ctor option to `false`.
 *
 * The synchronization is done via the `partitionSync()` transducer from
 * the @thi.ng/transducers package. See this function's docs for further
 * details.
 */
export class StreamSync<A, B> extends Subscription<A, B> {

    sources: Map<ISubscribable<A>, Subscription<A, [string, A]>>;
    sourceIDs: Set<string>;
    autoClose: boolean;

    constructor(opts: Partial<StreamSyncOpts<A, B>>) {
        let srcIDs = new Set<string>();
        let xform: Transducer<any, any> = comp(
            partitionSync<A>(srcIDs, (x) => x[0], opts.reset !== false, opts.all !== false),
            mapVals((x) => x[1], false)
        );
        if (opts.xform) {
            xform = comp(xform, opts.xform);
        }
        super(null, xform, null, opts.id || `streamsync-${Subscription.NEXT_ID++}`);
        this.sources = new Map();
        this.sourceIDs = srcIDs;
        this.autoClose = opts.close !== false;
        if (opts.src) {
            this.addAll(opts.src);
        }
    }

    add(src: ISubscribable<A>) {
        this.ensureState();
        this.sourceIDs.add(src.id);
        this.sources.set(
            src,
            src.subscribe(
                {
                    next: (x) => this.next(x),
                    done: () => this.markDone(src)
                },
                labeled<string, A>(src.id)
            )
        );
    }

    addAll(src: Iterable<ISubscribable<A>>) {
        for (let s of src) {
            this.add(s);
        }
    }

    remove(src: ISubscribable<A>) {
        const sub = this.sources.get(src);
        if (sub) {
            this.sourceIDs.delete(src.id);
            this.sources.delete(src);
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
            for (let s of this.sources.keys()) {
                s.unsubscribe();
            }
            this.state = State.DONE;
            this.sources.clear();
            return true;
        }
        if (super.unsubscribe(sub)) {
            if (!this.subs.size) {
                return this.unsubscribe();
            }
            return true;
        }
        return false;
    }

    protected markDone(src: ISubscribable<A>) {
        this.remove(src);
        if (this.autoClose && !this.sources.size) {
            this.done();
        }
    }
}
