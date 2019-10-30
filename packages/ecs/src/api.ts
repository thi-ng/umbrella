import {
    Fn0,
    IID,
    IRelease,
    Type,
    TypedArray,
    TypedArrayTypeMap
} from "@thi.ng/api";

export const EVENT_ADDED = "added";
export const EVENT_PRE_REMOVE = "pre-remove";
export const EVENT_CHANGED = "changed";

export type ComponentDefaultValue = ArrayLike<number> | Fn0<ArrayLike<number>>;

export type ComponentTuple<K extends string> = Record<K, TypedArray> &
    IID<number>;

export interface ComponentOpts<ID extends string, T extends Type = Type.F32> {
    id: ID;
    type?: T;
    buf?: ArrayBuffer;
    byteOffset?: number;
    size?: number;
    stride?: number;
    default?: ComponentDefaultValue;
    cache?: ICache<TypedArrayTypeMap[T]>;
}

export interface GroupOpts {
    id: string;
    cache: ICache<ComponentTuple<string>>;
}

export interface ComponentInfo {
    buffer: TypedArray;
    size: number;
    stride: number;
}

export interface ICache<T> extends IRelease {
    keys(): Iterable<number>;
    set(key: number, val: T): T;
    get(key: number): T | undefined;
    getSet(key: number, notFound: Fn0<T>): T;
    delete(key: number): boolean;
}
