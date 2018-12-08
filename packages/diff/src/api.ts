import { IObjectOf } from "@thi.ng/api/api";

export type DiffKeyMap<T> = IObjectOf<T>;

export const enum DiffMode {
    ONLY_DISTANCE,
    ONLY_DISTANCE_LINEAR,
    FULL,
};

export interface ArrayDiff<T> {
    distance: number;
    adds?: DiffKeyMap<T>;
    dels?: DiffKeyMap<T>;
    const?: DiffKeyMap<T>;
    linear?: (number | T)[];
}

export interface ObjectDiff<T> {
    distance: number;
    adds?: string[];
    dels?: string[];
    edits?: (PropertyKey | T)[];
}
