import { smoothStep as _step } from "@thi.ng/math/step";
import { MultiVecOpV, VecOpV } from "./api";
import { defHofOp } from "./internal/codegen";

export const [smoothStep, smoothStep2, smoothStep3, smoothStep4] =
    defHofOp<MultiVecOpV, VecOpV>(
        _step,
        ([o, a, e1, e2]) => `${o}=op(${e1},${e2},${a});`,
        "o,a,e1,e2"
    );
