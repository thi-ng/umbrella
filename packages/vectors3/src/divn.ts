import { MultiVecOpVN, VecOpVN } from "./api";
import { defOp } from "./internal/codegen";
import { MATH_N } from "./internal/templates";

export const [divN, divN2, divN3, divN4] =
    defOp<MultiVecOpVN, VecOpVN>(MATH_N("/"), "o,a,n");
