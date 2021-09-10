import {
    fit as _fit,
    fit01 as _fit01,
    fit11 as _fit11,
} from "@thi.ng/math/fit";
import type {
    MultiVecOpVVV,
    MultiVecOpVVVVV,
    VecOpVVV,
    VecOpVVVVV,
} from "./api";
import { defHofOp } from "./compile/emit";
import { ARGS_VVV, FN3, FN5 } from "./compile/templates";

export const [fit, fit2, fit3, fit4] = defHofOp<MultiVecOpVVVVV, VecOpVVVVV>(
    _fit,
    FN5(),
    "o,a,b,c,d,e"
);

export const [fit01, fit01_2, fit01_3, fit01_4] = defHofOp<
    MultiVecOpVVV,
    VecOpVVV
>(_fit01, FN3(), ARGS_VVV);

export const [fit11, fit11_2, fit11_3, fit11_4] = defHofOp<
    MultiVecOpVVV,
    VecOpVVV
>(_fit11, FN3(), ARGS_VVV);
