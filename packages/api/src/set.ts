import type { IInto } from "./into.js";

/**
 * Generic interface for set collection types.
 *
 * @param V - value type
 * @param T - return type
 */
export interface ISet<V, T> extends IInto<V, T> {
    /**
     * Conjoins/adds value `x` to set.
     *
     * @param x - value to add
     */
    conj(x: V): T;
    /**
     * Disjoins/removes value `x` from set.
     *
     * @param x - value to remove
     */
    disj(x: V): T;
}
