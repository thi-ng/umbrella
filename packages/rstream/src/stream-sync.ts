import { IID, IObjectOf } from "@thi.ng/api/api";
import { isPlainObject } from "@thi.ng/checks/is-plain-object";
import { Transducer } from "@thi.ng/transducers/api";
import { comp } from "@thi.ng/transducers/func/comp";
import { labeled } from "@thi.ng/transducers/xform/labeled";
import { mapVals } from "@thi.ng/transducers/xform/map-vals";
import { partitionSync } from "@thi.ng/transducers/xform/partition-sync";

import { ISubscribable, State } from "./api";
import { Subscription } from "./subscription";

export interface StreamSyncOpts<A, B> extends IID<string> {
    src: ISubscribable<A>[] | IObjectOf<ISubscribable<A>>;
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
 * sync = new StreamSync({src: [a=new Stream("a"), b=new Stream("b")]});
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

    /**
     * maps actual inputs to their virtual input subs
     */
    sources: Map<ISubscribable<A>, Subscription<A, [string, A]>>;
    /**
     * maps real source IDs to their actual input
     */
    idSources: Map<string, ISubscribable<A>>;
    /**
     * maps (potentially aliased) input IDs to their actual src.id
     */
    realSourceIDs: Map<string, string>;
    /**
     * maps real src.id to (potentially aliased) input IDs
     */
    invRealSourceIDs: Map<string, string>;
    /**
     * set of (potentially aliased) input IDs
     * these IDs are used to label inputs in result tuple
     */
    sourceIDs: Set<string>;
    autoClose: boolean;

    constructor(opts: Partial<StreamSyncOpts<A, B>>) {
        let srcIDs = new Set<string>();
        let xform: Transducer<any, any> = comp(
            partitionSync<A>(srcIDs, (x) => x[0], opts.reset !== false, opts.all !== false),
            mapVals((x) => x[1])
        );
        if (opts.xform) {
            xform = comp(xform, opts.xform);
        }
        super(null, xform, null, opts.id || `streamsync-${Subscription.NEXT_ID++}`);
        this.sources = new Map();
        this.realSourceIDs = new Map();
        this.invRealSourceIDs = new Map();
        this.idSources = new Map();
        this.sourceIDs = srcIDs;
        this.autoClose = opts.close !== false;
        if (opts.src) {
            this.addAll(opts.src);
        }
    }

    add(src: ISubscribable<A>, id?: string) {
        id || (id = src.id);
        this.ensureState();
        this.sourceIDs.add(id);
        this.realSourceIDs.set(id, src.id);
        this.invRealSourceIDs.set(src.id, id);
        this.idSources.set(src.id, src);
        this.sources.set(
            src,
            src.subscribe(
                {
                    next: (x) => {
                        if (x[1] instanceof Subscription) {
                            this.add(x[1]);
                        } else {
                            this.next(x);
                        }
                    },
                    done: () => this.markDone(src),
                    __owner: this
                },
                labeled<string, A>(id),
                `in-${id}`
            )
        );
    }

    addAll(src: ISubscribable<A>[] | IObjectOf<ISubscribable<A>>) {
        if (isPlainObject(src)) {
            // pre-add all source ids for partitionSync
            for (let id in src) {
                this.sourceIDs.add(id);
            }
            for (let id in src) {
                this.add(src[id], id);
            }
        } else {
            // pre-add all source ids for partitionSync
            for (let s of <ISubscribable<A>[]>src) {
                this.sourceIDs.add(s.id);
            }
            for (let s of <ISubscribable<A>[]>src) {
                this.add(s);
            }
        }
    }

    remove(src: ISubscribable<A>) {
        const sub = this.sources.get(src);
        if (sub) {
            const id = this.invRealSourceIDs.get(src.id);
            this.sourceIDs.delete(id);
            this.realSourceIDs.delete(id);
            this.idSources.delete(src.id);
            this.sources.delete(src);
            sub.unsubscribe();
            return true;
        }
        return false;
    }

    removeID(id: string) {
        const src = this.idSources.get(this.realSourceIDs.get(id));
        if (src) {
            return this.remove(src);
        }
        return false;
    }

    removeAll(src: ISubscribable<A>[]) {
        // pre-remove all source ids for partitionSync
        for (let s of src) {
            this.sourceIDs.delete(this.invRealSourceIDs.get(s.id));
        }
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
            this.sourceIDs.clear();
            this.realSourceIDs.clear();
            this.invRealSourceIDs.clear();
            this.idSources.clear();
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

export function sync<A, B>(opts: Partial<StreamSyncOpts<A, B>>) {
    return new StreamSync(opts);
}
