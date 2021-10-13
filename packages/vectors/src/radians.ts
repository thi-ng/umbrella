import { rad } from "@thi.ng/math/angle";
import type { MultiVecOpV, VecOpV } from "./api.js";
import { defHofOp } from "./compile/emit.js";
import { FN } from "./compile/templates.js";

export const [radians, radians2, radians3, radians4] = defHofOp<
    MultiVecOpV,
    VecOpV
>(rad, FN("op"));
