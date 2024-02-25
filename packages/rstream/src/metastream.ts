import type { Fn, Nullable } from "@thi.ng/api";
import { assert } from "@thi.ng/errors/assert";
import {
	CloseMode,
	State,
	type CommonOpts,
	type ISubscription,
} from "./api.js";
import { __optsWithID } from "./idgen.js";
import { Subscription } from "./subscription.js";

export interface MetaStreamOpts extends CommonOpts {
	/**
	 * If true, emits the last received value from the metastream's
	 * current child stream (if any) when the metastream's parent is
	 * calling `.done()`.
	 *
	 * @defaultValue false
	 */
	emitLast: boolean;
}

/**
 * Returns a {@link Subscription} which transforms each incoming value into a
 * new {@link ISubscription}, subscribes to it (via an hidden / internal
 * subscription) and then only passes values from that stream to its own
 * subscribers.
 *
 * @remarks
 * If a new value is received, the metastream first unsubscribes from any still
 * active previous stream (if any), before creating and subscribing to the new
 * one. Hence this stream type is useful for cases where streams need to be
 * dynamically created & inserted into an existing dataflow topology.
 *
 * The user supplied `factory` function will be called for each incoming value
 * and is responsible for creating the new stream instances. If the function
 * returns null/undefined, no further action will be taken (acts like a filter
 * transducer).
 *
 * The factory function does NOT need to create *new* streams, but can merely
 * return other existing streams, and so making the meta stream act like a
 * switch with arbitrary criteria. However, if the meta stream itself is the
 * only subscriber to such existing input streams, you'll need to configure the
 * input's {@link CommonOpts.closeOut} option to keep them alive and support
 * dynamic switching between them.
 *
 * @example
 * ```ts
 * import { fromIterable, metaStream, trace } from "@thi.ng/rstream";
 * import { repeat } from "@thi.ng/transducers";
 *
 * // transform each received odd number into a stream
 * // producing 3 copies of that number in the metastream
 * // even numbers are ignored
 * a = metaStream(
 *   (x) => (x & 1)
 *     ? fromIterable(repeat(x, 3), { delay: 100 })
 *     : null
 * );
 *
 * a.subscribe(trace())
 * a.next(23)
 *
 * // 23
 * // 23
 * // 23
 *
 * a.next(42) // ignored by factory fn
 *
 * a.next(43)
 * // 43
 * // 43
 * // 43
 * ```
 *
 * @example
 * ```ts
 * import { fromIterable, metaStream, trace, CloseMode } from "@thi.ng/rstream";
 * import { repeat } from "@thi.ng/transducers";
 *
 * // infinite inputs
 * a = fromIterable(
 *   repeat("a"),
 *   { delay: 1000, closeOut: CloseMode.NEVER }
 * );
 * b = fromIterable(
 *   repeat("b"),
 *   { delay: 1000, closeOut: CloseMode.NEVER }
 * );
 *
 * // stream selector / switch
 * m = metaStream((x) => x ? a : b);
 * m.subscribe(trace("meta from: "));
 *
 * m.next(true);
 * // meta from: a
 *
 * m.next(false);
 * // meta from: b
 *
 * m.next(true);
 * // meta from: a
 * ```
 *
 * @param factory -
 * @param id -
 */
export const metaStream = <A, B>(
	factory: Fn<A, Nullable<ISubscription<B, B>>>,
	opts?: Partial<MetaStreamOpts>
) => new MetaStream(factory, opts);

/**
 * @see {@link metaStream} for reference & examples.
 */
export class MetaStream<A, B> extends Subscription<A, B> {
	factory: Fn<A, Nullable<ISubscription<B, B>>>;
	stream?: ISubscription<B, B>;
	sub?: ISubscription<B, B>;
	emitLast: boolean;
	doneRequested: boolean;

	constructor(
		factory: Fn<A, Nullable<ISubscription<B, B>>>,
		opts: Partial<MetaStreamOpts> = {}
	) {
		super(undefined, __optsWithID("metastram", opts));
		this.factory = factory;
		this.emitLast = opts.emitLast === true;
		this.doneRequested = false;
	}

	next(x: A) {
		if (this.state < State.DONE) {
			if (this.stream) {
				this.stream.unsubscribe(this.sub);
			}
			let stream = this.factory(x);
			if (stream) {
				this.stream = stream;
				this.sub = this.stream.subscribe({
					next: (x) => {
						stream === this.stream && super.dispatch(x);
						this.doneRequested && this.done();
					},
					done: () => {
						this.stream!.unsubscribe(this.sub);
						if (stream === this.stream) {
							this.stream = undefined;
							this.sub = undefined;
						}
					},
					error: (e) => super.error(e),
					__owner: this,
				});
			}
		}
	}

	done() {
		if (this.emitLast && !this.doneRequested) {
			this.doneRequested = true;
		} else {
			if (this.stream) {
				this.detach(true);
			}
			this.closeIn !== CloseMode.NEVER && super.done();
		}
	}

	unsubscribe(sub?: ISubscription<B, any>) {
		if (this.stream && (!sub || this.subs.length === 1)) {
			this.detach(!sub);
		}
		return super.unsubscribe(sub);
	}

	protected detach(force: boolean) {
		if (force || this.closeOut !== CloseMode.NEVER) {
			assert(!!this.stream, "input stream already removed");
			this.stream!.unsubscribe(this.sub);
			delete this.stream;
			delete this.sub;
		}
	}
}
