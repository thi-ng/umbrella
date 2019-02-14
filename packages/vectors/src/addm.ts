import { MultiVecOpVVV, VecOpVVV } from "./api";
import { ARGS_VVV, defOp } from "./internal/codegen";
import { ADDM } from "./internal/templates";

/**
 * Returns `out = (a + b) * c`.
 *
 * @see madd
 */
export const [addm, addm2, addm3, addm4] =
    defOp<MultiVecOpVVV, VecOpVVV>(ADDM, ARGS_VVV);
