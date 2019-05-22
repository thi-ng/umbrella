import {
    IObjectOf,
    IRelease,
    Type,
    TypedArray
} from "@thi.ng/api";
import { MemPool, MemPoolOpts } from "@thi.ng/malloc";
import { ReadonlyVec, StridedVec, Vec } from "@thi.ng/vectors";

export interface AttribSpec {
    type: GLType | Type;
    size: number;
    byteOffset: number;
    stride?: number;
    default?: number | ReadonlyVec;
    data?: ReadonlyVec | ReadonlyVec[];
    index?: number;
}

export interface AttribPoolOpts {
    mem: MemPool | Partial<MemPoolOpts>;
    attribs?: IObjectOf<AttribSpec>;
    num: number;
    resizable?: boolean;
}

export interface IVecPool extends IRelease {
    malloc(size: number, type?: GLType | Type): TypedArray;

    mallocWrapped(
        size: number,
        stride?: number,
        type?: GLType | Type
    ): StridedVec;

    mallocArray(
        num: number,
        size: number,
        cstride?: number,
        estride?: number,
        type?: GLType | Type
    ): StridedVec[];

    free(vec: StridedVec | TypedArray): boolean;

    freeAll();
}

export type VecFactory = (
    buf: Vec,
    size: number,
    index: number,
    stride: number
) => StridedVec;

/**
 * WebGL numeric type constants. These can be used by classes in this
 * package as aliases for thi.ng/malloc's `Type` enum (see `GL2TYPE` LUT
 * below), but also then used directly when initializing WebGL buffers
 * from given attribute buffer specs.
 *
 * See `AttribPool` & readme examples for more details.
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
 * Conversion from `GLType` to `Type`.
 */
export const GL2TYPE = {
    [GLType.I8]: Type.I8,
    [GLType.U8]: Type.U8,
    [GLType.I16]: Type.I16,
    [GLType.U16]: Type.U16,
    [GLType.I32]: Type.I32,
    [GLType.I32]: Type.I32,
    [GLType.U32]: Type.U32,
    [GLType.F32]: Type.F32
};

/**
 * Conversion from `Type` to `GLType`.
 */
export const TYPE2GL = {
    [Type.I8]: GLType.I8,
    [Type.U8]: GLType.U8,
    [Type.I16]: GLType.I16,
    [Type.U16]: GLType.U16,
    [Type.I32]: GLType.I32,
    [Type.I32]: GLType.I32,
    [Type.U32]: GLType.U32,
    [Type.F32]: GLType.F32
};
