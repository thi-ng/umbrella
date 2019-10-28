import { Fn0, Type, TypedArray } from "@thi.ng/api";

export type ComponentDefaultValue = ArrayLike<number> | Fn0<ArrayLike<number>>;

export type LRUEntry<T> = { k: number; v: T };

export interface ComponentOpts {
    type: Type;
    buf: ArrayBuffer;
    byteOffset: number;
    size: number;
    stride: number;
    default: ComponentDefaultValue;
    cache: ICache<TypedArray>;
}

export interface ComponentInfo {
    buffer: TypedArray;
    size: number;
    stride: number;
}

export interface ICache<T> {
    add(key: number, val: T): T;
    get(key: number): T | undefined;
    getSet(key: number, notFound: Fn0<T>): T;
    delete(key: number): boolean;
}
