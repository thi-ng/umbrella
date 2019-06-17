import { rad } from "@thi.ng/math";
import { MultiVecOpV, VecOpV } from "./api";
import { defHofOp } from "./internal/codegen";
import { HOF_V } from "./internal/templates";

export const [radians, radians2, radians3, radians4]: [
    MultiVecOpV,
    VecOpV,
    VecOpV,
    VecOpV
] = defHofOp(rad, HOF_V);
