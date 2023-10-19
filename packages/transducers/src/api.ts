import type { Comparator, Fn, Fn0, IObjectOf } from "@thi.ng/api";
import type { Reduced } from "./reduced.js";

export type Transducer<A, B> = (rfn: Reducer<any, B>) => Reducer<any, A>;

/**
 * A transducer or a custom type with a {@link IXform} implementation.
 */
export type TxLike<A, B> = Transducer<A, B> | IXform<A, B>;

/**
 * Custom version of {@link TxLike} for use with {@link multiplex} and
 * {@link multiplexObj}.
 */
export type MultiplexTxLike<T, A> = TxLike<T, A> | [TxLike<T, A>, boolean];

export type ReductionFn<A, B> = (acc: A, x: B) => A | Reduced<A>;

/**
 * A 3-tuple of functions defining the different stages of a reduction process.
 */
export interface Reducer<A, B> extends Array<any> {
	/**
	 * Initialization function to produce a default initial result (only used if
	 * no such initial result was given by the user)
	 */
	[0]: Fn0<A>;
	/**
	 * Completion function to post-process an already reduced result (for most
	 * reducers this is merely the identity function). Also see {@link reducer}.
	 */
	[1]: Fn<A, A>;
	/**
	 * Accumulation function, merging a new input value with the currently
	 * existing (partially) reduced result.
	 */
	[2]: ReductionFn<A, B>;
}

/**
 * Interface for types able to provide some internal functionality (or
 * derive some related transformation) as {@link Transducer}.
 * Implementations of this interface can be directly passed to all
 * functions in this package where a `Transducer` arg is expected.
 *
 * @example
 * ```ts
 * class Mul implements IXform<number, number> {
 *   constructor(public factor = 10) {}
 *
 *   xform() { return map((x) => this.factor * x); }
 * }
 *
 * transduce(new Mul(11), push(), range(4))
 * // [0, 11, 22, 33, 44]
 *
 * // also usable w/ comp()
 * transduce(
 *   comp(
 *     drop(1),
 *     new Mul(11),
 *     takeNth(2)
 *   ),
 *   push(),
 *   range(4)
 * )
 * // [11, 33]
 * ```
 */
export interface IXform<A, B> {
	/**
	 * Returns type specific operation as transducer. Internally called
	 * by functions in this package which expect transducer args. Users
	 * don't need to call this manually.
	 */
	xform(): Transducer<A, B>;
}

export interface IReducible<A, B> {
	/**
	 * Used for optimized (rather than generic) iteration of a data structure
	 * for reduction purposes. Supported by {@link reduce} and
	 * {@link transduce}.
	 *
	 * @remarks
	 * Example implementations:
	 *
	 * - [`SortedMap`](https://docs.thi.ng/umbrella/associative/classes/SortedMap.html)
	 * - [`SortedSet`](https://docs.thi.ng/umbrella/associative/classes/SortedSet.html)
	 * - [`DCons`](https://docs.thi.ng/umbrella/dcons/classes/DCons.html)
	 * - [`DRing`](https://docs.thi.ng/umbrella/dcons/classes/DRing.html)
	 * - [`SOL`](https://docs.thi.ng/umbrella/dcons/classes/SOL.html)
	 *
	 * @param rfn
	 * @param acc
	 */
	$reduce(rfn: ReductionFn<A, B>, acc: A): A | Reduced<A>;
}

export type TransformFn = (x: any) => any;
export type TransformSubSpec = IObjectOf<TransformSpec | TransformFn>;
export interface TransformSpec extends Array<any> {
	[0]: TransformFn;
	[1]?: TransformSubSpec;
}

export interface SortOpts<A, B> {
	/**
	 * Sort key lookup function.
	 * Default: `identity`
	 */
	key: Fn<A, B>;
	/**
	 * Comparator.
	 * Default: `thi.ng/compare/compare`
	 */
	compare: Comparator<B>;
}

export interface GroupByOpts<SRC, KEY, GROUP> {
	key: Fn<SRC, KEY>;
	group: Reducer<GROUP, SRC>;
}
