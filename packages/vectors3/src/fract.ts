import { fract as _fract } from "@thi.ng/math/prec";
import { MultiVecOpV, VecOpV } from "./api";
import { defHofOp } from "./codegen";

export const [fract, fract2, fract3, fract4] =
    defHofOp<MultiVecOpV, VecOpV>(_fract);
