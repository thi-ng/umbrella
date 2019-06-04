export const DEFAULT_EPS = 1e-6;

export const EVENT_ALL = "*";
export const EVENT_ENABLE = "enable";
export const EVENT_DISABLE = "disable";

/**
 * Internal use only. **Do NOT use in user land code!**
 */
export const SEMAPHORE = Symbol();

/**
 * No-effect placeholder function.
 */
export const NO_OP = () => {};

export type ArrayLikeIterable<T> = ArrayLike<T> & Iterable<T>;

/**
 * A no-arg function, returning T.
 */
export type Fn0<T> = () => T;

/**
 * A single arg function from A => B.
 */
export type Fn<A, B> = (a: A) => B;

/**
 * A 2-arg function from A,B => C.
 */
export type Fn2<A, B, C> = (a: A, b: B) => C;

/**
 * A 3-arg function from A,B,C => D.
 */
export type Fn3<A, B, C, D> = (a: A, b: B, c: C) => D;

/**
 * A 4-arg function from A,B,C,D => E.
 */
export type Fn4<A, B, C, D, E> = (a: A, b: B, c: C, d: D) => E;

/**
 * A 5-arg function from A,B,C,D,E => F.
 */
export type Fn5<A, B, C, D, E, F> = (a: A, b: B, c: C, d: D, e: E) => F;

/**
 * A 6-arg function from A,B,C,D,E,F => G.
 */
export type Fn6<A, B, C, D, E, F, G> = (
    a: A,
    b: B,
    c: C,
    d: D,
    e: E,
    f: F
) => G;

/**
 * A 7-arg function from A,B,C,D,E,F,G => H.
 */
export type Fn7<A, B, C, D, E, F, G, H> = (
    a: A,
    b: B,
    c: C,
    d: D,
    e: E,
    f: F,
    g: G
) => H;

/**
 * A 8-arg function from A,B,C,D,E,F,G,H => I.
 */
export type Fn8<A, B, C, D, E, F, G, H, I> = (
    a: A,
    b: B,
    c: C,
    d: D,
    e: E,
    f: F,
    g: G,
    h: H
) => I;

/**
 * A 9-arg function from A,B,C,D,E,F,G,H,I => J.
 */
export type Fn9<A, B, C, D, E, F, G, H, I, J> = (
    a: A,
    b: B,
    c: C,
    d: D,
    e: E,
    f: F,
    g: G,
    h: H,
    i: I
) => J;

/**
 * A 10-arg function from A,B,C,D,E,F,G,H,I,J => K.
 */
export type Fn10<A, B, C, D, E, F, G, H, I, J, K> = (
    a: A,
    b: B,
    c: C,
    d: D,
    e: E,
    f: F,
    g: G,
    h: H,
    i: I,
    j: J
) => K;

export type FnO<A, B> = (a: A, ...xs: any[]) => B;

export type FnO2<A, B, C> = (a: A, b: B, ...xs: any[]) => C;

export type FnO3<A, B, C, D> = (a: A, b: B, c: C, ...xs: any[]) => D;

export type FnO4<A, B, C, D, E> = (a: A, b: B, c: C, d: D, ...xs: any[]) => E;

export type FnO5<A, B, C, D, E, F> = (
    a: A,
    b: B,
    c: C,
    d: D,
    e: E,
    ...xs: any[]
) => F;

export type FnO6<A, B, C, D, E, F, G> = (
    a: A,
    b: B,
    c: C,
    d: D,
    e: E,
    f: F,
    ...xs: any[]
) => G;

export type FnO7<A, B, C, D, E, F, G, H> = (
    a: A,
    b: B,
    c: C,
    d: D,
    e: E,
    f: F,
    g: G,
    ...xs: any[]
) => H;

export type FnO8<A, B, C, D, E, F, G, H, I> = (
    a: A,
    b: B,
    c: C,
    d: D,
    e: E,
    f: F,
    g: G,
    h: H,
    ...xs: any[]
) => I;

export type FnO9<A, B, C, D, E, F, G, H, I, J> = (
    a: A,
    b: B,
    c: C,
    d: D,
    e: E,
    f: F,
    g: G,
    h: H,
    i: I,
    ...xs: any[]
) => J;

export type FnO10<A, B, C, D, E, F, G, H, I, J, K> = (
    a: A,
    b: B,
    c: C,
    d: D,
    e: E,
    f: F,
    g: G,
    h: H,
    i: I,
    j: J,
    ...xs: any[]
) => K;

/**
 * An untyped vararg arg function to type T.
 */
export type FnAny<T> = (...xs: any[]) => T;

/**
 * A typed vararg arg function from A => B.
 */
export type FnAnyT<A, B> = (...xs: A[]) => B;

/*
 * Utilities for extracting key types of nested objects.
 */
export type Keys<T> = keyof T;
export type Keys1<T, A extends Keys<T>> = Keys<T[A]>;
export type Keys2<T, A extends Keys<T>, B extends Keys1<T, A>> = Keys1<T[A], B>;
export type Keys3<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>
> = Keys2<T[A], B, C>;
export type Keys4<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>
> = Keys3<T[A], B, C, D>;
export type Keys5<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>
> = Keys4<T[A], B, C, D, E>;

/*
 * Utilities for extracting value types from nested objects.
 */
export type Val1<T, A extends Keys<T>> = T[A];
export type Val2<T, A extends Keys<T>, B extends Keys1<T, A>> = Val1<T, A>[B];
export type Val3<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>
> = Val2<T, A, B>[C];
export type Val4<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>
> = Val3<T, A, B, C>[D];
export type Val5<
    T,
    A extends Keys<T>,
    B extends Keys1<T, A>,
    C extends Keys2<T, A, B>,
    D extends Keys3<T, A, B, C>,
    E extends Keys4<T, A, B, C, D>
> = Val4<T, A, B, C, D>[E];

/**
 * Generic 2-element comparator function type alias. Must follow this
 * contract and return:
 *
 * - negative if `a < b`
 * - zero if `a == b`
 * - positive if `a > b`
 */
export type Comparator<T> = Fn2<T, T, number>;

/**
 * Event listener.
 */
export type Listener = Fn<Event, void>;

export type NumericArray = number[] | TypedArray;

export type Primitive = number | string | boolean | symbol;

/**
 * Lookup path for nested data structures.
 */
export type Path = PropertyKey | PropertyKey[];

/**
 * A key-value pair / tuple.
 */
export type Pair<K, V> = [K, V];

/**
 * Predicate function mapping given value to true/false.
 */
export type Predicate<T> = Fn<T, boolean>;

/**
 * Predicate function mapping given args to true/false.
 */
export type Predicate2<T> = Fn2<T, T, boolean>;

/**
 * Higher order `Predicate` builder. Possibly stateful.
 */
export type StatefulPredicate<T> = Fn0<Predicate<T>>;

/**
 * Higher order `Predicate2` builder. Possibly stateful.
 */
export type StatefulPredicate2<T> = Fn0<Predicate2<T>>;

export type Tuple<T, N extends number> = [T, ...T[]] & { length: N };

export type IterableTuple<T, N extends number> = Tuple<T, N> & Iterable<T>;

export type TypedArray =
    | Float32Array
    | Float64Array
    | Int8Array
    | Int16Array
    | Int32Array
    | Uint8Array
    | Uint8ClampedArray
    | Uint16Array
    | Uint32Array;

export type IntArray = Int8Array | Int16Array | Int32Array;
export type UIntArray = Uint8Array | Uint16Array | Uint32Array;
export type FloatArray = Float32Array | Float64Array;

export const enum Type {
    U8,
    U8C,
    I8,
    U16,
    I16,
    U32,
    I32,
    F32,
    F64
}

export const SIZEOF = {
    [Type.U8]: 1,
    [Type.U8C]: 1,
    [Type.I8]: 1,
    [Type.U16]: 2,
    [Type.I16]: 2,
    [Type.U32]: 4,
    [Type.I32]: 4,
    [Type.F32]: 4,
    [Type.F64]: 8
};

/**
 * Observer function for `IWatch` implementations.
 */
export type Watch<T> = (id: string, oldState: T, newState: T) => void;

export enum LogLevel {
    FINE,
    DEBUG,
    INFO,
    WARN,
    SEVERE,
    NONE
}

/**
 * @param K key type
 * @param V value type
 * @param T return type
 */
export interface IAssoc<K, V, T> {
    assoc(key: K, val: V): T;
    update(key: K, f: Fn<V, V>): T;
}

/**
 * @param K key type
 * @param V value type
 * @param T return type
 */
export interface IAssocIn<K, V, T> {
    assocIn(key: K[], val: V): T;
    updateIn(key: K[], f: Fn<V, V>): T;
}

/**
 * Generic resource binding methods.
 */
export interface IBind<T> {
    /**
     * @returns true, if successful
     */
    bind(opt: T): boolean;
    /**
     * @returns true, if successful
     */
    unbind(opt: T): boolean;
}

/**
 * Generic interface for types with binary backing buffers.
 */
export interface IBuffered<T> {
    /**
     * An implementation's publicly accessible backing array /
     * ArrayBuffer (usually a typed array instance).
     */
    buffer: T;
    /**
     * Returns an Uint8Array view of backing array.
     */
    bytes?(): Uint8Array;
}

/**
 * Generic interface to compare value types.
 */
export interface ICompare<T> {
    /**
     * Compares this value with given value `x`. MUST follow same
     * contract as `Comparator`. MUST return 0 if the type also
     * implements `IEquiv` and `equiv` returns true for same `x`.
     *
     * Also see `IHash`.
     *
     * @param x
     */
    compare(x: T): number;
}

/**
 * Generic interface for collection types to check if a given value is
 * part of the collection.
 */
export interface IContains<T> {
    /**
     * Returns `true` if `x` is part of collection.
     *
     * @param x
     */
    contains(x: T): boolean;
}

/**
 * Generic interface for clonable types.
 */
export interface ICopy<T> {
    /**
     * Returns a copy of this instance. Shallow or deep copies are
     * implementation specific.
     */
    copy(): T;
}

/**
 * Generic interface for reference types (value wrappers).
 */
export interface IDeref<T> {
    /**
     * Returns wrapped value.
     */
    deref(): T;
}

/**
 * Extension of `IAssoc` for types supporting key removals.
 *
 * @param K key type
 * @param V value type
 * @param T return type
 */
export interface IDissoc<K, V, T> extends IAssoc<K, V, T> {
    dissoc(key: K): T;
}

/**
 * Extension of `IAssocIn` for types supporting key removals.
 *
 * @param K key type
 * @param V value type
 * @param T return type
 */
export interface IDissocIn<K, V, T> extends IAssocIn<K, V, T> {
    dissocIn(key: K[]): T;
}

export interface IEmpty<T> {
    /**
     * Returns an empty/blank instance of same type (with possibly same
     * config, if any).
     */
    empty(): T;
}

/**
 * Interface to provide enabled/disabled functionality. Also see
 * `@IEnable` decorator mixin
 *
 * @param T type for enable/disable option arg
 */
export interface IEnable<T> {
    isEnabled(): boolean;
    /**
     * Disables this entity.
     * @param opts optional implementation specific arg
     */
    disable(opts?: T): any;
    /**
     * Enables this entity.
     * @param opts optional implementation specific arg
     */
    enable(opts?: T): any;
    toggle?(): boolean;
}

export interface IEquiv {
    /**
     * Returns `true` if this *value* is equivalent to `o`. Also see
     * `ICompare.compare` and `IHash.hash`.
     *
     * @param  o
     */
    equiv(o: any): boolean;
}

/**
 * @param T value type
 */
export interface IEqualsDelta<T> {
    /**
     * Returns `true` if this value equals `o` with optional allowance
     * for given tolerance `eps`.
     *
     * @param o 2nd value to test
     * @param eps tolerance (usually defaults to `DEFAULT_EPS`)
     */
    eqDelta(o: T, eps?: number): boolean;
}

export interface Event extends IID<PropertyKey> {
    target?: any;
    canceled?: boolean;
    value?: any;
}

/**
 * @param K key type
 * @param V value type
 */
export interface IGet<K, V> {
    get(key: K, notfound?: V): V | undefined;
}

/**
 * @param K key type
 * @param V value type
 */
export interface IGetIn<K, V> {
    getIn(key: K[], notfound?: V): V | undefined;
}

/**
 * Interface for hashable types.
 */
export interface IHash<T> {
    /**
     * Returns a value's hash code. The contract of this function is: If
     * `IEquiv.equiv` returns `true` for two values, their hash codes
     * MUST also be equal.
     */
    hash(): T;
}

/**
 * `id` property declaration.
 */
export interface IID<T> {
    readonly id: T;
}

/**
 * Interface for collection types which can be accessed via numeric
 * index.
 */
export interface IIndexed<T> {
    nth(i: number, notfound: T): T;
}

/**
 * Interface for collection types supporting addition of multiple
 * values.
 */
export interface IInto<V, T> {
    into(coll: Iterable<V>): T;
}

/**
 * `length` property declaration for collections to obtain their element
 * count.
 */
export interface ILength {
    readonly length: number;
}

export interface ILogger {
    /**
     * This logger's configured minimum log level
     */
    level: LogLevel;

    fine(...args: any[]): void;
    debug(...args: any[]): void;
    info(...args: any[]): void;
    warn(...args: any[]): void;
    severe(...args: any[]): void;
}

/**
 * Generic interface for types supporting metadata. Implementations MUST
 * exclude metadata from any comparisons, equality checks & hashing.
 */
export interface IMeta<T> {
    meta(): any;
    /**
     * Returns a copy of the original value with given metadata
     * attached.
     *
     * @param  meta
     */
    withMeta(meta: any): T;
}

/**
 * Interface to provide event emitter functionality. Also see `@INotify`
 * decorator mixin
 */
export interface INotify {
    addListener(id: string, fn: Listener, scope?: any): boolean;
    removeListener(id: string, fn: Listener, scope?: any): boolean;
    notify(event: Event): void;
}

/**
 * Generic plain object with all key values of given type.
 */
export interface IObjectOf<T> {
    [id: string]: T;
}

/**
 * Interface for types supported the release of internal resources.
 */
export interface IRelease {
    release(opt?: any): boolean;
}

/**
 * Generic interface for set collection types.
 *
 * @param V value type
 * @param T return type
 */
export interface ISet<V, T> extends IInto<V, T> {
    /**
     * Conjoins/adds value `x` to set.
     *
     * @param x
     */
    conj(x: V): T;
    /**
     * Disjoins/removes value `x` from set.
     *
     * @param x
     */
    disj(x: V): T;
}

/**
 * Generic interface for collections implementing
 * stack functionality.
 *
 * @param V value type
 * @param P return type for pop()
 * @param Q return type for push()
 */
export interface IStack<V, P, Q> {
    /**
     * Returns top-of-stack item.
     */
    peek(): V;
    /**
     * Removes top-of-stack item and returns type P.
     */
    pop(): P;
    push(x: V): Q;
}

export interface IToHiccup {
    /**
     * Returns a thi.ng/hiccup compatible representation. The optional
     * `ctx` arg is an arbitrary user context object passed to all
     * hiccup components during serialization (or during DOM creation /
     * update if used with thi.ng/hdom)
     *
     * @param ctx user context object
     */
    toHiccup(ctx?: any): any;
}

/**
 * Interface for types offering observers of internal value changes.
 * Also see `@IWatch` decorator mixin.
 */
export interface IWatch<T> {
    addWatch(id: string, fn: Watch<T>): boolean;
    removeWatch(id: string): boolean;
    notifyWatches(oldState: T, newState: T): void;
}
