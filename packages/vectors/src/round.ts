import { roundTo as _round } from "@thi.ng/math/prec";
import type { MultiVecOpVO, MultiVecOpVV, VecOpVO, VecOpVV } from "./api";
import { ARGS_VV, defHofOp } from "./internal/codegen";
import { FN2, FN_N } from "./internal/templates";

/**
 * Rounds components of the first input to multiples of the 2nd input vector.
 *
 * @remarks
 * Unitl v4.8.0 errorneously defined what should have been {@link roundN}. Now
 * correctly using 2 input vectors.
 */
export const [round, round2, round3, round4] = defHofOp<MultiVecOpVV, VecOpVV>(
    _round,
    FN2("op"),
    ARGS_VV
);

/**
 * Similar to {@link round}, but only uses a single scalar to round all vector
 * components.
 */
export const [roundN, roundN2, roundN3, roundN4] = defHofOp<
    MultiVecOpVO<number>,
    VecOpVO<number>
>(_round, FN_N("op"), "o,a,n=1", "o,a");
