import { illegalArity } from "@thi.ng/errors/illegal-arity";
import type { Implementation } from "./api.js";
import { DEFAULT, defmulti } from "./defmulti.js";

/**
 * Returns a multi-dispatch function which delegates to one of the
 * provided implementations, based on the arity (number of args) when
 * the function is called.
 *
 * @remarks
 * Internally uses {@link (defmulti:1)}, so new arities can be dynamically
 * added (or removed) at a later time. If no `fallback` is provided,
 * `defmultiN` also registers a {@link DEFAULT} implementation which
 * simply throws an {@link @thi.ng/errors#IllegalArityError} when
 * invoked.
 *
 * **Note:** Unlike {@link (defmulti:1)} no argument type checking is
 * supported, however you can specify the return type for the generated
 * function.
 *
 * @example
 * ```ts
 * const foo = defmultiN<string>({
 *   0: () => "zero",
 *   1: (x) => `one: ${x}`,
 *   3: (x, y, z) => `three: ${x}, ${y}, ${z}`
 * });
 *
 * foo();
 * // zero
 * foo(23);
 * // one: 23
 * foo(1, 2, 3);
 * // three: 1, 2, 3
 * foo(1, 2);
 * // Error: illegal arity: 2
 *
 * foo.add(2, (x, y) => `two: ${x}, ${y}`);
 * foo(1, 2);
 * // two: 1, 2
 * ```
 *
 * @param impls - implementations
 * @param fallback - fallback implementation
 */
export const defmultiN = <T>(
	impls: { [id: number]: Implementation<T> },
	fallback?: Implementation<T>
) => {
	const fn = defmulti<T>((...args: any[]) => args.length);
	fn.add(DEFAULT, fallback || ((...args) => illegalArity(args.length)));
	for (let id in impls) {
		fn.add(id, impls[id]);
	}
	return fn;
};
