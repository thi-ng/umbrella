import type { Comparator, Predicate2 } from "@thi.ng/api";

export interface HeapOpts<T> {
    compare: Comparator<T>;
    equiv: Predicate2<T>;
}

export interface DHeapOpts<T> extends HeapOpts<T> {
    d: number;
}
