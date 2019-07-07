import { BVecOpVV, MultiBVecOpVV } from "./api";
import { defOp } from "./internal/codegen";
import { MATH } from "./internal/templates";

export const [logicOr, logicOr2, logicOr3, logicOr4] = defOp<
    MultiBVecOpVV,
    BVecOpVV
>(MATH("||"));
