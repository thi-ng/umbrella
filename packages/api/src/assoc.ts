import type { Fn } from "./fn.js";

/**
 * A key-value pair / tuple.
 */
export type Pair<K, V> = [K, V];

/**
 * @param K - key type
 * @param V - value type
 * @param T - return type
 */
export interface IAssoc<K, V, T> {
	assoc(key: K, val: V): T;
	update(key: K, f: Fn<V, V>): T;
}

/**
 * @param K - key type
 * @param V - value type
 * @param T - return type
 */
export interface IAssocIn<K, V, T> {
	assocIn(key: K[], val: V): T;
	updateIn(key: K[], f: Fn<V, V>): T;
}
