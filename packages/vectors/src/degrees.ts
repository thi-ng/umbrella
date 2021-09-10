import { deg } from "@thi.ng/math/angle";
import type { MultiVecOpV, VecOpV } from "./api";
import { defHofOp } from "./internal/codegen";
import { FN } from "./internal/templates";

export const [degrees, degrees2, degrees3, degrees4] = defHofOp<
    MultiVecOpV,
    VecOpV
>(deg, FN("op"));
