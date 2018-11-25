import { MultiVecOpV, VecOpV } from "./api";
import { defFnOp } from "./codegen";

export const [tan, tan2, tan3, tan4] =
    defFnOp<MultiVecOpV, VecOpV>("Math.tan");
