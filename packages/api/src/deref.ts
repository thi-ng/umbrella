import type { IObjectOf } from "./object.js";

/**
 * Generic interface for reference types (value wrappers).
 */
export interface IDeref<T> {
	/**
	 * Returns wrapped value.
	 */
	deref(): T;
}

export type MaybeDeref<T> = IDeref<T> | T;

/**
 * If `T` is a {@link IDeref}, returns its value type or else `T`.
 */
export type Derefed<T> = T extends IDeref<any> ? ReturnType<T["deref"]> : T;

/**
 * Constructs a type with a set of properties `K` of type `T` and
 * attempts to resolve each given key via {@link Derefed}.
 *
 * @example
 * ```ts
 * interface Foo {
 *     a: IDeref<string>;
 *     b: IDeref<number>;
 *     c: { d: number };
 * }
 *
 * type Foo2 = DerefedKeys<Foo>;
 * // { a: string; b: number; c: { d: number; } }
 *
 * type Foo3 = DerefedKeys<Foo, "b">;
 * // { b: number; }
 * ```
 */
export type DerefedKeys<
	T extends IObjectOf<any>,
	K extends keyof T = keyof T
> = {
	[P in K]: Derefed<T[P]>;
};

/**
 * Returns true iff `x` implements {@link IDeref}.
 *
 * @param x -
 */
export const isDeref = (x: any): x is IDeref<any> =>
	x != null && typeof x["deref"] === "function";

/**
 * If `x` implements {@link IDeref}, returns its wrapped value, else
 * returns `x` itself.
 *
 * @param x -
 */
export const deref = <T>(x: MaybeDeref<T>) => (isDeref(x) ? x.deref() : x);
