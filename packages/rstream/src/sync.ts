import type { Always, Derefed, IObjectOf } from "@thi.ng/api";
import { comp } from "@thi.ng/transducers/comp";
import { labeled } from "@thi.ng/transducers/labeled";
import { mapVals } from "@thi.ng/transducers/map-vals";
import {
	partitionSync,
	type PartitionSync,
} from "@thi.ng/transducers/partition-sync";
import type { ISubscribable, ISubscription, TransformableOpts } from "./api.js";
import { isFirstOrLastInput } from "./checks.js";
import { __optsWithID } from "./idgen.js";
import { __removeAllIDs } from "./internal/remove.js";
import { LOGGER } from "./logger.js";
import { Subscription } from "./subscription.js";

export type SyncTuple<T extends IObjectOf<ISubscribable<any>>> = {
	[id in keyof T]: Always<Derefed<T[id]>>;
};

export interface StreamSyncOpts<
	A extends IObjectOf<ISubscribable<any>>,
	B = SyncTuple<A>
> extends TransformableOpts<SyncTuple<A>, B> {
	/**
	 * An object of input streams / subscribables. The object keys are used to
	 * label the inputs in the result tuple object.
	 */
	src: A;
	/**
	 * If true (default: false) *no* input synchronization (waiting for
	 * values) is applied and `StreamSync` will emit potentially
	 * partially populated tuple objects for each received input value.
	 * However, as with the default behavior, tuples will retain the
	 * most recent consumed value from other inputs.
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
	 * If greater than 0, then each labeled input will cache upto the
	 * stated number of input values, even if other inputs have not yet
	 * produced new values. Once the limit is reached, `partitionSync()`
	 * will throw an `IllegalState` error.
	 *
	 * Enabling this option will cause the same behavior as if `reset`
	 * is enabled (regardless of the actual configured `reset` setting).
	 * I.e. new results are only produced when ALL required inputs have
	 * available values...
	 */
	backPressure: number;
	/**
	 * Remove previously received value of an input in result tuple when
	 * input is removed.
	 *
	 * @defaultValue false
	 */
	clean: boolean;
}

/**
 * Similar to {@link StreamMerge}, but with extra synchronization of inputs.
 * Before emitting any new values, {@link StreamSync} collects values until at
 * least one has been received from *all* inputs. Once that's the case, the
 * collected values are sent as labeled tuple object to downstream subscribers.
 *
 * @remarks
 * Each value in the emitted tuple objects is stored under their input stream's
 * ID. Only the last value received from each input is passed on. After the
 * initial tuple has been emitted, you can choose from two possible behaviors:
 *
 * 1) Any future change in any input will produce a new result tuple. These
 *    tuples will retain the most recently read values from other inputs. This
 *    behavior is the default and illustrated in the above schematic.
 * 2) If the `reset` option is `true`, every input will have to provide at least
 *    one new value again until another result tuple is produced.
 *
 * Any done inputs are automatically removed. By default, `StreamSync` calls
 * {@link ISubscriber.done} when the last active input is done, but this
 * behavior can be overridden via the provided options.
 *
 * Input streams can be added and removed dynamically and the emitted tuple size
 * adjusts to the current number of inputs (the next time a value is received
 * from any input). After an input is removed (or done) its last received value
 * can also be removed from the result tuple. This behavior can be configured
 * via the `clean` option given to `sync()` (disabled by default).
 *
 * If the `reset` option is enabled, the last emitted tuple is allowed to be
 * incomplete, by default. To only allow complete tuples, also set the `all`
 * option to `false`.
 *
 * The synchronization is done via the
 * [`partitionSync()`](https://docs.thi.ng/umbrella/transducers/functions/partitionSync-1.html)
 * transducer from the [`thi.ng/transducers`](https://thi.ng/transducers)
 * package. See this function's docs for further details.
 *
 * @example
 * ```ts
 * import { stream, sync, trace } from "@thi.ng/rstream";
 *
 * const a = stream();
 * const b = stream();
 * s = sync({ src: { a, b } }).subscribe(trace("result: "));
 * a.next(1);
 * b.next(2);
 * // result: { a: 1, b: 2 }
 * ```
 *
 * Also see: {@link StreamSyncOpts}
 *
 * @param opts -
 */
export const sync = <A extends IObjectOf<ISubscribable<any>>, B = SyncTuple<A>>(
	opts: Partial<StreamSyncOpts<A, B>>
) => new StreamSync<A, B>(opts);

/**
 * @see {@link sync} for reference & examples.
 */
export class StreamSync<
	A extends IObjectOf<ISubscribable<any>>,
	B = SyncTuple<A>
> extends Subscription<any, B> {
	/**
	 * maps actual inputs to their virtual input subs
	 */
	sources: Map<ISubscribable<any>, ISubscription<any, [string, any]>>;
	/**
	 * maps real source IDs to their actual input
	 */
	idSources: Map<string, ISubscribable<any>>;
	/**
	 * maps (potentially aliased) input IDs to their actual src.id
	 */
	realSourceIDs: Map<string, string>;
	/**
	 * maps real src.id to (potentially aliased) input IDs
	 */
	invRealSourceIDs: Map<string, string>;
	psync: PartitionSync<[string, any]>;
	clean: boolean;

	constructor(opts: Partial<StreamSyncOpts<A, B>>) {
		const psync = partitionSync<[string, any]>(new Set<string>(), {
			key: (x) => x[0],
			mergeOnly: opts.mergeOnly === true,
			reset: opts.reset === true,
			all: opts.all !== false,
			backPressure: opts.backPressure || 0,
		});
		const mapv = mapVals((x: [string, any]) => x[1]);
		super(
			undefined,
			__optsWithID("streamsync", <Partial<StreamSyncOpts<any, any>>>{
				...opts,
				xform: opts.xform
					? comp(psync, <any>mapv, opts.xform)
					: comp(psync, mapv),
			})
		);
		this.sources = new Map();
		this.realSourceIDs = new Map();
		this.invRealSourceIDs = new Map();
		this.idSources = new Map();
		this.psync = psync;
		this.clean = !!opts.clean;
		opts.src && this.addAll(opts.src);
	}

	add(src: ISubscribable<any>, id?: string) {
		id || (id = src.id);
		this.ensureState();
		this.psync.add(id);
		this.realSourceIDs.set(id, src.id);
		this.invRealSourceIDs.set(src.id, id);
		this.idSources.set(src.id, src);
		this.sources.set(
			src,
			src.subscribe(
				{
					next: (x: [string, any]) =>
						// if received value is sub, add it as source
						x[1] instanceof Subscription
							? this.add(x[1])
							: this.next(x),
					done: () => this.markDone(src),
					__owner: this,
				},
				{ xform: labeled<string, any>(id), id: `in-${id}` }
			)
		);
	}

	addAll(src: Partial<A>) {
		// pre-add all source ids for partitionSync
		for (let id in src) {
			this.psync.add(id);
		}
		for (let id in src) {
			this.add((<any>src)[id], id);
		}
	}

	remove(src: ISubscribable<any>) {
		const sub = this.sources.get(src);
		if (sub) {
			const id = this.invRealSourceIDs.get(src.id)!;
			LOGGER.info(`removing src: ${src.id} (${id})`);
			this.psync.delete(id, this.clean);
			this.realSourceIDs.delete(id);
			this.invRealSourceIDs.delete(src.id);
			this.idSources.delete(src.id);
			this.sources.delete(src);
			sub.unsubscribe();
			return true;
		}
		return false;
	}

	removeID(id: string) {
		const src = this.getSourceForID(id);
		return src ? this.remove(src) : false;
	}

	removeAll(src: Iterable<ISubscribable<any>>) {
		// pre-remove all source ids for partitionSync
		for (let s of src) {
			this.psync.delete(this.invRealSourceIDs.get(s.id)!);
		}
		let ok = true;
		for (let s of src) {
			ok = this.remove(s) && ok;
		}
		return ok;
	}

	removeAllIDs(ids: Iterable<string>) {
		return __removeAllIDs(this, ids);
	}

	getSourceForID(id: string) {
		return this.idSources.get(this.realSourceIDs.get(id)!);
	}

	getSources() {
		const res: any = {};
		for (let [id, src] of this.idSources) {
			res[this.invRealSourceIDs.get(id)!] = src;
		}
		return <A>res;
	}

	unsubscribe(sub?: ISubscription<B, any>) {
		if (!sub) {
			LOGGER.debug(this.id, "unsub sources");
			for (let s of this.sources.values()) {
				s.unsubscribe();
			}
			this.sources.clear();
			this.psync.clear();
			this.realSourceIDs.clear();
			this.invRealSourceIDs.clear();
			this.idSources.clear();
		}
		return super.unsubscribe(sub);
	}

	protected markDone(src: ISubscribable<any>) {
		this.remove(src);
		isFirstOrLastInput(this.closeIn, this.sources.size) && this.done();
	}
}
