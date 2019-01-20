import { MultiVecOpVVV, VecOpVVV } from "./api";
import { ARGS_VVV, defOp } from "./internal/codegen";
import { SUBM } from "./internal/templates";

/**
 * Returns `out = (a + b) * c`.
 *
 * @see madd
 */
export const [subm, subm2, subm3, subm4] =
    defOp<MultiVecOpVVV, VecOpVVV>(SUBM, ARGS_VVV);
