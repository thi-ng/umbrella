import { MultiVecOpVN, VecOpVN } from "./api";
import { defOp } from "./internal/codegen";
import { MATH_N } from "./internal/templates";

export const [mulN, mulN2, mulN3, mulN4] =
    defOp<MultiVecOpVN, VecOpVN>(MATH_N("*"), "o,a,n");
