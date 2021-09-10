import { deg } from "@thi.ng/math/angle";
import type { MultiVecOpV, VecOpV } from "./api";
import { defHofOp } from "./compile/emit";
import { FN } from "./compile/templates";

export const [degrees, degrees2, degrees3, degrees4] = defHofOp<
    MultiVecOpV,
    VecOpV
>(deg, FN("op"));
