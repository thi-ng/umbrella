import { deg } from "@thi.ng/math/angle";
import type { MultiVecOpV, VecOpV } from "./api.js";
import { defHofOp } from "./compile/emit.js";
import { FN } from "./compile/templates.js";

export const [degrees, degrees2, degrees3, degrees4] = defHofOp<
    MultiVecOpV,
    VecOpV
>(deg, FN("op"));
