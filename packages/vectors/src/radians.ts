import { rad } from "@thi.ng/math";
import { MultiVecOpV, VecOpV } from "./api";
import { defHofOp } from "./internal/codegen";
import { FN } from "./internal/templates";

export const [radians, radians2, radians3, radians4]: [
    MultiVecOpV,
    VecOpV,
    VecOpV,
    VecOpV
] = defHofOp(rad, FN("op"));
