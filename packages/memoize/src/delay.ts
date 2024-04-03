import type { Fn0, IDeref } from "@thi.ng/api";

/**
 * Syntax sugar for {@link Delay} ctor. Wraps given no-arg function in a
 * {@link Delay} value/memoization wrapper and returns it. The function result
 * can later be obtained via `.deref()`. The function will only be called the
 * first time `.deref()` is used and the result will be cached. Future deref's
 * will then only return the cached value.
 *
 * @remarks
 * Use {@link Delay#isRealized} to check if the function result is already
 * available (i.e. if the function has already been called).
 *
 * @example
 * ```ts tangle:../export/delay.ts
 * import { delay } from "@thi.ng/memoize";
 *
 * const a = delay(() => {
 *   console.log("calculating answer...");
 *   return 42;
 * });
 *
 * // the function will only be called now (and once)
 * console.log("first:", a.deref());
 * // calculating answer...
 * // first: 42
 *
 * // now only returns cached result
 * console.log("second:", a.deref());
 * // second: 42
 * ```
 *
 * @param body
 */
export const delay = <T>(body: Fn0<T>) => new Delay<T>(body);

export class Delay<T> implements IDeref<T> {
	protected value!: T;
	protected body: Fn0<T>;
	protected realized: boolean;

	constructor(body: Fn0<T>) {
		this.body = body;
		this.realized = false;
	}

	deref() {
		if (!this.realized) {
			this.value = this.body();
			this.realized = true;
		}
		return this.value;
	}

	isRealized() {
		return this.realized;
	}
}
