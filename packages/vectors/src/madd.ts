import { MultiVecOpVVV, VecOpVVV } from "./api";
import { ARGS_VVV, defOp } from "./internal/codegen";
import { MADD } from "./internal/templates";

/**
 * Returns `out = a + b * c`.
 *
 * @see addm
 */
export const [madd, madd2, madd3, madd4] = defOp<MultiVecOpVVV, VecOpVVV>(
    MADD,
    ARGS_VVV
);
