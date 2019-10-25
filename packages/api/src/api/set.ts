import { IInto } from "./into";

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
