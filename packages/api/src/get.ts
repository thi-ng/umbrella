/**
 * @param K - key type
 * @param V - value type
 */
export interface IGet<K, V> {
	get(key: K, notfound?: V): V | undefined;
}

/**
 * @param K - key type
 * @param V - value type
 */
export interface IGetIn<K, V> {
	getIn(key: K[], notfound?: V): V | undefined;
}
