import type { MultiVecOpN, Vec, VecOpN } from "./api";
import { defOp } from "./compile/emit";
import { SET_N } from "./compile/templates";

export const [setN, setN2, setN3, setN4] = defOp<MultiVecOpN, VecOpN>(
    SET_N,
    "a,n",
    "a",
    "a",
    0,
    ""
);

export const zero = (a: Vec) => setN(a, 0);
export const one = (a: Vec) => setN(a, 1);

export const zeroes = (n: number): Vec => new Array<number>(n).fill(0);
export const ones = (n: number): Vec => new Array<number>(n).fill(1);
