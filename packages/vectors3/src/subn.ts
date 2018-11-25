import { MultiVecOpVN, VecOpVN } from "./api";
import { defOp } from "./internal/codegen";
import { MATH_N } from "./internal/templates";

export const [subN, subN2, subN3, subN4] =
    defOp<MultiVecOpVN, VecOpVN>(MATH_N("-"), "o,a,n");
