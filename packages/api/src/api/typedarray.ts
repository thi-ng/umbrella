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

export type IntArray = Int8Array | Int16Array | Int32Array;
export type UIntArray = Uint8Array | Uint16Array | Uint32Array;
export type FloatArray = Float32Array | Float64Array;

export type TypedArrayConstructor =
    | Uint8ArrayConstructor
    | Uint8ClampedArrayConstructor
    | Int8ArrayConstructor
    | Uint16ArrayConstructor
    | Int16ArrayConstructor
    | Uint32ArrayConstructor
    | Int32ArrayConstructor
    | Float32ArrayConstructor
    | Float64ArrayConstructor;

/**
 * Type enums for Typedarray-backed buffers.
 *
 * @see GLType
 * @see GL2TYPE
 * @see TYPE2GL
 */
export const enum Type {
    U8,
    U8C,
    I8,
    U16,
    I16,
    U32,
    I32,
    F32,
    F64
}

/**
 * WebGL numeric type constants. Use `GL2TYPE` to convert, if needed.
 *
 * @see Type
 * @see GL2TYPE
 * @see TYPE2GL
 */
export const enum GLType {
    I8 = 0x1400,
    U8 = 0x1401,
    I16 = 0x1402,
    U16 = 0x1403,
    I32 = 0x1404,
    U32 = 0x1405,
    F32 = 0x1406
}

/**
 * Conversion from `GLType` to `Type` enums.
 */
export const GL2TYPE: Record<GLType, Type> = {
    [GLType.I8]: Type.I8,
    [GLType.U8]: Type.U8,
    [GLType.I16]: Type.I16,
    [GLType.U16]: Type.U16,
    [GLType.I32]: Type.I32,
    [GLType.U32]: Type.U32,
    [GLType.F32]: Type.F32
};

/**
 * Potentially lossy conversion from `Type` to `GLType` enums.
 *
 * Not all enums are mappable:
 *
 * - `F64` maps to `undefined`, since unsupported by WebGL
 * - `U8C` maps to U8
 */
export const TYPE2GL: Record<Type, GLType | undefined> = {
    [Type.I8]: GLType.I8,
    [Type.U8]: GLType.U8,
    [Type.U8C]: GLType.U8,
    [Type.I16]: GLType.I16,
    [Type.U16]: GLType.U16,
    [Type.I32]: GLType.I32,
    [Type.I32]: GLType.I32,
    [Type.U32]: GLType.U32,
    [Type.F32]: GLType.F32,
    [Type.F64]: undefined
};

/**
 * Size information (in bytes) for `Type` enums. For `GLType`, use this
 * form, e.g. `SIZEOF[GL2TYPE[GLType.F32]]`
 */
export const SIZEOF = {
    [Type.U8]: 1,
    [Type.U8C]: 1,
    [Type.I8]: 1,
    [Type.U16]: 2,
    [Type.I16]: 2,
    [Type.U32]: 4,
    [Type.I32]: 4,
    [Type.F32]: 4,
    [Type.F64]: 8
};

export const TYPEDARRAY_CTORS: Record<Type | GLType, TypedArrayConstructor> = {
    [Type.U8]: Uint8Array,
    [Type.U8C]: Uint8ClampedArray,
    [Type.I8]: Int8Array,
    [Type.U16]: Uint16Array,
    [Type.I16]: Int16Array,
    [Type.U32]: Uint32Array,
    [Type.I32]: Int32Array,
    [Type.F32]: Float32Array,
    [Type.F64]: Float64Array,
    [GLType.U8]: Uint8Array,
    [GLType.I8]: Int8Array,
    [GLType.U16]: Uint16Array,
    [GLType.I16]: Int16Array,
    [GLType.U32]: Uint32Array,
    [GLType.I32]: Int32Array,
    [GLType.F32]: Float32Array
};

export interface TypedArrayTypeMap extends Record<Type | GLType, TypedArray> {
    [Type.U8]: Uint8Array;
    [Type.U8C]: Uint8ClampedArray;
    [Type.I8]: Int8Array;
    [Type.U16]: Uint16Array;
    [Type.I16]: Int16Array;
    [Type.U32]: Uint32Array;
    [Type.I32]: Int32Array;
    [Type.F32]: Float32Array;
    [Type.F64]: Float64Array;
    [GLType.U8]: Uint8Array;
    [GLType.I8]: Int8Array;
    [GLType.U16]: Uint16Array;
    [GLType.I16]: Int16Array;
    [GLType.U32]: Uint32Array;
    [GLType.I32]: Int32Array;
    [GLType.F32]: Float32Array;
}

/**
 * Constructs new typed array of given `Type`/`GLType`. Supports all
 * arities of standard typed array ctors.
 *
 * @param type
 */
// prettier-ignore
export function typedArray<T extends Type | GLType>(type: T, length: number): TypedArrayTypeMap[T];
// prettier-ignore
export function typedArray<T extends Type | GLType>(type: T, src: ArrayLike<number> | ArrayBufferLike): TypedArrayTypeMap[T];
// prettier-ignore
export function typedArray<T extends Type | GLType>(type: T, buf: ArrayBufferLike, byteOffset: number, length?: number): TypedArrayTypeMap[T];
export function typedArray<T extends Type | GLType>(type: T, ...xs: any[]) {
    return new (<any>TYPEDARRAY_CTORS[type])(...xs);
}
