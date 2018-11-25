import { MultiVecOpVN, VecOpVN } from "./api";
import { defOp } from "./internal/codegen";
import { MATH_N } from "./internal/templates";

export const [addN, addN2, addN3, addN4] =
    defOp<MultiVecOpVN, VecOpVN>(MATH_N("+"), "o,a,n");
