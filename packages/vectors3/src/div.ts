import { MultiVecOpVV, VecOpVV } from "./api";
import { defOp } from "./internal/codegen";
import { MATH } from "./internal/templates";

export const [div, div2, div3, div4] =
    defOp<MultiVecOpVV, VecOpVV>(MATH("/"));
