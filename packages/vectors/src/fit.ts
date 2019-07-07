import { fit as _fit, fit01 as _fit01, fit11 as _fit11 } from "@thi.ng/math";
import { MultiVecOpVVV, VecOpVVV } from "./api";
import { ARGS_VVV, defHofOp } from "./internal/codegen";
import { FN3, FN5 } from "./internal/templates";

export const [fit, fit2, fit3, fit4] = defHofOp(_fit, FN5(), "o,a,b,c,d,e");

export const [fit01, fit01_2, fit01_3, fit01_4]: [
    MultiVecOpVVV,
    VecOpVVV,
    VecOpVVV,
    VecOpVVV
] = defHofOp(_fit01, FN3(), ARGS_VVV);

export const [fit11, fit11_2, fit11_3, fit11_4]: [
    MultiVecOpVVV,
    VecOpVVV,
    VecOpVVV,
    VecOpVVV
] = defHofOp(_fit11, FN3(), ARGS_VVV);
