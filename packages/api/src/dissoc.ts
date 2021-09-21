import type { IAssoc, IAssocIn } from "./assoc";

/**
 * Extension of `IAssoc` for types supporting key removals.
 *
 * @param K - key type
 * @param V - value type
 * @param T - return type
 */
export interface IDissoc<K, V, T> extends IAssoc<K, V, T> {
    dissoc(key: K): T;
}

/**
 * Extension of `IAssocIn` for types supporting key removals.
 *
 * @param K - key type
 * @param V - value type
 * @param T - return type
 */
export interface IDissocIn<K, V, T> extends IAssocIn<K, V, T> {
    dissocIn(key: K[]): T;
}
