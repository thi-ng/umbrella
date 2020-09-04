import type { Fn, Fn2, Fn3, Fn4, NumericArray } from "@thi.ng/api";

export type Dual = NumericArray;

export type Op1 = Fn<Dual, Dual>;
export type Op1N = Fn2<Dual, number, Dual>;
export type Op2 = Fn2<Dual, Dual, Dual>;
export type Op3 = Fn3<Dual, Dual, Dual, Dual>;
export type Op4 = Fn4<Dual, Dual, Dual, Dual, Dual>;
