export const isMap = <K = any, V = any>(x: any): x is Map<K, V> =>
	x instanceof Map;
