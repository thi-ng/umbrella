import { smoothStep as _step } from "@thi.ng/math/step";
import { MultiVecOpV, VecOpV } from "./api";
import { DEFAULT_OUT, defHofOp } from "./internal/codegen";
import { HOF_VVV } from "./internal/templates";

/**
 * Like GLSL `smoothstep()`
 *
 * @param out
 * @param e1
 * @param e2
 * @param v
 */
export const [smoothStep, smoothStep2, smoothStep3, smoothStep4] =
    defHofOp<MultiVecOpV, VecOpV>(
        _step,
        HOF_VVV,
        "o,e1,e2,a",
        undefined,
        "o",
        3,
        DEFAULT_OUT
    );
