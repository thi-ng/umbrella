/**
 * Generic interface for collections implementing
 * stack functionality.
 *
 * @param V - value type
 * @param P - return type for pop()
 * @param S - return type for push()
 */
export interface IStack<V, P, S> {
    /**
     * Returns top-of-stack item.
     */
    peek(): V | undefined;
    /**
     * Removes top-of-stack item and returns type P.
     */
    pop(): P | undefined;
    push(x: V): S;
}
