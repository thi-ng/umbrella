// SPDX-License-Identifier: Apache-2.0
import type { Maybe } from "./null.js";

/**
 * @param K - key type
 * @param V - value type
 */
export interface IGet<K, V> {
	get(key: K, notfound?: V): Maybe<V>;
}

/**
 * @param K - key type
 * @param V - value type
 */
export interface IGetIn<K, V> {
	getIn(key: K[], notfound?: V): Maybe<V>;
}
