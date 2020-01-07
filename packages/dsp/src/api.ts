import { Fn2, IDeref, NumericArray } from "@thi.ng/api";

export const enum FilterType {
    LP,
    HP,
    BP
}

export type StatelessOscillator = (
    phase: number,
    freq: number,
    amp?: number,
    dc?: number,
    opts?: any
) => number;

export type ComplexArray = [NumericArray, NumericArray];

export type WindowFn = Fn2<number, number, number>;

export interface IGen<T> extends Iterable<T>, IDeref<T> {
    next(): T;
}

export interface IProc<A, B> extends IDeref<B> {
    next(src: A): B;
}

export interface FilterResponse {
    freq: number;
    mag: number;
    phase: number;
}
