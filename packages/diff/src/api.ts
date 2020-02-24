import type { IObjectOf } from "@thi.ng/api";

export type DiffKeyMap<T> = IObjectOf<T>;

export interface ArrayDiff<T> {
    distance: number;
    adds?: DiffKeyMap<T>;
    dels?: DiffKeyMap<T>;
    const?: DiffKeyMap<T>;
    linear?: EditLog<number, T>;
}

export interface ObjectDiff<T> {
    distance: number;
    adds?: string[];
    dels?: string[];
    edits?: EditLog<string, T>;
}

export type EditLog<K, T> = (K | T)[];
