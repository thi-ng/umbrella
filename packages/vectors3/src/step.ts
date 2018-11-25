import { step as _step } from "@thi.ng/math/step";
import { MultiVecOpV, VecOpV } from "./api";
import { defHofOp } from "./internal/codegen";

export const [step, step2, step3, step4] =
    defHofOp<MultiVecOpV, VecOpV>(
        _step,
        ([o, a, e]) => `${o}=op(${e},${a});`,
        "o,a,e"
    );
