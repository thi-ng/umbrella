import { clamp as _clamp } from "@thi.ng/math/interval";
import type { MultiVecOpVNN, VecOpVNN } from "./api";
import { defHofOp } from "./compile/emit";

export const [clampN, clampN2, clampN3, clampN4] = defHofOp<
    MultiVecOpVNN,
    VecOpVNN
>(_clamp, ([o, a]) => `${o}=op(${a},n,m);`, "o,a,n,m", "o,a");
