import type { Fn2 } from "./fn";

/**
 * Generic 2-element comparator function type alias.
 *
 * @remarks
 * Must follow this contract and return:
 *
 * - negative if `a < b`
 * - zero if `a == b`
 * - positive if `a > b`
 */
export type Comparator<T> = Fn2<T, T, number>;

/**
 * Generic interface to compare value types.
 */
export interface ICompare<T> {
    /**
     * Compares this value with given value `x`. MUST follow same
     * contract as {@link Comparator}.
     *
     * @remarks
     * MUST return 0 if the type also implements `IEquiv` and `equiv`
     * returns true for same `x`.
     *
     * Also see {@link IHash}.
     *
     * @param x - compare value
     */
    compare(x: T): number;
}
