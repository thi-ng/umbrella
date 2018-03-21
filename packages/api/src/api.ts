/**
 * @param K key type
 * @param V value type
 * @param T imlementation type
 */
export interface IAssociative<K, V, T> {
    assoc(key: K, val: V): T;
    assocIn(key: K[], val: V): T;
    update(key: K, f: (v: V) => V): T;
    updateIn(key: K[], f: (v: V) => V): T;
}

export interface IBind {
    /**
     * @returns true, if successful
     */
    bind(opt?: any): boolean;
    /**
     * @returns true, if successful
     */
    unbind(opt?: any): boolean;
}

/**
 * Generic interface for types with binary backing buffers.
 */
export interface IBuffered<T> {
    /**
     * An implementation's publically accessible backing array / ArrayBuffer
     * (usually a typed array instance).
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
     * Compares this value with given value `x`.
     * Must follow same contract as `Comparator`.
     *
     * @param x
     */
    compare(x: T): number;
}

/**
 * Generic 2-element comparator function type alias.
 * Must follow this contract and return:
 *
 * - negative if `a < b`
 * - zero if `a == b`
 * - positive if `a > b`
 */
export type Comparator<T> = (a: T, b: T) => number;

/**
 * Generic interface for collection types to check if a given value
 * is part of the collection.
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
     * Returns a copy of this instance.
     * Shallow or deep copies are implementation specific.
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
     * Returns an empty collection of same type (and possibly same config).
     */
    empty(): T;
}

/**
 * Interface to provide enabled/disabled functionality.
 * Also see `@IEnable` decorator mixin
 */
export interface IEnable {
    isEnabled(): boolean;
    /**
     * Disables this entity.
     * @param opts optional implementation specific arg
     */
    disable(opts?: any);
    /**
     * Enables this entity.
     * @param opts optional implementation specific arg
     */
    enable(opts?: any);
    toggle?(): boolean;
}

export interface IEquiv {
    /**
     * Returns `true` if this *value* is equivalent to `o`.
     * Also see `ICompare.compare` and `IHash.hash`.
     *
     * @param  o
     */
    equiv(o: any): boolean;
}

export const DEFAULT_EPS = 1e-6;

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

export const EVENT_ALL = "*";
export const EVENT_ENABLE = "enable";
export const EVENT_DISABLE = "disable";

export type Listener = (e: Event) => void;

/**
 * Interface to provide event emitter functionality.
 * Also see `@INotify` decorator mixin
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
    get(key: K, notfound?: any): V;
    getIn(key: K[], notfound?: any): V;
}

/**
 * Interface for hashable types.
 */
export interface IHash<T> {
    /**
     * Returns a value's hash code.
     * The contract of this function is: If
     * `IEquiv.equiv` returns `true` two values,
     * their hash codes MUST also be equal.
     */
    hash(): T;
}

export interface IID<T> {
    readonly id: T;
}

export interface IIndexed<T> {
    nth(i: number): T;
}

/**
 * Interface for collections to obtain their element count.
 */
export interface ILength {
    readonly length: number;
}

/**
 * Generic interface for types supporting metadata.
 * Implementations MUST exclude metadata from any comparisons,
 * equality checks & hashing.
 */
export interface IMeta<T> {
    __meta: any;
    /**
     * Returns a copy of the original value with given metadata attached.
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

export type Predicate<T> = (a: T) => boolean;
export type Predicate2<T> = (a: T, b: T) => boolean;

export type StatefulPredicate<T> = () => Predicate<T>;
export type StatefulPredicate2<T> = () => Predicate2<T>;

export interface IRelease {
    release(opt?: any): boolean;
}

/**
 * Generic interface for set collection types.
 *
 * @param V value type
 * @param T return or container type
 */
export interface ISet<V, T> {
    /**
     * Conjoins/adds value `x` to set and returns updated set
     * (possibly mutable operation).
     *
     * @param x
     */
    conj(x: V): T;
    /**
     * Disjoins/removes value `x` from set and returns updated set
     * (possibly mutable operation).
     *
     * @param x
     */
    disj(x: V): T;
}

/**
 * Generic interface for sequential collections implementing stack
 * functionality.
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
     * Returns collection w/ top-of-stack item removed.
     * It's implementation specific if this operation is
     * mutable or not.
     */
    pop(): T;
    push(x: V): T;
}

export type Watch<T> = (id: string, oldState: T, newState: T) => void;

export interface IWatch<T> {
    addWatch(id: string, fn: Watch<T>): boolean;
    removeWatch(id: string): boolean;
    notifyWatches(oldState: T, newState: T): void;
}
