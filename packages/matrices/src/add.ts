import { add as _add, add4 } from "@thi.ng/vectors3";
import { MatOpMM, MultiMatOpMM } from "./api";
import { defMath } from "./internal/codegen";

export const add: MultiMatOpMM = _add;
export const add22: MatOpMM = add4;
export const [add23, add33, add44] = defMath(add, "+");
