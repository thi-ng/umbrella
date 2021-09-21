import type { MultiVecOpVVV, VecOpVVV } from "./api";
import { defOp } from "./compile/emit";
import { ARGS_VVV, MATH2 } from "./compile/templates";

/**
 * Returns `out = (a - b) * c`.
 *
 * - {@link madd}
 * - {@link addm}
 */
export const [subm, subm2, subm3, subm4] = defOp<MultiVecOpVVV, VecOpVVV>(
    MATH2("-", "*"),
    ARGS_VVV
);
