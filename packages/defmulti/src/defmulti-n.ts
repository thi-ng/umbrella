import { illegalArity } from "@thi.ng/errors/illegal-arity";
import type { Implementation } from "./api.js";
import { DEFAULT, defmulti } from "./defmulti.js";

/**
 * Returns a multi-dispatch function which delegates to one of the provided
 * implementations, based on the arity (number of args) when the function is
 * called.
 *
 * @remarks
 * Internally uses {@link defmulti}, so new arities can be dynamically added (or
 * removed) at a later time. If no `fallback` is provided, `defmultiN` also
 * registers a {@link DEFAULT} implementation which simply throws an
 * [`IllegalArityError`](https://docs.thi.ng/umbrella/errors/variables/IllegalArityError.html)
 * when invoked.
 *
 * **Note:** Unlike {@link defmulti} no argument type checking is supported,
 * however you can specify the return type for the generated function.
 *
 * @example
 * ```ts tangle:../export/defmulti-n.ts
 * import { defmultiN } from "@thi.ng/defmulti";
 *
 * const foo = defmultiN<string>({
 *   0: () => "zero",
 *   1: (x) => `one: ${x}`,
 *   3: (x, y, z) => `three: ${x}, ${y}, ${z}`
 * });
 *
 * console.log(foo());
 * // zero
 *
 * console.log(foo(23));
 * // one: 23
 *
 * console.log(foo(1, 2, 3));
 * // three: 1, 2, 3
 *
 * console.log(foo(1, 2));
 * // Error: illegal arity: 2
 *
 * foo.add(2, (x, y) => `two: ${x}, ${y}`);
 *
 * console.log(foo(1, 2));
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
