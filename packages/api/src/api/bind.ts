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
