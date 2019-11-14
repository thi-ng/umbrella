import { IID, IObjectOf } from "@thi.ng/api";
import { isPlainObject } from "@thi.ng/checks";
import {
    comp,
    labeled,
    mapVals,
    partitionSync,
    Transducer
} from "@thi.ng/transducers";
import {
    CloseMode,
    ISubscribable,
    LOGGER,
    State
} from "./api";
import { Subscription } from "./subscription";
import { closeMode } from "./utils/close";
import { nextID } from "./utils/idgen";

export interface StreamSyncOpts<A, B> extends IID<string> {
    /**
     * Either an array or object of input streams / subscribables. If
     * the latter, the object keys are used to label the inputs, else
     * their `id` is used as label.
     */
    src: ISubscribable<A>[] | IObjectOf<ISubscribable<A>>;
    /**
     * Optional transducer applied to the synced result tuple objects.
     */
    xform: Transducer<IObjectOf<A>, B>;
    /**
     * If true, *no* input synchronization (waiting for values) is
     * applied and {@link StreamSync} will emit potentially partially
     * populated tuple objects for each received input value. However,
     * as with the default behavior, tuples will retain the most recent
     * consumed value from other inputs.
     *
     * @defaultValue false
     */
    mergeOnly: boolean;
    /**
     * If true, StreamSync waits for new values from *all* inputs before
     * a new tuple is produced. If false, that synchronization
     * only happens for the very first tuple.
     *
     * @defaultValue false
     */
    reset: boolean;
    /**
     * By default, the last emitted tuple is allowed to be incomplete
     * (in case all inputs closed). To only allow complete tuples, set
     * the `all` to false.
     *
     * @defaultValue true
     */
    all: boolean;
    /**
     * If false or `CloseMode.NEVER`, StreamSync stays active even if
     * all inputs are done. If true, or `CloseMode.LAST`, the
     * StreamSync closes when the last input is done. If
     * `CloseMode.FIRST`, the instance closes when the first input is
     * done.
     *
     * @defaultValue true
     */
    close: boolean | CloseMode;
}

/**
 * Similar to {@link StreamMerge}, but with extra synchronization of
 * inputs. Before emitting any new values, {@link StreamSync} collects
 * values until at least one has been received from *all* inputs. Once
 * that's the case, the collected values are sent as labeled tuple
 * object to downstream subscribers. Each value in the emitted tuple
 * objects is stored under their input stream's ID. Only the last value
 * received from each input is passed on. After the initial tuple has
 * been emitted, you can choose from two possible behaviors:
 *
 * 1) Any future change in any input will produce a new result tuple.
 *    These tuples will retain the most recently read values from other
 *    inputs. This behavior is the default and illustrated in the above
 *    schematic.
 * 2) If the `reset` option is `true`, every input will have to provide
 *    at least one new value again until another result tuple is
 *    produced.
 *
 * Any done inputs are automatically removed. By default,
 * {@link StreamSync} calls `done()` when the last active input is done,
 * but this behavior can be overridden via the `close` constructor
 * option.
 *
 * @example
 * ```ts
 * const a = rs.stream();
 * const b = rs.stream();
 * s = sync({ src: { a, b } }).subscribe(trace("result: "));
 * a.next(1);
 * b.next(2);
 * // result: { a: 1, b: 2 }
 * ```
 *
 * Input streams can be added and removed dynamically and the emitted
 * tuple size adjusts to the current number of inputs (the next time a
 * value is received from any input).
 *
 * If the `reset` option is enabled, the last emitted tuple is allowed
 * to be incomplete, by default. To only allow complete tuples, also set
 * the `all` option to `false`.
 *
 * The synchronization is done via the {@link @thi.ng/transducers#partitionSync}
 * transducer fro the {@link @thi.ng/transducers# | @thi.ng/transducers} package. See this function's
 * docs for further details.
 *
 * {@link StreamSyncOpts}
 *
 * @param opts -
 */
export const sync = <A, B>(opts: Partial<StreamSyncOpts<A, B>>) =>
    new StreamSync(opts);

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
    /**
     * closing behavior
     */
    closeMode: CloseMode;

    constructor(opts: Partial<StreamSyncOpts<A, B>>) {
        let srcIDs = new Set<string>();
        let xform: Transducer<[string, A], any> = comp(
            partitionSync(srcIDs, {
                key: (x) => x[0],
                mergeOnly: opts.mergeOnly === true,
                reset: opts.reset === true,
                all: opts.all !== false
            }),
            mapVals((x) => x[1])
        );
        if (opts.xform) {
            xform = comp(xform, opts.xform);
        }
        super(
            undefined,
            <Transducer<any, any>>xform,
            undefined,
            opts.id || `streamsync-${nextID()}`
        );
        this.sources = new Map();
        this.realSourceIDs = new Map();
        this.invRealSourceIDs = new Map();
        this.idSources = new Map();
        this.sourceIDs = srcIDs;
        this.closeMode = closeMode(opts.close);
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
                    next: (x: any) => {
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
                this.add((<any>src)[id], id);
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
            const id = this.invRealSourceIDs.get(src.id)!;
            LOGGER.info(`removing src: ${src.id} (${id})`);
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
        const src = this.getSourceForID(id);
        if (src) {
            return this.remove(src);
        }
        return false;
    }

    removeAll(src: ISubscribable<A>[]) {
        // pre-remove all source ids for partitionSync
        for (let s of src) {
            this.sourceIDs.delete(this.invRealSourceIDs.get(s.id)!);
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

    getSourceForID(id: string) {
        return this.idSources.get(this.realSourceIDs.get(id)!);
    }

    getSources() {
        const res: IObjectOf<ISubscribable<A>> = {};
        for (let [id, src] of this.idSources) {
            res[this.invRealSourceIDs.get(id)!] = src;
        }
        return res;
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
        if (
            this.closeMode === CloseMode.FIRST ||
            (this.closeMode === CloseMode.LAST && !this.sources.size)
        ) {
            this.done();
        }
    }
}
