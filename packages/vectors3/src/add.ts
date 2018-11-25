import { MultiVecOpVV, VecOpVV } from "./api";
import { defOp } from "./internal/codegen";
import { MATH } from "./internal/templates";

export const [add, add2, add3, add4] =
    defOp<MultiVecOpVV, VecOpVV>(MATH("+"));
