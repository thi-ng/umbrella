import type { FnN2, IDeref, NumericArray } from "@thi.ng/api";

export type StatelessOscillator = (
    phase: number,
    freq: number,
    amp?: number,
    dc?: number,
    ...opts: any[]
) => number;

export type ComplexArray = [NumericArray, NumericArray];

export type WindowFn = FnN2;

export interface IGen<T> extends Iterable<T>, IDeref<T> {
    next(): T;
    take(num: number, out?: T[], idx?: number): T[];
}

export interface IProc<A, B> extends IDeref<B> {
    next(src: A): B;
}

export interface IProc2<A, B, C> extends IDeref<C> {
    next(srcA: A, srcB: B): C;
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
