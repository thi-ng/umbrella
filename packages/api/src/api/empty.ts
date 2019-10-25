export interface IEmpty<T> {
    /**
     * Returns an empty/blank instance of same type (with possibly same
     * config, if any).
     */
    empty(): T;
}
