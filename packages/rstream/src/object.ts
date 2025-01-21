// SPDX-License-Identifier: Apache-2.0
import type { IObjectOf, Keys, NumOrString, Predicate2 } from "@thi.ng/api";
import { dedupe } from "@thi.ng/transducers/dedupe";
import { range } from "@thi.ng/transducers/range";
import type { CommonOpts, ISubscription, SubscriptionOpts } from "./api.js";
import { __optsWithID } from "./idgen.js";
import { Subscription, subscription } from "./subscription.js";

export type KeyStreams<T, K extends Keys<T>> = {
	[id in K]-?: ISubscription<T[id], T[id]>;
};

export interface StreamObjOpts<T, K extends Keys<T>> extends CommonOpts {
	/**
	 * Array of selected `keys` (else selects all by default) for which
	 * to create streams.
	 */
	keys: K[];
	/**
	 * If true (default), all created streams will be seeded with key
	 * values from the source object.
	 *
	 * @defaultValue true
	 */
	initial: boolean;
	/**
	 * Default values to use for `undefined` values of registered keys.
	 */
	defaults: Partial<T>;
	/**
	 * If true, attaches
	 * [`dedupe()`](https://docs.thi.ng/umbrella/transducers/functions/dedupe.html)
	 * transducer to each key's value stream to avoid obsolete downstream
	 * propagation when a key's value hasn't actually changed.
	 *
	 * @defaultValue true
	 */
	dedupe: boolean;
	/**
	 * Generic equality predicate to be used for `dedupe` (`===` by
	 * default). Ignored if `dedupe` option is false.
	 */
	equiv: Predicate2<any>;
}

/**
 * Takes an arbitrary object `src` and object of options (see
 * {@link StreamObjOpts}). Creates a new object and for each selected key
 * creates a new subscription, optionally seeded with the key's value in `src`.
 * Returns new {@link StreamObj}.
 *
 * @remarks
 * The options arg is used to customize overall behavior of `fromObject` and
 * specify shared options for *all* created streams.
 *
 * A {@link StreamObj} is a full {@link Subscription}, in which additionally all
 * configured key streams are exposed under `streams`. The
 * {@link StreamObj.next} and {@link StreamObj.done} methods allow the
 * {@link StreamObj} itself to be used as subscriber for an upstream
 * subscribable (see 2nd example below):
 *
 * {@link StreamObj.next} receives an object of same type as `src` and feeds
 * each key's new value into its respective {@link StreamObj.streams}. If the
 * {@link StreamObjOpts.defaults} option is given, `undefined` key values are
 * replaced with their specified default. If {@link StreamObjOpts.dedupe} is
 * enabled (default) only changed values (as per {@link StreamObjOpts.equiv}
 * predicate option) will be propagated downstream.
 *
 * @example
 * ```ts tangle:../export/from-object.ts
 * import { fromObject, trace } from "@thi.ng/rstream";
 *
 * type Foo = { a?: number; b: string; };
 *
 * const obj = fromObject(<Foo>{ a: 1, b: "foo" });
 *
 * obj.streams.a.subscribe(trace("a"));
 * // a 1
 *
 * obj.streams.b.subscribe(trace("b"));
 * // b foo
 *
 * obj.next({ b: "bar" });
 * // a undefined
 * // b bar
 * ```
 *
 * @example
 * ```ts tangle:../export/from-object-2.ts
 * import { fromObject, subscription, trace } from "@thi.ng/rstream";
 *
 * type Foo = { a?: number; b: string; };
 *
 * const obj = fromObject(<Foo>{}, { keys: ["a", "b"], initial: false });
 * obj.streams.a.subscribe(trace("a"));
 * obj.streams.b.subscribe(trace("b"));
 *
 * const src = subscription<Foo, Foo>();
 * // use `obj` as subscriber itself
 * src.subscribe(obj);
 *
 * src.next({ a: 1, b: "foo" });
 * // a 1
 * // b foo
 * ```
 *
 * @param src -
 * @param opts -
 */
export const fromObject = <T extends object, K extends Keys<T>>(
	src: T,
	opts: Partial<StreamObjOpts<T, K>> = {}
) => new StreamObj<T, K>(src, opts);

/**
 * Syntax sugar for {@link fromObject} for tuple/arrays. Returns a
 * {@link StreamObj} which provides individual subscriptions for each tuple
 * element, i.e. for 1:N fanout.
 *
 * @remarks
 * This construct is very useful for UI purposes, helping to provide both
 * finegrained and tuple-based reactive state for UI components used to edit
 * tuple/vector values (e.g. via individual per-tuple-element input
 * fields/controls).
 *
 * @example
 * ```ts tangle:../export/from-tuple.ts
 * import { fromTuple, subscription, trace } from "@thi.ng/rstream";
 *
 * const tup = fromTuple([10, 20, 30]);
 *
 * tup.streams[0].subscribe(trace("[0]:"));
 * tup.streams[1].subscribe(trace("[1]:"));
 * tup.streams[2].subscribe(trace("[2]:"));
 *
 * // [0]: 10
 * // [1]: 20
 * // [2]: 30
 *
 * tup.next([100,20,30]);
 *
 * // [0]: 100
 * // (the two other streams didn't update since their values haven't changed)
 * ```
 *
 * @param src
 * @param opts
 */
export const fromTuple = <T>(
	src: T[],
	opts?: Partial<StreamObjOpts<T[], number>>
) => new StreamObj<T[], number>(src, { keys: [...range(src.length)], ...opts });

/**
 * See {@link fromObject} for details.
 */
export class StreamObj<
	T extends object,
	K extends Keys<T>
> extends Subscription<T, T> {
	/**
	 * Object of managed & typed streams for registered keys.
	 */
	keys: NumOrString[];
	streams: IObjectOf<Subscription<any, any>> = {};
	defaults?: Partial<T>;

	constructor(src: T, opts: Partial<StreamObjOpts<T, K>> = {}) {
		super(undefined, __optsWithID("obj", opts));
		this.keys = <NumOrString[]>opts.keys || Object.keys(src);
		this.defaults = opts.defaults;
		const _opts: Partial<SubscriptionOpts<any, any>> =
			opts.dedupe !== false
				? {
						xform: dedupe<any>(opts.equiv || ((a, b) => a === b)),
						...opts,
				  }
				: opts;
		for (let k of this.keys) {
			this.streams[k] = subscription(undefined, {
				..._opts,
				id: `${this.id}-${k}`,
			});
		}
		opts.initial !== false && this.next(src);
	}

	/**
	 * Receives an object of configured type and feeds each key's new value into
	 * its respective {@link StreamObj.streams}. If the
	 * {@link StreamObjOpts.defaults} option is given, `undefined` key values
	 * are replaced with their specified default. If
	 * {@link StreamObjOpts.dedupe} is enabled (default) only changed values (as
	 * per {@link StreamObjOpts.equiv} predicate option) will be propagated
	 * downstream.
	 *
	 * @param x -
	 */
	next(x: T) {
		this.cacheLast && (this.last = x);
		for (let k of this.keys) {
			const val = x[<K>k];
			this.streams[k].next(
				this.defaults && val === undefined ? this.defaults[<K>k] : val
			);
		}
		super.next(x);
	}

	done() {
		for (let k of this.keys) {
			this.streams[k].done();
		}
		super.done();
	}

	unsubscribe(sub?: ISubscription<T, any> | undefined) {
		if (!sub) {
			for (let k of this.keys) {
				this.streams[k].unsubscribe();
			}
		}
		return super.unsubscribe(sub);
	}
}
