import { Fn2, IDeref, NumericArray } from "@thi.ng/api";

export const enum FilterType {
    LP,
    HP,
    BP,
    NOTCH,
    PEAK,
    LOSHELF,
    HISHELF,
    ALL
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

export interface FilterConfig {
    zeroes: number[];
    poles: number[];
}

export interface FilterResponse {
    freq: number;
    mag: number;
    phase: number;
}

export interface IFilter {
    /**
     * Returns this filter's zero & pole position(s). The result object
     * can then be passed to {@link filterResponse}.
     */
    filterCoeffs(): FilterConfig;
}
