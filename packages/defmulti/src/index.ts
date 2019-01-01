import { IObjectOf } from "@thi.ng/api/api";
import { illegalArgs } from "@thi.ng/errors/illegal-arguments";
import { unsupported } from "@thi.ng/errors/unsupported";
import { illegalArity } from "@thi.ng/errors/illegal-arity";

export const DEFAULT: unique symbol = Symbol("DEFAULT");

export type DispatchFn = (...args) => PropertyKey;
export type DispatchFn1<A> = (a: A, ...xs: any[]) => PropertyKey;
export type DispatchFn1O<A, B> = (a: A, b?: B, ...xs: any[]) => PropertyKey;
export type DispatchFn2<A, B> = (a: A, b: B, ...xs: any[]) => PropertyKey;
export type DispatchFn2O<A, B, C> = (a: A, b: B, c?: C, ...xs: any[]) => PropertyKey;
export type DispatchFn3<A, B, C> = (a: A, b: B, c: C, ...xs: any[]) => PropertyKey;
export type DispatchFn3O<A, B, C, D> = (a: A, b: B, c: C, d?: D, ...xs: any[]) => PropertyKey;
export type DispatchFn4<A, B, C, D> = (a: A, b: B, c: C, d: D, ...xs: any[]) => PropertyKey;
export type DispatchFn4O<A, B, C, D, E> = (a: A, b: B, c: C, d: D, e?: E, ...xs: any[]) => PropertyKey;
export type DispatchFn5<A, B, C, D, E> = (a: A, b: B, c: C, d: D, e: E, ...xs: any[]) => PropertyKey;
export type DispatchFn5O<A, B, C, D, E, F> = (a: A, b: B, c: C, d: D, e: E, f?: F, ...xs: any[]) => PropertyKey;
export type DispatchFn6<A, B, C, D, E, F> = (a: A, b: B, c: C, d: D, e: E, f: F, ...xs: any[]) => PropertyKey;
export type DispatchFn6O<A, B, C, D, E, F, G> = (a: A, b: B, c: C, d: D, e: E, f: F, g?: G, ...xs: any[]) => PropertyKey;
export type DispatchFn7<A, B, C, D, E, F, G> = (a: A, b: B, c: C, d: D, e: E, f: F, g: G, ...xs: any[]) => PropertyKey;
export type DispatchFn7O<A, B, C, D, E, F, G, H> = (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h?: H, ...xs: any[]) => PropertyKey;
export type DispatchFn8<A, B, C, D, E, F, G, H> = (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, ...xs: any[]) => PropertyKey;
export type DispatchFn8O<A, B, C, D, E, F, G, H, I> = (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i?: I, ...xs: any[]) => PropertyKey;

export type Implementation<T> = (...args: any[]) => T;
export type Implementation1<A, T> = (a: A, ...xs: any[]) => T;
export type Implementation1O<A, B, T> = (a: A, b?: B, ...xs: any[]) => T;
export type Implementation2<A, B, T> = (a: A, b: B, ...xs: any[]) => T;
export type Implementation2O<A, B, C, T> = (a: A, b: B, c?: C, ...xs: any[]) => T;
export type Implementation3<A, B, C, T> = (a: A, b: B, c: C, ...xs: any[]) => T;
export type Implementation3O<A, B, C, D, T> = (a: A, b: B, c: C, d?: D, ...xs: any[]) => T;
export type Implementation4<A, B, C, D, T> = (a: A, b: B, c: C, d: D, ...xs: any[]) => T;
export type Implementation4O<A, B, C, D, E, T> = (a: A, b: B, c: C, d: D, e?: E, ...xs: any[]) => T;
export type Implementation5<A, B, C, D, E, T> = (a: A, b: B, c: C, d: D, e: E, ...xs: any[]) => T;
export type Implementation5O<A, B, C, D, E, F, T> = (a: A, b: B, c: C, d: D, e: E, f?: F, ...xs: any[]) => T;
export type Implementation6<A, B, C, D, E, F, T> = (a: A, b: B, c: C, d: D, e: E, f: F, ...xs: any[]) => T;
export type Implementation6O<A, B, C, D, E, F, G, T> = (a: A, b: B, c: C, d: D, e: E, f: F, g?: G, ...xs: any[]) => T;
export type Implementation7<A, B, C, D, E, F, G, T> = (a: A, b: B, c: C, d: D, e: E, f: F, g: G, ...xs: any[]) => T;
export type Implementation7O<A, B, C, D, E, F, G, H, T> = (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h?: H, ...xs: any[]) => T;
export type Implementation8<A, B, C, D, E, F, G, H, T> = (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, ...xs: any[]) => T;
export type Implementation8O<A, B, C, D, E, F, G, H, I, T> = (a: A, b: B, c: C, d: D, e: E, f: F, g: G, h: H, i?: I, ...xs: any[]) => T;

export interface MultiFnBase<I> {
    /**
     * Registers implementation for dispatch value `id`. Returns true,
     * if successful. Returns false if an implementation already exists
     * (and does nothing in this case).
     *
     * @param id
     * @param impl
     */
    add(id: PropertyKey, impl: I): boolean;
    /**
     * Takes an object of dispatch values and their implementations and
     * calls `.add()` for each KV pair. Returns true, if all impls were
     * added successfully. Note: Only numbers or strings are accepted as
     * dispatch values here.
     *
     * @param impls
     */
    addAll(impls: IObjectOf<I>): boolean;
    /**
     * Removes implementation for dispatch value `id`. Returns true, if
     * successful.
     *
     * @param id
     */
    remove(id: PropertyKey): boolean;
    /**
     * Returns true, if the function is callable (has a valid
     * implementation) for given arguments.
     *
     * @param args
     */
    callable(...args: any[]): boolean;
    /**
     * Returns a set of all registered dispatch values.
     */
    impls(): Set<PropertyKey>;
    /**
     * Updates dispatch hierarchy by declaring dispatch value `id` to
     * delegate to `parent`'s implementation. I.e. in terms of dispatch
     * logic, `id` is considered the same as `parent.
     *
     * @param id
     * @param parent
     */
    isa(id: PropertyKey, parent: PropertyKey): boolean;
    /**
     * Returns all known dispatch relationships. This is an object with
     * all registered dispatch values as keys, each with a set of parent
     * dispatch values.
     */
    rels(): IObjectOf<Set<PropertyKey>>;
    /**
     * Returns a set of immediate parent dispatch values for given
     * dispatch value `id`.
     *
     * @param id
     */
    parents(id: PropertyKey): Set<PropertyKey>;
    /**
     * Similar to `parents()`, but includes all transitive parent dispatch
     * values for given dispatch value `id`.
     * @param id
     */
    ancestors(id: PropertyKey): Set<PropertyKey>;
}

export interface MultiFn<T> extends
    Implementation<T>,
    MultiFnBase<Implementation<T>> { }

export interface MultiFn1<A, T> extends
    Implementation1<A, T>,
    MultiFnBase<Implementation1<A, T>> { }

export interface MultiFn1O<A, B, T> extends
    Implementation1O<A, B, T>,
    MultiFnBase<Implementation1O<A, B, T>> { }

export interface MultiFn2<A, B, T> extends
    Implementation2<A, B, T>,
    MultiFnBase<Implementation2<A, B, T>> { }

export interface MultiFn2O<A, B, C, T> extends
    Implementation2O<A, B, C, T>,
    MultiFnBase<Implementation2O<A, B, C, T>> { }

export interface MultiFn3<A, B, C, T> extends
    Implementation3<A, B, C, T>,
    MultiFnBase<Implementation3<A, B, C, T>> { }

export interface MultiFn3O<A, B, C, D, T> extends
    Implementation3O<A, B, C, D, T>,
    MultiFnBase<Implementation3O<A, B, C, D, T>> { }

export interface MultiFn4<A, B, C, D, T> extends
    Implementation4<A, B, C, D, T>,
    MultiFnBase<Implementation4<A, B, C, D, T>> { }

export interface MultiFn4O<A, B, C, D, E, T> extends
    Implementation4O<A, B, C, D, E, T>,
    MultiFnBase<Implementation4O<A, B, C, D, E, T>> { }

export interface MultiFn5<A, B, C, D, E, T> extends
    Implementation5<A, B, C, D, E, T>,
    MultiFnBase<Implementation5<A, B, C, D, E, T>> { }

export interface MultiFn5O<A, B, C, D, E, F, T> extends
    Implementation5O<A, B, C, D, E, F, T>,
    MultiFnBase<Implementation5O<A, B, C, D, E, F, T>> { }

export interface MultiFn6<A, B, C, D, E, F, T> extends
    Implementation6<A, B, C, D, E, F, T>,
    MultiFnBase<Implementation6<A, B, C, D, E, F, T>> { }

export interface MultiFn6O<A, B, C, D, E, F, G, T> extends
    Implementation6O<A, B, C, D, E, F, G, T>,
    MultiFnBase<Implementation6O<A, B, C, D, E, F, G, T>> { }

export interface MultiFn7<A, B, C, D, E, F, G, T> extends
    Implementation7<A, B, C, D, E, F, G, T>,
    MultiFnBase<Implementation7<A, B, C, D, E, F, G, T>> { }

export interface MultiFn7O<A, B, C, D, E, F, G, H, T> extends
    Implementation7O<A, B, C, D, E, F, G, H, T>,
    MultiFnBase<Implementation7O<A, B, C, D, E, F, G, H, T>> { }

export interface MultiFn8<A, B, C, D, E, F, G, H, T> extends
    Implementation8<A, B, C, D, E, F, G, H, T>,
    MultiFnBase<Implementation8<A, B, C, D, E, F, G, H, T>> { }

export interface MultiFn8O<A, B, C, D, E, F, G, H, I, T> extends
    Implementation8O<A, B, C, D, E, F, G, H, I, T>,
    MultiFnBase<Implementation8O<A, B, C, D, E, F, G, H, I, T>> { }

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
export function defmulti<A, B, T>(f: DispatchFn1O<A, B>, rels?: AncestorDefs): MultiFn1O<A, B, T>;
export function defmulti<A, B, C, T>(f: DispatchFn3<A, B, C>, rels?: AncestorDefs): MultiFn3<A, B, C, T>;
export function defmulti<A, B, C, T>(f: DispatchFn2O<A, B, C>, rels?: AncestorDefs): MultiFn2O<A, B, C, T>;
export function defmulti<A, B, C, D, T>(f: DispatchFn4<A, B, C, D>, rels?: AncestorDefs): MultiFn4<A, B, C, D, T>;
export function defmulti<A, B, C, D, T>(f: DispatchFn3O<A, B, C, D>, rels?: AncestorDefs): MultiFn3O<A, B, C, D, T>;
export function defmulti<A, B, C, D, E, T>(f: DispatchFn5<A, B, C, D, E>, rels?: AncestorDefs): MultiFn5<A, B, C, D, E, T>;
export function defmulti<A, B, C, D, E, T>(f: DispatchFn4O<A, B, C, D, E>, rels?: AncestorDefs): MultiFn4O<A, B, C, D, E, T>;
export function defmulti<A, B, C, D, E, F, T>(f: DispatchFn6<A, B, C, D, E, F>, rels?: AncestorDefs): MultiFn6<A, B, C, D, E, F, T>;
export function defmulti<A, B, C, D, E, F, T>(f: DispatchFn5O<A, B, C, D, E, F>, rels?: AncestorDefs): MultiFn5O<A, B, C, D, E, F, T>;
export function defmulti<A, B, C, D, E, F, G, T>(f: DispatchFn7<A, B, C, D, E, F, G>, rels?: AncestorDefs): MultiFn7<A, B, C, D, E, F, G, T>;
export function defmulti<A, B, C, D, E, F, G, T>(f: DispatchFn6O<A, B, C, D, E, F, G>, rels?: AncestorDefs): MultiFn6O<A, B, C, D, E, F, G, T>;
export function defmulti<A, B, C, D, E, F, G, H, T>(f: DispatchFn8<A, B, C, D, E, F, G, H>, rels?: AncestorDefs): MultiFn8<A, B, C, D, E, F, G, H, T>;
export function defmulti<A, B, C, D, E, F, G, H, T>(f: DispatchFn7O<A, B, C, D, E, F, G, H>, rels?: AncestorDefs): MultiFn7O<A, B, C, D, E, F, G, H, T>;
export function defmulti<A, B, C, D, E, F, G, H, I, T>(f: DispatchFn8O<A, B, C, D, E, F, G, H, I>, rels?: AncestorDefs): MultiFn8O<A, B, C, D, E, F, G, H, I, T>;
export function defmulti<T>(f: any, ancestors?: AncestorDefs): MultiFn<T> {
    const impls: IObjectOf<Implementation<T>> = {};
    const rels: IObjectOf<Set<PropertyKey>> = ancestors ? makeRels(ancestors) : {};
    const fn: any = (...args) => {
        const id = f(...args);
        const g = impls[id] || findImpl(impls, rels, id) || impls[<any>DEFAULT];
        return g ? g(...args) : unsupported(`missing implementation for: "${id.toString()}"`);
    };
    fn.add = (id: PropertyKey, g: Implementation<T>) => {
        if (impls[<any>id]) return false;
        impls[<any>id] = g;
        return true;
    };
    fn.addAll = (_impls: IObjectOf<Implementation<T>>) => {
        let ok = true;
        for (let id in _impls) {
            ok = fn.add(id, _impls[id]) && ok;
        }
        return ok;
    };
    fn.remove = (id: PropertyKey) => {
        if (!impls[<any>id]) return false;
        delete impls[<any>id];
        return true;
    };
    fn.callable = (...args: any[]) => {
        const id = f(...args);
        return !!(impls[id] || findImpl(impls, rels, id) || impls[<any>DEFAULT]);
    };
    fn.isa = (id: PropertyKey, parent: PropertyKey) => {
        let val = rels[<any>id];
        !val && (rels[<any>id] = val = new Set());
        val.add(parent);
    };
    fn.impls = () => {
        const res = new Set<PropertyKey>(Object.keys(impls));
        for (let id in rels) {
            findImpl(impls, rels, id) && res.add(id);
        }
        impls[<any>DEFAULT] && res.add(DEFAULT);
        return res;
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
export const defmultiN =
    <T>(impls: { [id: number]: Implementation<T> }) => {
        const fn = defmulti<T>((...args: any[]) => args.length);
        fn.add(DEFAULT, (...args) => illegalArity(args.length));
        for (let id in impls) {
            fn.add(id, impls[id]);
        }
        return fn;
    };

/**
 * Syntax-sugar intended for sets of multi-methods sharing same dispatch
 * values / logic. Takes a dispatch value, an object of "is-a"
 * relationships and a number of multi-methods, each with an
 * implementation for the given dispatch value.
 *
 * The relations object has dispatch values (parents) as keys and arrays
 * of multi-methods as their values. For each multi-method associates
 * the given `type` with the related parent dispatch value to delegate
 * to its implementation.
 *
 * The remaining implementations are associated with their related
 * multi-method and the given `type` dispatch value.
 *
 * ```
 * foo = defmulti((x) => x.id);
 * bar = defmulti((x) => x.id);
 * bax = defmulti((x) => x.id);
 * baz = defmulti((x) => x.id);
 *
 * // define impls for dispatch value `a`
 * implementations(
 *   "a",
 *
 *   // delegate bax & baz impls to dispatch val `b`
 *   {
 *      b: [bax, baz]
 *   },
 *
 *   // concrete multi-fn impls
 *   foo,
 *   (x) => `foo: ${x.val}`,
 *
 *   bar,
 *   (x) => `bar: ${x.val.toUpperCase()}`
 * );
 *
 * // add parent impls
 * bax.add("b", (x) => `bax: ${x.id}`);
 * baz.add("c", (x) => `baz: ${x.id}`);
 * // use "c" impl for "b"
 * baz.isa("b", "c");
 *
 * foo({ id: "a", val: "alice" }); // "foo: alice"
 * bar({ id: "a", val: "alice" }); // "bar: ALICE"
 * bax({ id: "a", val: "alice" }); // "bax: a"
 * baz({ id: "a", val: "alice" }); // "baz: a"
 *
 * baz.impls(); // Set { "c", "a", "b" }
 * ```
 *
 * @param type
 * @param impls
 */
export const implementations =
    (type: PropertyKey, rels: IObjectOf<MultiFn<any>[]>, ...impls: (MultiFn<any> | Implementation<any>)[]) => {
        (impls.length & 1) && illegalArgs("expected an even number of implementation items");
        if (rels) {
            for (let parent in rels) {
                for (let fn of rels[parent]) {
                    fn.isa(type, parent);
                }
            }
        }
        for (let i = 0; i < impls.length; i += 2) {
            (<MultiFn<any>>impls[i]).add(type, impls[i + 1]);
        }
    };
