import { step as _step } from "@thi.ng/math/step";
import type { MultiVecOpVV, VecOpVV } from "./api.js";
import { defHofOp } from "./compile/emit.js";
import { DEFAULT_OUT, FN2 } from "./compile/templates.js";

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
