import { fmod as _fmod } from "@thi.ng/math";
import type { MultiVecOpVV, VecOpVV } from "./api";
import { ARGS_VV, defHofOp } from "./internal/codegen";
import { FN2 } from "./internal/templates";

/**
 * This version of mod uses the same logic as in GLSL, whereas {@link mod}
 * merely uses JavaScript's `%` modulo operator, yielding different
 * results for negative values, i.e. using the sign of the last arg.
 *
 * `a - b * floor(a/b)`
 *
 */
export const [fmod, fmod2, fmod3, fmod4] = defHofOp<MultiVecOpVV, VecOpVV>(
    _fmod,
    FN2("op"),
    ARGS_VV
);
