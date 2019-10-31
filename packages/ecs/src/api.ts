import {
    ArrayLikeIterable,
    Fn0,
    IID,
    INotify,
    IRelease,
    Type,
    TypedArray,
    UIntArray
} from "@thi.ng/api";

export const EVENT_ADDED = "added";
export const EVENT_PRE_REMOVE = "pre-remove";
export const EVENT_CHANGED = "changed";

export type ComponentID<S> = keyof S & string;

export type ComponentDefaultValue<T> = T | Fn0<T>;

export type GroupTuple<SPEC, K extends ComponentID<SPEC>> = Pick<SPEC, K> &
    IID<number>;

export type GroupInfo<SPEC, K extends ComponentID<SPEC>> = {
    [P in K]: ComponentInfo<SPEC, P>;
};

export interface ComponentInfo<SPEC, K extends ComponentID<SPEC>> {
    values: SPEC[K] extends TypedArray ? SPEC[K] : SPEC[K][];
    size: number;
    stride: number;
}

export interface IComponent<K extends string, T, V> extends IID<K>, INotify {
    dense: UIntArray;
    sparse: UIntArray;
    vals: ArrayLike<any>;
    size: number;
    stride: number;

    owner?: IID<string>;

    has(id: number): boolean;
    add(id: number, val?: V): boolean;
    delete(id: number): boolean;
    get(id: number): T | undefined;
    getIndex(i: number): T | undefined;

    keys(): ArrayLikeIterable<number>;
    values(): IterableIterator<T>;

    swapIndices(a: number, b: number): boolean;
}

export interface MemMappedComponentOpts<ID extends string> {
    id: ID;
    type: Type;
    buf?: ArrayBuffer;
    byteOffset?: number;
    size?: number;
    stride?: number;
    default?: ComponentDefaultValue<ArrayLike<number>>;
    cache?: ICache<TypedArray>;
}

export interface ObjectComponentOpts<ID extends string, T> {
    id: ID;
    default?: ComponentDefaultValue<T>;
}

export interface GroupOpts {
    id: string;
    cache: ICache<any>;
}

export interface ICache<T> extends IRelease {
    keys(): Iterable<number>;
    set(key: number, val: T): T;
    get(key: number): T | undefined;
    getSet(key: number, notFound: Fn0<T>): T;
    delete(key: number): boolean;
}
