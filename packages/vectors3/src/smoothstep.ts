import { smoothStep as _step } from "@thi.ng/math/step";
import { MultiVecOpV, VecOpV } from "./api";
import { defHofOp } from "./internal/codegen";

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
        ([o, e1, e2, a]) => `${o}=op(${e1},${e2},${a});`,
        "o,e1,e2,a",
        undefined,
        "o",
        3
    );
