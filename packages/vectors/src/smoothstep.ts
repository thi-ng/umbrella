import { smoothStep as _step } from "@thi.ng/math/step";
import type { MultiVecOpVVV, VecOpVVV } from "./api";
import { DEFAULT_OUT, defHofOp } from "./internal/codegen";
import { FN3 } from "./internal/templates";

/**
 * Like GLSL `smoothstep()`
 *
 * @param out -
 * @param e1 -
 * @param e2 -
 * @param v -
 */
export const [smoothStep, smoothStep2, smoothStep3, smoothStep4] = defHofOp<
    MultiVecOpVVV,
    VecOpVVV
>(_step, FN3(), "o,e1,e2,a", undefined, "o", 3, DEFAULT_OUT);
