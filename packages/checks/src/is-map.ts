// SPDX-License-Identifier: Apache-2.0
export const isMap = <K = any, V = any>(x: any): x is Map<K, V> =>
	x instanceof Map;
