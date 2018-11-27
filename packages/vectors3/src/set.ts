import { MultiVecOpV, VecOpV } from "./api";
import { defOp } from "./internal/codegen";
import { SET } from "./internal/templates";

export const [set, set2, set3, set4] =
    defOp<MultiVecOpV, VecOpV>(SET, "o,a", undefined, "o", 1, "");
