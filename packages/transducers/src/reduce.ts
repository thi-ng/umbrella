// SPDX-License-Identifier: Apache-2.0
import type { Fn0, FnAny } from "@thi.ng/api";
import { identity } from "@thi.ng/api/fn";
import { implementsFunction } from "@thi.ng/checks/implements-function";
import { isArrayLike } from "@thi.ng/checks/is-arraylike";
import { isIterable } from "@thi.ng/checks/is-iterable";
import { illegalArity } from "@thi.ng/errors/illegal-arity";
import type { IReducible, Reducer, ReductionFn } from "./api.js";
import { isReduced, unreduced } from "./reduced.js";

/** @internal */
const __parseArgs = (args: any[]) =>
	args.length === 2
		? [undefined, args[1]]
		: args.length === 3
		? [args[1], args[2]]
		: illegalArity(args.length);

export function reduce<A, B>(rfn: Reducer<A, B>, src: Iterable<A>): B;
export function reduce<A, B>(rfn: Reducer<A, B>, acc: B, src: Iterable<A>): B;
export function reduce<A, B>(rfn: Reducer<A, B>, src: IReducible<A, B>): B;
export function reduce<A, B>(
	rfn: Reducer<A, B>,
	acc: A,
	src: IReducible<A, B>
): B;
export function reduce<A, B>(...args: any[]): B {
	const rfn = args[0];
	const init = rfn[0];
	const complete = rfn[1];
	const reduce = rfn[2];
	args = __parseArgs(args);
	const acc: B = args[0] == null ? init() : args[0];
	const src: Iterable<A> | IReducible<A, B> = args[1];
	return unreduced(
		complete(
			implementsFunction(src, "$reduce")
				? src.$reduce(reduce, acc)
				: isArrayLike(src)
				? __reduceArray(reduce, acc, src)
				: __reduceIterable(reduce, acc, <Iterable<A>>src)
		)
	);
}

export function reduceRight<A, B>(rfn: Reducer<A, B>, src: ArrayLike<A>): B;
export function reduceRight<A, B>(
	rfn: Reducer<A, B>,
	acc: B,
	src: ArrayLike<A>
): B;
export function reduceRight<A, B>(...args: any[]): B {
	const [init, complete, reduce]: Reducer<A, B> = args[0];
	args = __parseArgs(args);
	let acc: B = args[0] == null ? init() : args[0];
	const src: Array<A> = args[1];
	for (let i = src.length; i-- > 0; ) {
		acc = <any>reduce(acc, src[i]);
		if (isReduced(acc)) {
			acc = (<any>acc).deref();
			break;
		}
	}
	return unreduced(complete(acc));
}

/** @internal */
const __reduceArray = <A, B>(
	rfn: ReductionFn<A, B>,
	acc: B,
	src: ArrayLike<A>
) => {
	for (let i = 0, n = src.length; i < n; i++) {
		acc = <any>rfn(acc, src[i]);
		if (isReduced(acc)) {
			acc = (<any>acc).deref();
			break;
		}
	}
	return acc;
};

/** @internal */
const __reduceIterable = <A, B>(
	rfn: ReductionFn<A, B>,
	acc: B,
	src: Iterable<A>
) => {
	for (let x of src) {
		acc = <any>rfn(acc, x);
		if (isReduced(acc)) {
			acc = (<any>acc).deref();
			break;
		}
	}
	return acc;
};

/**
 * Convenience helper for building a full {@link Reducer} using the identity
 * function (i.e. `(x) => x`) as completion step (true for 90% of all
 * bundled transducers).
 *
 * @param init - init step of reducer
 * @param rfn - reduction step of reducer
 */
export const reducer = <A, B>(init: Fn0<B>, rfn: ReductionFn<A, B>) =>
	<Reducer<A, B>>[init, identity, rfn];

export const $$reduce = (rfn: FnAny<Reducer<any, any>>, args: any[]) => {
	const n = args.length - 1;
	return isIterable(args[n])
		? args.length > 1
			? reduce(rfn.apply(null, args.slice(0, n)), args[n])
			: reduce(rfn(), args[0])
		: undefined;
};
