import { IObjectOf } from "@thi.ng/api/api";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { illegalArity } from "@thi.ng/errors/illegal-arity";

export const DEFAULT = Symbol("DEFAULT");

export type DispatchFn = (...args) => PropertyKey;
export type Implementation<T> = (...args: any[]) => T;

export interface MultiFn<T> extends Implementation<T> {
    add: (id: PropertyKey, g: Implementation<T>) => boolean;
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
 * Implementations for different dispatch values can be added and
 * removed dynamically by calling `.add(id, fn)` or `.remove(id)` on the
 * returned function. Each returns `true` if the operation was
 * successful.
 */
export function defmulti<T>(f: DispatchFn): MultiFn<T> {
    let impls: IObjectOf<Implementation<T>> = {};
    let fn: any = (...args) => {
        const id = f(...args);
        const g = impls[id] || impls[DEFAULT];
        return g ? g(...args) : illegalArgs(`missing implementation for: "${id}"`);
    };
    fn.add = (id: PropertyKey, g: Implementation<T>) => {
        if (impls[id]) return false;
        impls[id] = g;
        return true;
    };
    fn.remove = (id: PropertyKey) => {
        if (!impls[id]) return false;
        delete impls[id];
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
 * ```
 * const foo = defmultiN({
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
 * ```
 *
 * @param impls
 */
export function defmultiN<T>(impls: { [id: number]: Implementation<T> }) {
    const fn = defmulti((...args: any[]) => args.length);
    fn.add(DEFAULT, (...args) => illegalArity(args.length));
    for (let id in impls) {
        fn.add(id, impls[id]);
    }
    return fn;
}
