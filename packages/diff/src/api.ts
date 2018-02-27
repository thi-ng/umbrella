import { IObjectOf } from "@thi.ng/api/api";

export interface DiffLogEntry<T> extends Array<any> {
    [0]: number;
    [1]: number;
    [2]: T;
}

export type DiffKeyMap<T> = IObjectOf<T>;

export interface ArrayDiff<T> {
    distance: number;
    adds: DiffKeyMap<T>;
    dels: DiffKeyMap<T>;
    const: DiffKeyMap<T>;
    linear: DiffLogEntry<T>[];
}

export interface ObjectDiff {
    distance: number;
    adds: string[];
    dels: string[];
    edits: [PropertyKey, any];
}
