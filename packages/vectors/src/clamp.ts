import {
    clamp as _clamp,
    clamp01 as _clamp01,
    clamp11 as _clamp11,
} from "@thi.ng/math";
import { MultiVecOpVVV, VecOpVVV } from "./api";
import { ARGS_VVV, defHofOp } from "./internal/codegen";
import { FN3 } from "./internal/templates";

export const [clamp, clamp2, clamp3, clamp4] = defHofOp<
    MultiVecOpVVV,
    VecOpVVV
>(_clamp, FN3(), ARGS_VVV);

export const [clamp01, clamp01_2, clamp01_3, clamp01_4] = defHofOp<
    MultiVecOpVVV,
    VecOpVVV
>(_clamp01, FN3(), ARGS_VVV);

export const [clamp11, clamp11_2, clamp11_3, clamp11_4] = defHofOp<
    MultiVecOpVVV,
    VecOpVVV
>(_clamp11, FN3(), ARGS_VVV);
