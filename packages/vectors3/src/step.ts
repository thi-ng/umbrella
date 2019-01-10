import { step as _step } from "@thi.ng/math";
import { MultiVecOpV, VecOpV } from "./api";
import { DEFAULT_OUT, defHofOp } from "./internal/codegen";
import { FN2 } from "./internal/templates";

/**
 * Like GLSL `step()`
 *
 * @param out
 * @param e
 * @param v
 */
export const [step, step2, step3, step4] =
    defHofOp<MultiVecOpV, VecOpV>(
        _step,
        FN2("op"),
        "o,e,a",
        undefined,
        "o",
        2,
        DEFAULT_OUT
    );
