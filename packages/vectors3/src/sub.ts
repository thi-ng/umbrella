import { MultiVecOpVV, VecOpVV } from "./api";
import { defOp } from "./internal/codegen";
import { MATH } from "./internal/templates";

export const [sub, sub2, sub3, sub4] =
    defOp<MultiVecOpVV, VecOpVV>(MATH("-"));
