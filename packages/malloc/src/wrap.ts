import { IObjectOf, Type } from "@thi.ng/api";

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

export const TYPEDARRAY_CTORS: IObjectOf<TypedArrayConstructor> = {
    [Type.U8]: Uint8Array,
    [Type.U8C]: Uint8ClampedArray,
    [Type.I8]: Int8Array,
    [Type.U16]: Uint16Array,
    [Type.I16]: Int16Array,
    [Type.U32]: Uint32Array,
    [Type.I32]: Int32Array,
    [Type.F32]: Float32Array,
    [Type.F64]: Float64Array
};

export const wrap = (type: Type, buf: ArrayBuffer, addr: number, num: number) =>
    new TYPEDARRAY_CTORS[type](buf, addr, num);
