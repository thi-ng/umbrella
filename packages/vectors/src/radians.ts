import { rad } from "@thi.ng/math/angle";
import type { MultiVecOpV, VecOpV } from "./api";
import { defHofOp } from "./internal/codegen";
import { FN } from "./internal/templates";

export const [radians, radians2, radians3, radians4] = defHofOp<
    MultiVecOpV,
    VecOpV
>(rad, FN("op"));
