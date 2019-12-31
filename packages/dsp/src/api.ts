import { Fn2, NumericArray } from "@thi.ng/api";

export type StatelessOscillator = (
    phase: number,
    freq: number,
    amp?: number,
    dc?: number,
    opts?: any
) => number;

export type ComplexArray = [NumericArray, NumericArray];

export type WindowFn = Fn2<number, number, number>;
