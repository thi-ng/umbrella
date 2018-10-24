import { IObjectOf } from "@thi.ng/api/api";
import { unsupported } from "@thi.ng/errors/unsupported";
import { illegalArity } from "@thi.ng/errors/illegal-arity";

export const DEFAULT: unique symbol = Symbol();

export type DispatchFn = (...args) => PropertyKey;
export type DispatchFn1<A> = (a: A, ...xs: any[]) => PropertyKey;
export type DispatchFn2<A, B> = (a: A, b: B, ...xs: any[]) => PropertyKey;
export type DispatchFn3<A, B, C> = (a: A, b: B, c: C, ...xs: any[]) => PropertyKey;
export type DispatchFn4<A, B, C, D> = (a: A, b: B, c: C, d: D, ...xs: any[]) => PropertyKey;
export type DispatchFn5<A, B, C, D, E> = (a: A, b: B, c: C, d: D, e: E, ...xs: any[]) => PropertyKey;
export type DispatchFn6<A, B, C, D, E, F> = (a: A, b: B, c: C, d: D, e: E, f: F, ...xs: any[]) => PropertyKey;
export type DispatchFn7<A, B, C, D, E, F, G> = (a: A, b: B, c: C, d: D, e: E, f: F, g: G, ...xs: any[]) => PropertyKey;
export type DispatchFn8<A, B, C, D, E, F, G, H> = (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, ...xs: any[]) => PropertyKey;

export type Implementation<T> = (...args: any[]) => T;
export type Implementation1<A, T> = (a: A, ...xs: any[]) => T;
export type Implementation2<A, B, T> = (a: A, b: B, ...xs: any[]) => T;
export type Implementation3<A, B, C, T> = (a: A, b: B, c: C, ...xs: any[]) => T;
export type Implementation4<A, B, C, D, T> = (a: A, b: B, c: C, d: D, ...xs: any[]) => T;
export type Implementation5<A, B, C, D, E, T> = (a: A, b: B, c: C, d: D, e: E, ...xs: any[]) => T;
export type Implementation6<A, B, C, D, E, F, T> = (a: A, b: B, c: C, d: D, e: E, f: F, ...xs: any[]) => T;
export type Implementation7<A, B, C, D, E, F, G, T> = (a: A, b: B, c: C, d: D, e: E, f: F, g: G, ...xs: any[]) => T;
export type Implementation8<A, B, C, D, E, F, G, H, T> = (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, ...xs: any[]) => T;

export interface MultiFnBase<I> {
    add(id: PropertyKey, g: I): boolean;
    remove(id: PropertyKey): boolean;
    isa(id: PropertyKey, parent: PropertyKey);
    rels(): IObjectOf<Set<PropertyKey>>;
    parents(id: PropertyKey): Set<PropertyKey>;
    ancestors(id: PropertyKey): Set<PropertyKey>;
}

export interface MultiFn<T> extends
    Implementation<T>,
    MultiFnBase<Implementation<T>> { }

export interface MultiFn1<A, T> extends
    Implementation1<A, T>,
    MultiFnBase<Implementation1<A, T>> { }

export interface MultiFn2<A, B, T> extends
    Implementation2<A, B, T>,
    MultiFnBase<Implementation2<A, B, T>> { }

export interface MultiFn3<A, B, C, T> extends
    Implementation3<A, B, C, T>,
    MultiFnBase<Implementation3<A, B, C, T>> { }

export interface MultiFn4<A, B, C, D, T> extends
    Implementation4<A, B, C, D, T>,
    MultiFnBase<Implementation4<A, B, C, D, T>> { }

export interface MultiFn5<A, B, C, D, E, T> extends
    Implementation5<A, B, C, D, E, T>,
    MultiFnBase<Implementation5<A, B, C, D, E, T>> { }

export interface MultiFn6<A, B, C, D, E, F, T> extends
    Implementation6<A, B, C, D, E, F, T>,
    MultiFnBase<Implementation6<A, B, C, D, E, F, T>> { }

export interface MultiFn7<A, B, C, D, E, F, G, T> extends
    Implementation7<A, B, C, D, E, F, G, T>,
    MultiFnBase<Implementation7<A, B, C, D, E, F, G, T>> { }

export interface MultiFn8<A, B, C, D, E, F, G, H, T> extends
    Implementation8<A, B, C, D, E, F, G, H, T>,
    MultiFnBase<Implementation8<A, B, C, D, E, F, G, H, T>> { }

export type AncestorDefs = IObjectOf<Iterable<PropertyKey>>;

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
export function defmulti<T>(f: DispatchFn, rels?: AncestorDefs): MultiFn<T>;
export function defmulti<A, T>(f: DispatchFn1<A>, rels?: AncestorDefs): MultiFn1<A, T>;
export function defmulti<A, B, T>(f: DispatchFn2<A, B>, rels?: AncestorDefs): MultiFn2<A, B, T>;
export function defmulti<A, B, C, T>(f: DispatchFn3<A, B, C>, rels?: AncestorDefs): MultiFn3<A, B, C, T>;
export function defmulti<A, B, C, D, T>(f: DispatchFn4<A, B, C, D>, rels?: AncestorDefs): MultiFn4<A, B, C, D, T>;
export function defmulti<A, B, C, D, E, T>(f: DispatchFn5<A, B, C, D, E>, rels?: AncestorDefs): MultiFn5<A, B, C, D, E, T>;
export function defmulti<A, B, C, D, E, F, T>(f: DispatchFn6<A, B, C, D, E, F>, rels?: AncestorDefs): MultiFn6<A, B, C, D, E, F, T>;
export function defmulti<A, B, C, D, E, F, G, T>(f: DispatchFn7<A, B, C, D, E, F, G>, rels?: AncestorDefs): MultiFn7<A, B, C, D, E, F, G, T>;
export function defmulti<A, B, C, D, E, F, G, H, T>(f: DispatchFn8<A, B, C, D, E, F, G, H>, rels?: AncestorDefs): MultiFn8<A, B, C, D, E, F, G, H, T>;
export function defmulti<T>(f: any, ancestors?: AncestorDefs): MultiFn<T> {
    let impls: IObjectOf<Implementation<T>> = {};
    let rels: IObjectOf<Set<PropertyKey>> = ancestors ? makeRels(ancestors) : {};
    let fn: any = (...args) => {
        const id = f(...args);
        const g = impls[id] || findImpl(impls, rels, id) || impls[<any>DEFAULT];
        return g ? g(...args) : unsupported(`missing implementation for: "${id.toString()}"`);
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
    fn.isa = (id: PropertyKey, parent: PropertyKey) => {
        let val = rels[<any>id];
        !val && (rels[<any>id] = val = new Set());
        val.add(parent);
    };
    fn.rels = () => rels;
    fn.parents = (id: PropertyKey) => rels[<any>id];
    fn.ancestors = (id: PropertyKey) => new Set<PropertyKey>(findAncestors([], rels, id));
    return fn;
};

const findImpl = (impls: IObjectOf<Implementation<any>>, rels: IObjectOf<Set<PropertyKey>>, id: PropertyKey) => {
    const parents = rels[<any>id];
    if (!parents) return;
    for (let p of parents) {
        let impl: Implementation<any> = impls[<any>p] || findImpl(impls, rels, p)
        if (impl) return impl;
    }
};

const findAncestors = (acc: PropertyKey[], rels: IObjectOf<Set<PropertyKey>>, id: PropertyKey) => {
    const parents = rels[<any>id];
    if (parents) {
        for (let p of parents) {
            acc.push(p);
            findAncestors(acc, rels, p);
        }
    }
    return acc;
};

const makeRels = (spec: AncestorDefs) => {
    const rels: IObjectOf<Set<PropertyKey>> = {};
    for (let k in spec) {
        const val = spec[k];
        rels[k] = val instanceof Set ? val : new Set(val);
    }
    return rels;
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
