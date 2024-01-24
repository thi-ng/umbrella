export type TypedArray =
	| Float32Array
	| Float64Array
	| Int8Array
	| Int16Array
	| Int32Array
	| Uint8Array
	| Uint8ClampedArray
	| Uint16Array
	| Uint32Array;

export const isTypedArray = (x: any): x is TypedArray =>
	!!x &&
	(x instanceof Float32Array ||
		x instanceof Float64Array ||
		x instanceof Uint32Array ||
		x instanceof Int32Array ||
		x instanceof Uint8Array ||
		x instanceof Int8Array ||
		x instanceof Uint16Array ||
		x instanceof Int16Array ||
		x instanceof Uint8ClampedArray);
