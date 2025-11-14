// SPDX-License-Identifier: Apache-2.0
import type { Comparator, Fn, Fn0, IObjectOf } from "@thi.ng/api";
import type { Reduced } from "./reduced.js";

export type Transducer<A, B> = (rfn: Reducer<B, any>) => Reducer<A, any>;

/**
 * A transducer or a custom type with a {@link IXform} implementation.
 */
export type TxLike<A, B> = Transducer<A, B> | IXform<A, B>;

/**
 * Custom version of {@link TxLike} for use with {@link multiplex} and
 * {@link multiplexObj}.
 */
export type MultiplexTxLike<A, B> = TxLike<A, B> | [TxLike<A, B>, boolean];

/**
 * Function which combines a new value of type `A` with accumulator of type `B`.
 * If the reduction should terminate early, the function should wrap the result
 * via {@link reduced}.
 */
export type ReductionFn<A, B> = (acc: B, x: A) => B | Reduced<B>;

/**
 * A 3-tuple of functions defining the different stages of a reduction process.
 *
 * @remarks
 * The items in order:
 *
 * 1. Initialization function used to produce an initial default result (only
 *    used if no such initial result was given by the user)
 * 2. Completion function to post-process an already reduced result (for most
 *    reducers this is merely the identity function). Also see {@link reducer}.
 * 3. Accumulation function, merging a new input value with the currently
 *    existing (partially) reduced result.
 */
export type Reducer<A, B> = [Fn0<B>, Fn<B, B>, ReductionFn<A, B>];

export type MaybeReduced<T> = Reduced<T> | T;

/**
 * Interface for types able to provide some internal functionality (or
 * derive some related transformation) as {@link Transducer}.
 * Implementations of this interface can be directly passed to all
 * functions in this package where a `Transducer` arg is expected.
 *
 * @example
 * ```ts tangle:../export/ixform.ts
 * import {
 *   comp, drop, map, push, range, takeNth, transduce,
 *   type IXform
 * } from "@thi.ng/transducers";
 *
 * class Mul implements IXform<number, number> {
 *   constructor(public factor = 10) {}
 *
 *   xform() { return map((x: number) => this.factor * x); }
 * }
 *
 * console.log(
 *   transduce(new Mul(11), push(), range(4))
 * );
 * // [0, 11, 22, 33]
 *
 * // also usable w/ comp()
 * const res = transduce(
 *   comp(
 *     drop(1),
 *     new Mul(11),
 *     takeNth(2)
 *   ),
 *   push(),
 *   range(4)
 * );
 *
 * console.log(res);
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
	$reduce(rfn: ReductionFn<A, B>, acc: B | Reduced<B>): B | Reduced<B>;
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
	group: Reducer<SRC, GROUP>;
}
