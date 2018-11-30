import { IRelease, TypedArray } from "@thi.ng/api/api";
import { Type } from "@thi.ng/malloc/api";
import { StridedVec, Vec, ReadonlyVec } from "@thi.ng/vectors3/api";

export interface AttribSpec {
    type: Type;
    size: number;
    default: number | ReadonlyVec;
    byteOffset: number;
    stride?: number;
}

export interface IVecPool extends IRelease {

    malloc(size: number, type?: Type): TypedArray;

    mallocWrapped(size: number, stride?: number, type?: Type): StridedVec;

    mallocArray(num: number, size: number, cstride?: number, estride?: number, type?: Type): StridedVec[];

    free(vec: StridedVec | TypedArray): boolean;

    freeAll();
}

export type VecFactory =
    (buf: Vec, size: number, index: number, stride: number) => StridedVec;

export { Type };
