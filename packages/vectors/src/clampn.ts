import { clamp as _clamp } from "@thi.ng/math";
import type { MultiVecOpVNN, VecOpVNN } from "./api";
import { defHofOp } from "./internal/codegen";

export const [clampN, clampN2, clampN3, clampN4] = defHofOp<
    MultiVecOpVNN,
    VecOpVNN
>(_clamp, ([o, a]) => `${o}=op(${a},n,m);`, "o,a,n,m", "o,a");
