import { Comparator } from "@thi.ng/api/api";

export interface HeapOpts<T> {
    compare: Comparator<T>;
}

export interface DHeapOpts<T> extends HeapOpts<T> {
    d: number;
}
