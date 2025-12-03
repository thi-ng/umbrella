// SPDX-License-Identifier: Apache-2.0
export type TypedArray = IntArray | UintArray | FloatArray;

// TODO add Float16Array once widely supported
export type FloatArray = Float32Array | Float64Array;

// TODO add bigint array types
export type IntArray = Int8Array | Int16Array | Int32Array;

export type UintArray =
	| Uint8Array
	| Uint8ClampedArray
	| Uint16Array
	| Uint32Array;

export const isTypedArray = (x: any): x is TypedArray =>
	!!x &&
	(x instanceof Uint8Array ||
		x instanceof Int8Array ||
		x instanceof Uint16Array ||
		x instanceof Int16Array ||
		x instanceof Uint32Array ||
		x instanceof Int32Array ||
		x instanceof Float32Array ||
		x instanceof Float64Array ||
		x instanceof Uint8ClampedArray);

export const isIntArray = (x: any): x is IntArray =>
	!!x &&
	(x instanceof Int8Array ||
		x instanceof Int16Array ||
		x instanceof Int32Array);

export const isUintArray = (x: any): x is UintArray =>
	!!x &&
	(x instanceof Uint32Array ||
		x instanceof Uint16Array ||
		x instanceof Uint8Array ||
		x instanceof Uint8ClampedArray);

export const isFloatArray = (x: any): x is FloatArray =>
	!!x && (x instanceof Float32Array || x instanceof Float64Array);
