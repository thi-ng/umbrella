import { roundTo as _round } from "@thi.ng/math";
import type { MultiVecOpVO, VecOpVO } from "./api";
import { defHofOp } from "./internal/codegen";
import { FN_N } from "./internal/templates";

export const [round, round2, round3, round4] = defHofOp<
    MultiVecOpVO<number>,
    VecOpVO<number>
>(_round, FN_N("op"), "o,a,n=1", "o,a");
