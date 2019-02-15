import { fit as _fit, fit01 as _fit01, fit11 as _fit11 } from "@thi.ng/math";
import { ARGS_VVV, defHofOp } from "./internal/codegen";
import { HOF_VVV, HOF_VVVVV } from "./internal/templates";

export const [fit, fit2, fit3, fit4] =
    defHofOp(_fit, HOF_VVVVV, "o,a,b,c,d,e");

export const [fit01, fit01_2, fit01_3, fit01_4] =
    defHofOp(_fit01, HOF_VVV, ARGS_VVV);

export const [fit11, fit11_2, fit11_3, fit11_4] =
    defHofOp(_fit11, HOF_VVV, ARGS_VVV);
