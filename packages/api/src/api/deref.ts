/**
 * Generic interface for reference types (value wrappers).
 */
export interface IDeref<T> {
    /**
     * Returns wrapped value.
     */
    deref(): T;
}
