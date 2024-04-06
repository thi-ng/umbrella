import { implementsFunction } from "@thi.ng/checks/implements-function";
import { isAsyncIterable } from "@thi.ng/checks/is-async-iterable";
import { isIterable } from "@thi.ng/checks/is-iterable";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import type { AsyncTransducer, AsyncTxLike } from "./api.js";

export const ensureAsyncTransducer = <A, B>(x: AsyncTxLike<A, B>) =>
	implementsFunction(x, "xformAsync")
		? x.xformAsync()
		: <AsyncTransducer<A, B>>x;

/**
 * Guard helper function. Throws error if `x` is not an iterable or async
 * iterable.
 *
 * @param x
 */
export const ensureIterable = (x: any): Iterable<any> => {
	!(isIterable(x) || isAsyncIterable(x)) &&
		illegalArgs(`value is not iterable: ${x}`);
	return x;
};
