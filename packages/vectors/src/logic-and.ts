import type { BVecOpVN, BVecOpVV, MultiBVecOpVN, MultiBVecOpVV } from "./api";
import { defOp } from "./compile/emit";
import { ARGS_VN, MATH, MATH_N } from "./compile/templates";

export const [logicAnd, logicAnd2, logicAnd3, logicAnd4] = defOp<
    MultiBVecOpVV,
    BVecOpVV
>(MATH("&&"));

export const [logicAndN, logicAndN2, logicAndN3, logicAndN4] = defOp<
    MultiBVecOpVN,
    BVecOpVN
>(MATH_N("&&"), ARGS_VN);
