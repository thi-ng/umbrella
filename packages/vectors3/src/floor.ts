import { MultiVecOpV, VecOpV } from "./api";
import { defFnOp } from "./codegen";

export const [floor, floor2, floor3, floor4] =
    defFnOp<MultiVecOpV, VecOpV>("Math.floor");
