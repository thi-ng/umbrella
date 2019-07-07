import { BVecOpVV, MultiBVecOpVV } from "./api";
import { defOp } from "./internal/codegen";
import { MATH } from "./internal/templates";

export const [logicAnd, logicAnd2, logicAnd3, logicAnd4] = defOp<
    MultiBVecOpVV,
    BVecOpVV
>(MATH("&&"));
