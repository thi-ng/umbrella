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
