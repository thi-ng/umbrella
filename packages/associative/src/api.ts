import { Predicate2, Comparator } from "@thi.ng/api/api";

export type Pair<K, V> = [K, V];

export const SEMAPHORE = Symbol("SEMAPHORE");

export interface ArrayMapOpts<K> {
    equiv: Predicate2<K>;
}

export interface ArraySetOpts<T> {
    equiv: Predicate2<T>;
}

/**
 * SortedMapOpts implementation config settings.
 */
export interface SortedMapOpts<K> {
    /**
     * Key equivalence predicate. MUST return truthy result if given
     * keys are considered equal.
     *
     * Default: `@thi.ng/api/equiv`
     */
    equiv: Predicate2<K>;
    /**
     * Key comparison function. Must follow standard comparator contract
     * and return:
     * - negative if `a < b`
     * - positive if `a > b`
     * - `0` if `a == b`
     *
     * Note: The `SortedMap` implementation only uses `<` comparisons.
     *
     * Default: `@thi.ng/api/compare`
     */
    compare: Comparator<K>;
    /**
     * Initial capacity before resizing (doubling) occurs.
     * This value will be rounded up to next pow2.
     * Default: 16
     */
    capacity: number;
    /**
     * Probability for a value to exist in any express lane.
     * Default: `1 / Math.E`
     */
    probability: number;
}

export type SortedSetOpts<T> = SortedMapOpts<T>;
