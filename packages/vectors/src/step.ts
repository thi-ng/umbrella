import { step as _step } from "@thi.ng/math/step";
import type { MultiVecOpVV, VecOpVV } from "./api";
import { DEFAULT_OUT, defHofOp } from "./internal/codegen";
import { FN2 } from "./internal/templates";

/**
 * Like GLSL `step()`
 *
 * @param out -
 * @param e -
 * @param v -
 */
export const [step, step2, step3, step4] = defHofOp<MultiVecOpVV, VecOpVV>(
    _step,
    FN2("op"),
    "o,e,a",
    undefined,
    "o",
    2,
    DEFAULT_OUT
);
