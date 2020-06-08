import type {
    Fn,
    Fn2,
    Fn3,
    Fn4,
    Fn5,
    Fn6,
    Fn7,
    Fn8,
    FnAny,
    IObjectOf,
} from "@thi.ng/api";

export type DispatchFn = FnAny<PropertyKey>;
export type DispatchFn1<A> = Fn<A, PropertyKey>;
export type DispatchFn1O<A, B> = (a: A, b?: B) => PropertyKey;
export type DispatchFn2<A, B> = Fn2<A, B, PropertyKey>;
export type DispatchFn2O<A, B, C> = (a: A, b: B, c?: C) => PropertyKey;
export type DispatchFn3<A, B, C> = Fn3<A, B, C, PropertyKey>;
export type DispatchFn3O<A, B, C, D> = (a: A, b: B, c: C, d?: D) => PropertyKey;
export type DispatchFn4<A, B, C, D> = Fn4<A, B, C, D, PropertyKey>;
export type DispatchFn4O<A, B, C, D, E> = (
    a: A,
    b: B,
    c: C,
    d: D,
    e?: E
) => PropertyKey;
export type DispatchFn5<A, B, C, D, E> = Fn5<A, B, C, D, E, PropertyKey>;
export type DispatchFn5O<A, B, C, D, E, F> = (
    a: A,
    b: B,
    c: C,
    d: D,
    e: E,
    f?: F
) => PropertyKey;
export type DispatchFn6<A, B, C, D, E, F> = Fn6<A, B, C, D, E, F, PropertyKey>;
export type DispatchFn6O<A, B, C, D, E, F, G> = (
    a: A,
    b: B,
    c: C,
    d: D,
    e: E,
    f: F,
    g?: G
) => PropertyKey;
export type DispatchFn7<A, B, C, D, E, F, G> = Fn7<
    A,
    B,
    C,
    D,
    E,
    F,
    G,
    PropertyKey
>;
export type DispatchFn7O<A, B, C, D, E, F, G, H> = (
    a: A,
    b: B,
    c: C,
    d: D,
    e: E,
    f: F,
    g: G,
    h?: H
) => PropertyKey;
export type DispatchFn8<A, B, C, D, E, F, G, H> = Fn8<
    A,
    B,
    C,
    D,
    E,
    F,
    G,
    H,
    PropertyKey
>;
export type DispatchFn8O<A, B, C, D, E, F, G, H, I> = (
    a: A,
    b: B,
    c: C,
    d: D,
    e: E,
    f: F,
    g: G,
    h: H,
    i?: I
) => PropertyKey;

export type Implementation<T> = FnAny<T>;
export type Implementation1<A, T> = Fn<A, T>;
export type Implementation1O<A, B, T> = (a: A, b?: B) => T;
export type Implementation2<A, B, T> = Fn2<A, B, T>;
export type Implementation2O<A, B, C, T> = (a: A, b: B, c?: C) => T;
export type Implementation3<A, B, C, T> = Fn3<A, B, C, T>;
export type Implementation3O<A, B, C, D, T> = (a: A, b: B, c: C, d?: D) => T;
export type Implementation4<A, B, C, D, T> = Fn4<A, B, C, D, T>;
export type Implementation4O<A, B, C, D, E, T> = (
    a: A,
    b: B,
    c: C,
    d: D,
    e?: E
) => T;
export type Implementation5<A, B, C, D, E, T> = Fn5<A, B, C, D, E, T>;
export type Implementation5O<A, B, C, D, E, F, T> = (
    a: A,
    b: B,
    c: C,
    d: D,
    e: E,
    f?: F
) => T;
export type Implementation6<A, B, C, D, E, F, T> = Fn6<A, B, C, D, E, F, T>;
export type Implementation6O<A, B, C, D, E, F, G, T> = (
    a: A,
    b: B,
    c: C,
    d: D,
    e: E,
    f: F,
    g?: G
) => T;
export type Implementation7<A, B, C, D, E, F, G, T> = Fn7<
    A,
    B,
    C,
    D,
    E,
    F,
    G,
    T
>;
export type Implementation7O<A, B, C, D, E, F, G, H, T> = (
    a: A,
    b: B,
    c: C,
    d: D,
    e: E,
    f: F,
    g: G,
    h?: H
) => T;
export type Implementation8<A, B, C, D, E, F, G, H, T> = Fn8<
    A,
    B,
    C,
    D,
    E,
    F,
    G,
    H,
    T
>;
export type Implementation8O<A, B, C, D, E, F, G, H, I, T> = (
    a: A,
    b: B,
    c: C,
    d: D,
    e: E,
    f: F,
    g: G,
    h: H,
    i?: I
) => T;

export interface MultiFnBase<I> {
    /**
     * Registers implementation for dispatch value `id`. Returns true,
     * if successful. Returns false if an implementation already exists
     * (and does nothing in this case).
     *
     * @param id - implementation ID (dispatch value)
     * @param impl - implementation
     */
    add(id: PropertyKey, impl: I): boolean;
    /**
     * Takes an object of dispatch values and their implementations and
     * calls `.add()` for each KV pair. Returns true, if all impls were
     * added successfully. Note: Only numbers or strings are accepted as
     * dispatch values here.
     *
     * @param impls - object of implementations
     */
    addAll(impls: IObjectOf<I>): boolean;
    /**
     * Removes implementation for dispatch value `id`. Returns true, if
     * successful.
     *
     * @param id - implementation ID
     */
    remove(id: PropertyKey): boolean;
    /**
     * Returns true, if the function is callable (has a valid
     * implementation) for given arguments.
     *
     * @param args - arguments to find impl for
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
     * @param id - implementation ID
     * @param parent -parent implementation ID
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
     * @param id - implementation ID
     */
    parents(id: PropertyKey): Set<PropertyKey>;
    /**
     * Similar to {@link MultiFnBase.parents}, but includes all
     * transitive parent dispatch values for given dispatch value `id`.
     * @param id - implementation ID
     */
    ancestors(id: PropertyKey): Set<PropertyKey>;
}

export interface MultiFn<T>
    extends Implementation<T>,
        MultiFnBase<Implementation<T>> {}

export interface MultiFn1<A, T>
    extends Implementation1<A, T>,
        MultiFnBase<Implementation1<A, T>> {}

export interface MultiFn1O<A, B, T>
    extends Implementation1O<A, B, T>,
        MultiFnBase<Implementation1O<A, B, T>> {}

export interface MultiFn2<A, B, T>
    extends Implementation2<A, B, T>,
        MultiFnBase<Implementation2<A, B, T>> {}

export interface MultiFn2O<A, B, C, T>
    extends Implementation2O<A, B, C, T>,
        MultiFnBase<Implementation2O<A, B, C, T>> {}

export interface MultiFn3<A, B, C, T>
    extends Implementation3<A, B, C, T>,
        MultiFnBase<Implementation3<A, B, C, T>> {}

export interface MultiFn3O<A, B, C, D, T>
    extends Implementation3O<A, B, C, D, T>,
        MultiFnBase<Implementation3O<A, B, C, D, T>> {}

export interface MultiFn4<A, B, C, D, T>
    extends Implementation4<A, B, C, D, T>,
        MultiFnBase<Implementation4<A, B, C, D, T>> {}

export interface MultiFn4O<A, B, C, D, E, T>
    extends Implementation4O<A, B, C, D, E, T>,
        MultiFnBase<Implementation4O<A, B, C, D, E, T>> {}

export interface MultiFn5<A, B, C, D, E, T>
    extends Implementation5<A, B, C, D, E, T>,
        MultiFnBase<Implementation5<A, B, C, D, E, T>> {}

export interface MultiFn5O<A, B, C, D, E, F, T>
    extends Implementation5O<A, B, C, D, E, F, T>,
        MultiFnBase<Implementation5O<A, B, C, D, E, F, T>> {}

export interface MultiFn6<A, B, C, D, E, F, T>
    extends Implementation6<A, B, C, D, E, F, T>,
        MultiFnBase<Implementation6<A, B, C, D, E, F, T>> {}

export interface MultiFn6O<A, B, C, D, E, F, G, T>
    extends Implementation6O<A, B, C, D, E, F, G, T>,
        MultiFnBase<Implementation6O<A, B, C, D, E, F, G, T>> {}

export interface MultiFn7<A, B, C, D, E, F, G, T>
    extends Implementation7<A, B, C, D, E, F, G, T>,
        MultiFnBase<Implementation7<A, B, C, D, E, F, G, T>> {}

export interface MultiFn7O<A, B, C, D, E, F, G, H, T>
    extends Implementation7O<A, B, C, D, E, F, G, H, T>,
        MultiFnBase<Implementation7O<A, B, C, D, E, F, G, H, T>> {}

export interface MultiFn8<A, B, C, D, E, F, G, H, T>
    extends Implementation8<A, B, C, D, E, F, G, H, T>,
        MultiFnBase<Implementation8<A, B, C, D, E, F, G, H, T>> {}

export interface MultiFn8O<A, B, C, D, E, F, G, H, I, T>
    extends Implementation8O<A, B, C, D, E, F, G, H, I, T>,
        MultiFnBase<Implementation8O<A, B, C, D, E, F, G, H, I, T>> {}

export type AncestorDefs = IObjectOf<Iterable<PropertyKey>>;
