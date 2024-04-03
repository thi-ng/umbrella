import type { Fn0, Fn0A, MaybePromise } from "@thi.ng/api";

/**
 * Takes a function returning either a no-arg function (thunk) or its
 * already realized (non-function) result. Re-executes thunk for as long
 * as it returns another function/thunk. Once a non-function result has
 * been produced, `trampoline` returns that value itself.
 *
 * @remarks
 * If the final result should be function, it needs to wrapped (e.g. as
 * a 1-elem array).
 *
 * This function should be used for non-stack consuming recursion. I.e.
 * a trampoline is a form of continuation passing style and only ever
 * consumes max. 2 extra stack frames, independent from recursion depth.
 *
 * @example
 * ```ts tangle:../export/trampoline.ts
 * import { trampoline } from "@thi.ng/compose";
 *
 * const countdown = (acc, x) =>
 *   x >= 0 ?
 *     () => (acc.push(x), countdown(acc, x-1)) :
 *     acc;
 *
 * trampoline(countdown([], 4))
 * // [ 4, 3, 2, 1, 0 ]
 *
 * trampoline(countdown([], -1))
 * // []
 * ```
 *
 * @param f - function
 */
export const trampoline = <T>(f: T | Fn0<T | Fn0<T>>) => {
	while (typeof f === "function") {
		f = (<any>f)();
	}
	return <T>f;
};

/**
 * Async version of {@link trampoline}.
 *
 * @param f - function
 */
export const trampolineAsync = async <T>(
	f: MaybePromise<T | Fn0A<T | Fn0A<T>>>
) => {
	f = await f;
	while (typeof f === "function") {
		f = await (<any>f)();
	}
	return <T>f;
};
