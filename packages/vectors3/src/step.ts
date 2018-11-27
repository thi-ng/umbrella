import { step as _step } from "@thi.ng/math/step";
import { MultiVecOpV, VecOpV } from "./api";
import { defHofOp } from "./internal/codegen";

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
        ([o, e, a]) => `${o}=op(${e},${a});`,
        "o,e,a",
        undefined,
        "o",
        2
    );
