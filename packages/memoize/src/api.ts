// SPDX-License-Identifier: Apache-2.0
import type { Maybe } from "@thi.ng/api";

export interface MapLike<K, V> {
	has(key: K): boolean;
	get(key: K): Maybe<V>;
	set(key: K, val: V): any;
}
