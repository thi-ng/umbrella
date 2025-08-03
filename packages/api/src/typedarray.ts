// SPDX-License-Identifier: Apache-2.0
import type { Maybe } from "./null.js";

export type ArrayLikeIterable<T> = ArrayLike<T> & Iterable<T>;

export type NumericArray<T extends ArrayBufferLike = ArrayBufferLike> =
	| number[]
	| TypedArray<T>;

export type TypedArray<T extends ArrayBufferLike = ArrayBufferLike> =
	| FloatArray<T>
	| FloatArray<T>
	| IntArray<T>
	| UIntArray<T>;

export type BigTypedArray<T extends ArrayBufferLike = ArrayBufferLike> =
	| BigInt64Array<T>
	| BigUint64Array<T>;

export type FloatArray<T extends ArrayBufferLike = ArrayBufferLike> =
	| Float32Array<T>
	| Float64Array<T>;

export type IntArray<T extends ArrayBufferLike = ArrayBufferLike> =
	| Int8Array<T>
	| Int16Array<T>
	| Int32Array<T>;

export type UIntArray<T extends ArrayBufferLike = ArrayBufferLike> =
	| Uint8Array<T>
	| Uint8ClampedArray<T>
	| Uint16Array<T>
	| Uint32Array<T>;

export type FloatArrayConstructor =
	| Float32ArrayConstructor
	| Float64ArrayConstructor;

export type IntArrayConstructor =
	| Int8ArrayConstructor
	| Int16ArrayConstructor
	| Int32ArrayConstructor;

export type UIntArrayConstructor =
	| Uint8ArrayConstructor
	| Uint8ClampedArrayConstructor
	| Uint16ArrayConstructor
	| Uint32ArrayConstructor;

export type BigIntArrayConstructor =
	| BigInt64ArrayConstructor
	| BigUint64ArrayConstructor;

export type TypedArrayConstructor =
	| FloatArrayConstructor
	| IntArrayConstructor
	| UIntArrayConstructor;

/**
 * Type IDs for typed array backed buffers and generally describing binary data
 * values.
 *
 * {@link GLType} {@link GL2TYPE} {@link TYPE2GL}
 */
export type Type =
	| "u8"
	| "u8c"
	| "i8"
	| "u16"
	| "i16"
	| "u32"
	| "i32"
	| "f32"
	| "f64";

export type BigType = "i64" | "u64";

export type UintType = "u8" | "u8c" | "u16" | "u32";

export type IntType = "i8" | "i16" | "i32";

export type FloatType = "f32" | "f64";

/**
 * WebGL numeric type constants. Use {@link GL2TYPE} to convert, if needed.
 *
 * {@link Type}
 * {@link GL2TYPE}
 * {@link TYPE2GL}
 */
export enum GLType {
	I8 = 0x1400,
	U8 = 0x1401,
	I16 = 0x1402,
	U16 = 0x1403,
	I32 = 0x1404,
	U32 = 0x1405,
	F32 = 0x1406,
}

/**
 * Conversion from {@link GLType} to {@link Type} enums.
 */
export const GL2TYPE: Record<GLType, Type> = {
	[GLType.I8]: "i8",
	[GLType.U8]: "u8",
	[GLType.I16]: "i16",
	[GLType.U16]: "u16",
	[GLType.I32]: "i32",
	[GLType.U32]: "u32",
	[GLType.F32]: "f32",
};

/**
 * Potentially lossy conversion from {@link Type} to {@link GLType} enums.
 *
 * Not all enums are mappable:
 *
 * - `F64` maps to `undefined`, since unsupported by WebGL
 * - `U8C` maps to "u8"
 */
export const TYPE2GL: Record<Type, Maybe<GLType>> = {
	i8: GLType.I8,
	u8: GLType.U8,
	u8c: GLType.U8,
	i16: GLType.I16,
	u16: GLType.U16,
	i32: GLType.I32,
	u32: GLType.U32,
	f32: GLType.F32,
	f64: undefined,
};

/**
 * Size information (in bytes) for {@link Type} and {@link BigType}. Also see
 * {@link sizeOf}.
 */
export const SIZEOF = {
	u8: 1,
	u8c: 1,
	i8: 1,
	u16: 2,
	i16: 2,
	u32: 4,
	i32: 4,
	i64: 8,
	u64: 8,
	f32: 4,
	f64: 8,
};

/**
 * Bit shift values to convert byte addresses into array indices for all
 * {@link Type}s and {@link BigType}s.
 */
export const BIT_SHIFTS = {
	i8: 0,
	u8: 0,
	u8c: 0,
	i16: 1,
	u16: 1,
	i32: 2,
	u32: 2,
	i64: 3,
	u64: 3,
	f32: 2,
	f64: 3,
};

export const FLOAT_ARRAY_CTORS: Record<FloatType, FloatArrayConstructor> = {
	f32: Float32Array,
	f64: Float64Array,
};

export const INT_ARRAY_CTORS: Record<IntType, IntArrayConstructor> = {
	i8: Int8Array,
	i16: Int16Array,
	i32: Int32Array,
};

export const UINT_ARRAY_CTORS: Record<UintType, UIntArrayConstructor> = {
	u8: Uint8Array,
	u8c: Uint8ClampedArray,
	u16: Uint16Array,
	u32: Uint32Array,
};

export const BIGINT_ARRAY_CTORS: Record<BigType, BigIntArrayConstructor> = {
	i64: BigInt64Array,
	u64: BigUint64Array,
};

export const TYPEDARRAY_CTORS: Record<Type, TypedArrayConstructor> = {
	...FLOAT_ARRAY_CTORS,
	...INT_ARRAY_CTORS,
	...UINT_ARRAY_CTORS,
};

export interface TypedArrayTypeMap<T extends ArrayBufferLike = ArrayBufferLike>
	extends Record<Type | GLType, TypedArray<T>> {
	u8: Uint8Array<T>;
	u8c: Uint8ClampedArray<T>;
	i8: Int8Array<T>;
	u16: Uint16Array<T>;
	i16: Int16Array<T>;
	u32: Uint32Array<T>;
	i32: Int32Array<T>;
	f32: Float32Array<T>;
	f64: Float64Array<T>;
	[GLType.U8]: Uint8Array<T>;
	[GLType.I8]: Int8Array<T>;
	[GLType.U16]: Uint16Array<T>;
	[GLType.I16]: Int16Array<T>;
	[GLType.U32]: Uint32Array<T>;
	[GLType.I32]: Int32Array<T>;
	[GLType.F32]: Float32Array<T>;
}

export interface BigTypedArrayTypeMap<
	T extends ArrayBufferLike = ArrayBufferLike
> extends Record<BigType, BigTypedArray<T>> {
	i64: BigInt64Array<T>;
	u64: BigUint64Array<T>;
}

/**
 * Returns canonical {@link Type} value of `type` by first
 * attempting to resolve it as {@link GLType} enum.
 *
 * @example
 * ```ts tangle:../export/as-native-type.ts
 * import { asNativeType, GLType } from "@thi.ng/api";
 *
 * console.log(
 *   asNativeType(GLType.F32)
 * );
 * // "f32"
 *
 * console.log(
 *   asNativeType("f32")
 * );
 * // "f32"
 * ```
 *
 * @param type -
 */
export const asNativeType = (type: GLType | Type): Type => {
	const t = GL2TYPE[<GLType>type];
	return t !== undefined ? t : <Type>type;
};

/**
 * Returns suitable {@link GLType} enum of `type`.
 *
 * @example
 * ```ts tangle:../export/as-gl-type.ts
 * import { asGLType, GLType } from "@thi.ng/api";
 *
 * console.log(
 *   asGLType("f32")
 * );
 * // 5126 (aka GLType.F32)
 *
 * console.log(
 *   asGLType(GLType.F32)
 * );
 * // 5126 (aka GLType.F32)
 * ```
 *
 * @param type -
 */
export const asGLType = (type: GLType | Type): GLType => {
	const t = TYPE2GL[<Type>type];
	return t !== undefined ? t : <GLType>type;
};

/**
 * Coerces given numeric args to integer values.
 */
export const asInt = (...args: number[]) => args.map((x) => x | 0);

/**
 * Returns byte size for given {@link Type} ID or {@link GLType} enum.
 *
 * @param type -
 */
export const sizeOf = (type: Type | BigType | GLType) =>
	SIZEOF[<Type>type] || SIZEOF[asNativeType(<Type>type)];

/**
 * Constructs new typed array of given {@link Type}, {@link GLType} or
 * {@link BigType}. Supports all arities of standard typed array ctors.
 *
 * @param type - array type enum
 */
export function typedArray<T extends Type | GLType>(
	type: T,
	length: number
): TypedArrayTypeMap[T];
export function typedArray<T extends Type | GLType, B extends ArrayBufferLike>(
	type: T,
	src: ArrayLike<number> | B
): TypedArrayTypeMap<B>[T];
export function typedArray<T extends Type | GLType, B extends ArrayBufferLike>(
	type: T,
	buf: B,
	byteOffset: number,
	length?: number
): TypedArrayTypeMap<B>[T];
export function typedArray<T extends BigType, B extends ArrayBufferLike>(
	type: T,
	length: number
): BigTypedArrayTypeMap<B>[T];
export function typedArray<T extends BigType, B extends ArrayBufferLike>(
	type: T,
	src: ArrayLike<bigint> | B
): BigTypedArrayTypeMap<B>[T];
export function typedArray<T extends BigType, B extends ArrayBufferLike>(
	type: T,
	buf: ArrayBufferLike,
	byteOffset: number,
	length?: number
): BigTypedArrayTypeMap<B>[T];
export function typedArray<T extends Type | GLType | BigType>(
	type: T,
	...args: any[]
) {
	const ctor = BIGINT_ARRAY_CTORS[<BigType>type];
	return new (ctor || TYPEDARRAY_CTORS[asNativeType(<any>type)])(...args);
}

/**
 * Constructs a typed array for given `type` and populates it with given vector
 * values.
 *
 * @remarks
 * The size of the array will be `data.length * stride`, where `stride` is the
 * number of elements per item and defaulting to the size of the first data
 * item/vector given.
 *
 * @example
 * ```ts tangle:../export/typed-array.ts
 * import { typedArrayOfVec } from "@thi.ng/api";
 *
 * // inferred stride=2 (2d vectors)
 * console.log(
 *   typedArrayOfVec("f32", [[1,2], [3,4], [-10,20]])
 * );
 * // Float32Array(6) [ 1, 2, 3, 4, -10, 20 ]
 *
 * // with custom stride=4
 * console.log(
 *   typedArrayOfVec("f32", [[1,2], [3,4], [-10,20]], 4)
 * );
 * // Float32Array(12) [ 1, 2, 0, 0, 3,4, 0, 0, -10, 20, 0, 0 ]
 * ```
 *
 * @param type
 * @param data
 * @param stride
 */
export function typedArrayOfVec<T extends Type | GLType>(
	type: T,
	data: Iterable<ArrayLike<number>>,
	stride?: number
): TypedArrayTypeMap[T];
export function typedArrayOfVec<T extends BigType>(
	type: T,
	data: Iterable<ArrayLike<bigint>>,
	stride?: number
): BigTypedArrayTypeMap[T];
export function typedArrayOfVec<T extends Type | GLType | BigType>(
	type: T,
	data: Iterable<ArrayLike<number | bigint>>,
	stride?: number
) {
	const $data = Array.isArray(data) ? data : [...data];
	if (stride === undefined) stride = $data[0].length;
	const num = $data.length;
	const res = typedArray(<Type>type, num * stride!);
	for (let i = 0, j = 0; i < num; i++, j += stride!) {
		res.set($data[i], j);
	}
	return res;
}

/**
 * Takes an {@link NumericArray} and returns its corresponding {@link Type} ID.
 * Standard JS arrays will default to "f64".
 *
 * @param x -
 */
export const typedArrayType = (x: NumericArray) => {
	if (Array.isArray(x)) return "f64";
	for (let id in TYPEDARRAY_CTORS) {
		if (x instanceof (<any>TYPEDARRAY_CTORS)[id]) return <Type>id;
	}
	return "f64";
};

/**
 * Returns the smallest possible *unsigned* int type enum for given `x`.
 * E.g. if `x <= 256`, the function returns `"u8"`.
 *
 * @param x - value to classify
 */
export const uintTypeForSize = (x: number): UintType =>
	x <= 0x100 ? "u8" : x <= 0x10000 ? "u16" : "u32";

/**
 * Returns the smallest possible *signed* int type enum for given `x`.
 * E.g. if `x >= -128 && x < 128`, the function returns `"i8"`.
 *
 * @param x - value to classify
 */
export const intTypeForSize = (x: number): IntType =>
	x >= -0x80 && x < 0x80 ? "i8" : x >= -0x8000 && x < 0x8000 ? "i16" : "i32";

/**
 * Returns suitable {@link UintType} for given bit size (`[0,32]` range)
 *
 * @param x -
 */
export const uintTypeForBits = (x: number): UintType =>
	x > 16 ? "u32" : x > 8 ? "u16" : "u8";

/**
 * Returns suitable {@link IntType} for given bit size (`[0,32]` range)
 *
 * @param x -
 */
export const intTypeForBits = (x: number): IntType =>
	x > 16 ? "i32" : x > 8 ? "i16" : "i8";

/**
 * Returns the next smaller {@link IntType} for given type (or the same type if
 * already the narrowest).
 *
 * @param t
 */
export const narrowInt = (t: IntType | "i64") =>
	t === "i64" ? "i32" : t === "i32" ? "i16" : t === "i16" ? "i8" : "i8";

/**
 * Returns the next larger {@link IntType} for given type (or the same type if
 * already the widest).
 *
 * @param t
 */
export const widenInt = (t: IntType) =>
	t === "i8" ? "i16" : t === "i16" ? "i32" : t === "i32" ? "i64" : "i64";

/**
 * Returns the next smaller {@link UintType} for given type (or the same type if
 * already the narrowest).
 *
 * @remarks
 * If type is `u8c`, returns `u8`.
 *
 * @param t
 */
export const narrowUint = (t: UintType | "u64") =>
	t === "u64" ? "u32" : t === "u32" ? "u16" : t === "u16" ? "u8" : "u8";

/**
 * Returns the next larger {@link UintType} for given type (or the same type if
 * already the widest).
 *
 * @param t
 */
export const widenUint = (t: UintType) =>
	t === "u8" || t === "u8c"
		? "u16"
		: t === "u16"
		? "u32"
		: t === "u32"
		? "u64"
		: "u64";

/**
 * Returns the next smaller {@link FloatType} for given type (or the same type
 * if already the narrowest).
 *
 * @param t
 */
export const narrowFloat = (t: FloatType) => (t === "f64" ? "f32" : "f32");

/**
 * Returns the next larger {@link FloatType} for given type (or the same type if
 * already the widest).
 *
 * @param t
 */
export const widenFloat = (t: FloatType) => (t === "f32" ? "f64" : "f64");

/**
 * Returns the next smaller type (i.e. {@link IntType}, {@link UintType} or
 * {@link FloatType}) for given type (or the same type if already the smallest).
 *
 * @param t
 */
export const narrowType = (t: Type | BigType) =>
	t[0] === "i"
		? narrowInt(<IntType>t)
		: t[0] === "u"
		? narrowUint(<UintType>t)
		: narrowFloat(<FloatType>t);

/**
 * Returns the next larger type (i.e. {@link IntType}, {@link UintType} or
 * {@link FloatType}) for given type (or the same type if already the widest).
 *
 * @param t
 */
export const widenType = (t: Type | BigType) =>
	t[0] === "i"
		? widenInt(<IntType>t)
		: t[0] === "u"
		? widenUint(<UintType>t)
		: widenFloat(<FloatType>t);
