import { TypedArray } from "./api/typedarray";

export const DEFAULT_EPS = 1e-6;

/**
 * Internal use only. **Do NOT use in user land code!**
 *
 * @internal
 */
export const SEMAPHORE = Symbol();

export type ArrayLikeIterable<T> = ArrayLike<T> & Iterable<T>;

export type NumericArray = number[] | TypedArray;

export type Nullable<T> = T | null | undefined;

export type NumOrString = number | string;

export type Primitive = NumOrString | boolean | symbol;

/**
 * Lookup path for nested data structures.
 */
export type Path = PropertyKey | PropertyKey[];

/**
 * A key-value pair / tuple.
 */
export type Pair<K, V> = [K, V];
