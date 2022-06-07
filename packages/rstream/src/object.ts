import type { Keys, Predicate2 } from "@thi.ng/api";
import { dedupe } from "@thi.ng/transducers/dedupe";
import type { CommonOpts, SubscriptionOpts } from "./api.js";
import { __nextID } from "./idgen.js";
import { Subscription, subscription } from "./subscription.js";

export type KeyStreams<T, K extends Keys<T>> = {
    [id in K]-?: Subscription<T[id], T[id]>;
};

/**
 * Result object type for {@link fromObject}.
 */
export interface StreamObj<T, K extends Keys<T>> {
    /**
     * Object of managed & typed streams for registered keys.
     */
    streams: KeyStreams<T, K>;
    /**
     * Feeds new values from `x` to each registered key's stream.
     * Satifies {@link ISubscriber.next} interface.
     *
     * @param x -
     */
    next(x: T): void;
    /**
     * Calls {@link ISubscriber.done} for all streams created. Satifies
     * {@link ISubscriber.done} interface.
     */
    done(): void;
}

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
     * If true, attaches {@link @thi.ng/transducers#dedupe} transducer
     * to each key's value stream to avoid obsolete downstream
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
 * {@link StreamObjOpts}). Creates a new object and for each selected
 * key creates a new stream, optionally seeded with the key's value in
 * `src`. Returns new object of streams.
 *
 * @remarks
 * The structure of the returned object is
 * {@link StreamObj | as follows}:
 *
 * ```ts
 * {
 *   streams: { ... },
 *   next(x): void;
 *   done(): void;
 * }
 * ```
 *
 * All streams will be stored under `streams`. The `next()` and `done()`
 * functions/methods allow the object itself to be used as subscriber
 * for an upstream subscribable (see 2nd example below):
 *
 * - `next()` - takes a object of same type as `src` and feeds each
 *   key's new value into its respective stream. If the `defaults`
 *   option is given, `undefined` key values are replaced with their
 *   specified default. If `dedupe` is enabled (default) only changed
 *   values (as per `equiv` predicate option) will be propagated
 *   downstream.
 * - `done()` - calls {@link ISubscriber.done} on all streams
 *
 * The optional `opts` arg is used to customize overall behavior of
 * `fromObject` and specify shared options for *all* created streams.
 *
 * @example
 * ```ts
 * type Foo = { a?: number; b: string; };
 *
 * const obj = fromObject(<Foo>{ a: 1, b: "foo" })
 *
 * obj.streams.a.subscribe(trace("a"))
 * // a 1
 * obj.streams.b.subscribe(trace("b"))
 * // b foo
 *
 * obj.next({ b: "bar" })
 * // a undefined
 * // b bar
 * ```
 *
 * @example
 * ```ts
 * const obj = fromObject(<Foo>{}, ["a", "b"], { initial: false });
 * obj.streams.a.subscribe(trace("a"));
 * obj.streams.b.subscribe(trace("b"));
 *
 * const src = subscription<Foo, Foo>();
 * // use as subscriber
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
export const fromObject = <T, K extends Keys<T>>(
    src: T,
    opts: Partial<StreamObjOpts<T, K>> = {}
) => {
    const id = opts.id || `obj${__nextID()}`;
    const keys = opts.keys || <K[]>Object.keys(src);
    const _opts: Partial<SubscriptionOpts<any, any>> =
        opts.dedupe !== false
            ? {
                  xform: dedupe<any>(opts.equiv || ((a, b) => a === b)),
                  ...opts,
              }
            : opts;
    const streams: any = {};
    for (let k of keys) {
        streams[k] = subscription(undefined, {
            ..._opts,
            id: `${id}-${String(k)}`,
        });
    }
    const res = <StreamObj<T, K>>{
        streams,
        next(state) {
            for (let k of keys) {
                const val = state[k];
                streams[k].next(
                    opts.defaults && val === undefined ? opts.defaults[k] : val
                );
            }
        },
        done() {
            for (let k of keys) {
                streams[k].done();
            }
        },
    };
    opts.initial !== false && res.next(src);
    return res;
};
