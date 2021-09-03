import type {
    Fn,
    Fn2,
    FnU2,
    FnU3,
    FnU4,
    FnU5,
    FnU6,
    NumericArray,
} from "@thi.ng/api";

export type Dual = NumericArray;

export type Op1 = Fn<Dual, Dual>;

export type Op1N = Fn2<Dual, number, Dual>;

export type Op2 = FnU2<Dual>;

export type Op3 = FnU3<Dual>;

export type Op4 = FnU4<Dual>;

export type Op5 = FnU5<Dual>;

export type Op6 = FnU6<Dual>;

export type OpV2 = FnU2<Dual[]>;
