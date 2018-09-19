export const DEFAULT_EPS = 1e-6;

export const EVENT_ALL = "*";
export const EVENT_ENABLE = "enable";
export const EVENT_DISABLE = "disable";

export const SEMAPHORE = Symbol();

/**
 * Generic 2-element comparator function type alias. Must follow this
 * contract and return:
 *
 * - negative if `a < b`
 * - zero if `a == b`
 * - positive if `a > b`
 */
export type Comparator<T> = (a: T, b: T) => number;

/**
 * A single arg function from A => B.
 */
export type Fn<A, B> = (x: A) => B;

/**
 * A vararg arg function to type T.
 */
export type FnAny<T> = (...xs: any[]) => T;

/**
 * Event listener.
 */
export type Listener = (e: Event) => void;

export type NumericArray = number[] | TypedArray;

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
export type Predicate<T> = (a: T) => boolean;

/**
 * Predicate function mapping given args to true/false.
 */
export type Predicate2<T> = (a: T, b: T) => boolean;

/**
 * Higher order `Predicate` builder. Possibly stateful.
 */
export type StatefulPredicate<T> = () => Predicate<T>;

/**
 * Higher order `Predicate2` builder. Possibly stateful.
 */
export type StatefulPredicate2<T> = () => Predicate2<T>;

export type TypedArray =
    Float32Array |
    Float64Array |
    Int8Array |
    Int16Array |
    Int32Array |
    Uint8Array |
    Uint8ClampedArray |
    Uint16Array |
    Uint32Array;

/**
 * Observer function for `IWatch` implementations.
 */
export type Watch<T> = (id: string, oldState: T, newState: T) => void;

/**
 * @param K key type
 * @param V value type
 * @param T implementation type
 */
export interface IAssociative<K, V, T> {
    assoc(key: K, val: V): T;
    assocIn(key: K[], val: V): T;
    update(key: K, f: (v: V) => V): T;
    updateIn(key: K[], f: (v: V) => V): T;
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
 * Extension of `IAssociative` for types supporting key removals.
 *
 * @param K key type
 * @param V value type
 * @param T imlementation type
 */
export interface IDissoc<K, V, T> extends IAssociative<K, V, T> {
    dissoc(key: K): T;
}

export interface IEmpty<T> {
    /**
     * Returns an empty collection of same type (and possibly same
     * config).
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
    disable(opts: T);
    /**
     * Enables this entity.
     * @param opts optional implementation specific arg
     */
    enable(opts: T);
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
 * Interface to provide event emitter functionality. Also see `@INotify`
 * decorator mixin
 */
export interface INotify {
    addListener(id: string, fn: Listener, scope?: any): boolean;
    removeListener(id: string, fn: Listener, scope?: any): boolean;
    notify(event: Event): void;
}

/**
 * @param K key type
 * @param V value type
 */
export interface IGet<K, V> {
    get(key: K, notfound?: V): V;
    getIn(key: K[], notfound?: V): V;
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
export interface IInto<T> {
    into(coll: Iterable<T>): this;
}

/**
 * `length` property declaration for collections to obtain their element
 * count.
 */
export interface ILength {
    readonly length: number;
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
 * Generic interface for MUTABLE set collection types.
 *
 * @param T value type
 */
export interface ISet<T> extends IInto<T> {
    /**
     * Conjoins/adds value `x` to set and returns true if `x` has been
     * added.
     *
     * @param x
     */
    conj(x: T): boolean;
    /**
     * Disjoins/removes value `x` from set and returns true if `x` has
     * been removed.
     *
     * @param x
     */
    disj(x: T): boolean;
}

/**
 * Generic interface for IMMUTABLE set collection types.
 *
 * @param V value type
 * @param T implementation type
 */
export interface IImmutableSet<V, T> extends IInto<V> {
    /**
     * Conjoins/adds value `x` to set and returns updated set.
     *
     * @param x
     */
    conj(x: V): T;
    /**
     * Disjoins/removes value `x` from set and returns updated set.
     *
     * @param x
     */
    disj(x: V): T;
}

/**
 * Generic interface for MUTABLE sequential collections implementing
 * stack functionality.
 *
 * @param V value type
 * @param T return/container type
 */
export interface IStack<V, T> {
    /**
     * Returns top-of-stack item.
     */
    peek(): V;
    /**
     * Removes top-of-stack item and returns it.
     */
    pop(): V;
    push(x: V): T;
}

/**
 * Generic interface for IMMUTABLE sequential collections implementing
 * stack functionality.
 *
 * @param V value type
 * @param T return/container type
 */
export interface IImmutableStack<V, T> {
    /**
     * Returns top-of-stack item.
     */
    peek(): V;
    /**
     * Returns collection w/ top-of-stack item removed.
     */
    pop(): T;
    push(x: V): T;
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
