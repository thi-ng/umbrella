import { BVecOpVN, BVecOpVV, MultiBVecOpVN, MultiBVecOpVV } from "./api";
import { ARGS_VN, defOp } from "./internal/codegen";
import { MATH, MATH_N } from "./internal/templates";

export const [logicOr, logicOr2, logicOr3, logicOr4] = defOp<
    MultiBVecOpVV,
    BVecOpVV
>(MATH("||"));

export const [logicOrN, logicOrN2, logicOrN3, logicOrN4] = defOp<
    MultiBVecOpVN,
    BVecOpVN
>(MATH_N("||"), ARGS_VN);
