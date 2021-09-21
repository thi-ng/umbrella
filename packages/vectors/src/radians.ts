import { rad } from "@thi.ng/math/angle";
import type { MultiVecOpV, VecOpV } from "./api";
import { defHofOp } from "./compile/emit";
import { FN } from "./compile/templates";

export const [radians, radians2, radians3, radians4] = defHofOp<
    MultiVecOpV,
    VecOpV
>(rad, FN("op"));
