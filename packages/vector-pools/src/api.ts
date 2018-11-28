import { IRelease, TypedArray } from "@thi.ng/api/api";
import { Type } from "@thi.ng/malloc/api";
import { IVector, Vec } from "@thi.ng/vectors3/api";

export interface IVecPool extends IRelease {

    malloc(size: number, type?: Type): TypedArray;

    mallocWrapped(size: number, stride?: number, type?: Type): IVector<any>;

    mallocArray(num: number, size: number, cstride?: number, estride?: number, type?: Type): IVector<any>[];

    free(vec: IVector<any> | TypedArray): boolean;

    freeAll();
}

export type VecFactory =
    (buf: Vec, size: number, index: number, stride: number) => IVector<any>;

export { Type };
