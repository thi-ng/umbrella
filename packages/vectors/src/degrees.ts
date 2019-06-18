import { deg } from "@thi.ng/math";
import { MultiVecOpV, VecOpV } from "./api";
import { defHofOp } from "./internal/codegen";
import { FN } from "./internal/templates";

export const [degrees, degrees2, degrees3, degrees4]: [
    MultiVecOpV,
    VecOpV,
    VecOpV,
    VecOpV
] = defHofOp(deg, FN("op"));
