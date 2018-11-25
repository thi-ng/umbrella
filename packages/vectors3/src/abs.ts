import { MultiVecOpV, VecOpV } from "./api";
import { defFnOp } from "./codegen";

export const [abs, abs2, abs3, abs4] =
    defFnOp<MultiVecOpV, VecOpV>("Math.abs");
