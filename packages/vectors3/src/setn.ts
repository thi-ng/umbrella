import { MultiVecOpN, Vec, VecOpN } from "./api";
import { defOp } from "./internal/codegen";

export const [setN, setN2, setN3, setN4] =
    defOp<MultiVecOpN, VecOpN>(([a]) => `${a}=n;`, "a,n", "a", "a", 0);

export const zero = (a: Vec) => setN(a, 0);
export const one = (a: Vec) => setN(a, 1);

export const zeroes = (n: number) => new Array(n).fill(0);
export const ones = (n: number) => new Array(n).fill(1);
