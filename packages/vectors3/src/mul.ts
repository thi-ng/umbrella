import { MultiVecOpVV, VecOpVV } from "./api";
import { defOp } from "./internal/codegen";
import { MATH } from "./internal/templates";

export const [mul, mul2, mul3, mul4] =
    defOp<MultiVecOpVV, VecOpVV>(MATH("*"));
