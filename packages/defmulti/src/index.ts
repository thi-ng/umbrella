import { IObjectOf } from "@thi.ng/api/api";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { illegalArity } from "@thi.ng/errors/illegal-arity";

export const DEFAULT: unique symbol = Symbol();

export type DispatchFn = (...args) => PropertyKey;
export type DispatchFn1<A> = (a: A) => PropertyKey;
export type DispatchFn2<A, B> = (a: A, b: B) => PropertyKey;
export type DispatchFn3<A, B, C> = (a: A, b: B, c: C) => PropertyKey;
export type DispatchFn4<A, B, C, D> = (a: A, b: B, c: C, d: D) => PropertyKey;
export type DispatchFn5<A, B, C, D, E> = (a: A, b: B, c: C, d: D, e: E) => PropertyKey;
export type DispatchFn6<A, B, C, D, E, F> = (a: A, b: B, c: C, d: D, e: E, f: F) => PropertyKey;
export type DispatchFn7<A, B, C, D, E, F, G> = (a: A, b: B, c: C, d: D, e: E, f: F, g: G) => PropertyKey;
export type DispatchFn8<A, B, C, D, E, F, G, H> = (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H) => PropertyKey;

export type Implementation<T> = (...args: any[]) => T;
export type Implementation1<A, T> = (a: A) => T;
export type Implementation2<A, B, T> = (a: A, b: B) => T;
export type Implementation3<A, B, C, T> = (a: A, b: B, c: C) => T;
export type Implementation4<A, B, C, D, T> = (a: A, b: B, c: C, d: D) => T;
export type Implementation5<A, B, C, D, E, T> = (a: A, b: B, c: C, d: D, e: E) => T;
export type Implementation6<A, B, C, D, E, F, T> = (a: A, b: B, c: C, d: D, e: E, f: F) => T;
export type Implementation7<A, B, C, D, E, F, G, T> = (a: A, b: B, c: C, d: D, e: E, f: F, g: G) => T;
export type Implementation8<A, B, C, D, E, F, G, H, T> = (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H) => T;

export interface MultiFn<T> extends Implementation<T> {
    add: (id: PropertyKey, g: Implementation<T>) => boolean;
    remove: (id: PropertyKey) => boolean;
}

export interface MultiFn1<A, T> extends Implementation1<A, T> {
    add: (id: PropertyKey, g: Implementation1<A, T>) => boolean;
    remove: (id: PropertyKey) => boolean;
}

export interface MultiFn2<A, B, T> extends Implementation2<A, B, T> {
    add: (id: PropertyKey, g: Implementation2<A, B, T>) => boolean;
    remove: (id: PropertyKey) => boolean;
}

export interface MultiFn3<A, B, C, T> extends Implementation3<A, B, C, T> {
    add: (id: PropertyKey, g: Implementation3<A, B, C, T>) => boolean;
    remove: (id: PropertyKey) => boolean;
}

export interface MultiFn4<A, B, C, D, T> extends Implementation4<A, B, C, D, T> {
    add: (id: PropertyKey, g: Implementation4<A, B, C, D, T>) => boolean;
    remove: (id: PropertyKey) => boolean;
}

export interface MultiFn5<A, B, C, D, E, T> extends Implementation5<A, B, C, D, E, T> {
    add: (id: PropertyKey, g: Implementation5<A, B, C, D, E, T>) => boolean;
    remove: (id: PropertyKey) => boolean;
}

export interface MultiFn6<A, B, C, D, E, F, T> extends Implementation6<A, B, C, D, E, F, T> {
    add: (id: PropertyKey, g: Implementation6<A, B, C, D, E, F, T>) => boolean;
    remove: (id: PropertyKey) => boolean;
}

export interface MultiFn7<A, B, C, D, E, F, G, T> extends Implementation7<A, B, C, D, E, F, G, T> {
    add: (id: PropertyKey, g: Implementation7<A, B, C, D, E, F, G, T>) => boolean;
    remove: (id: PropertyKey) => boolean;
}

export interface MultiFn8<A, B, C, D, E, F, G, H, T> extends Implementation8<A, B, C, D, E, F, G, H, T> {
    add: (id: PropertyKey, g: Implementation8<A, B, C, D, E, F, G, H, T>) => boolean;
    remove: (id: PropertyKey) => boolean;
}

/**
 * Returns a new multi-dispatch function using the provided dispatcher.
 * The dispatcher can take any number of arguments and must produce a
 * dispatch value (string, number or symbol) used to lookup an
 * implementation. If found, the impl is called with the same args and
 * its return value used as own return value. If no matching
 * implementation is available, attempts to dispatch to DEFAULT impl. If
 * none is registered, an error is thrown.
 *
 * `defmulti` provides generics for type checking up to 8 args (plus the
 * return type) and the generics will also apply to all implementations.
 * If more than 8 args are required, `defmulti` will fall back to an
 * untyped varargs solution.
 *
 * Implementations for different dispatch values can be added and
 * removed dynamically by calling `.add(id, fn)` or `.remove(id)` on the
 * returned function. Each returns `true` if the operation was
 * successful.
 */
export function defmulti<T>(f: DispatchFn): MultiFn<T>;
export function defmulti<A, T>(f: DispatchFn1<A>): MultiFn1<A, T>;
export function defmulti<A, B, T>(f: DispatchFn2<A, B>): MultiFn2<A, B, T>;
export function defmulti<A, B, C, T>(f: DispatchFn3<A, B, C>): MultiFn3<A, B, C, T>;
export function defmulti<A, B, C, D, T>(f: DispatchFn4<A, B, C, D>): MultiFn4<A, B, C, D, T>;
export function defmulti<A, B, C, D, E, T>(f: DispatchFn5<A, B, C, D, E>): MultiFn5<A, B, C, D, E, T>;
export function defmulti<A, B, C, D, E, F, T>(f: DispatchFn6<A, B, C, D, E, F>): MultiFn6<A, B, C, D, E, F, T>;
export function defmulti<A, B, C, D, E, F, G, T>(f: DispatchFn7<A, B, C, D, E, F, G>): MultiFn7<A, B, C, D, E, F, G, T>;
export function defmulti<A, B, C, D, E, F, G, H, T>(f: DispatchFn8<A, B, C, D, E, F, G, H>): MultiFn8<A, B, C, D, E, F, G, H, T>;
export function defmulti<T>(f: any): MultiFn<T> {
    let impls: IObjectOf<Implementation<T>> = {};
    let fn: any = (...args) => {
        const id = f(...args);
        const g = impls[id] || impls[<any>DEFAULT];
        return g ? g(...args) : illegalArgs(`missing implementation for: "${id.toString()}"`);
    };
    fn.add = (id: PropertyKey, g: Implementation<T>) => {
        if (impls[<any>id]) return false;
        impls[<any>id] = g;
        return true;
    };
    fn.remove = (id: PropertyKey) => {
        if (!impls[<any>id]) return false;
        delete impls[<any>id];
        return true;
    };
    return fn;
};

/**
 * Returns a multi-dispatch function which delegates to one of the
 * provided implementations, based on the arity (number of args) when
 * the function is called. Internally uses `defmulti`, so new arities
 * can be dynamically added (or removed) at a later time. `defmultiN`
 * also registers a `DEFAULT` implementation which simply throws an
 * `IllegalArityError` when invoked.
 *
 * **Note:** Unlike `defmulti` no argument type checking is supported,
 * however you can specify the return type for the generated function.
 *
 * ```
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
 * @param impls
 */
export function defmultiN<T>(impls: { [id: number]: Implementation<T> }) {
    const fn = defmulti<T>((...args: any[]) => args.length);
    fn.add(DEFAULT, (...args) => illegalArity(args.length));
    for (let id in impls) {
        fn.add(id, impls[id]);
    }
    return fn;
}
