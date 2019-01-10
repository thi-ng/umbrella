import { addN as _addN, addN4 } from "@thi.ng/vectors3";
import { MatOpMN, MultiMatOpMN } from "./api";
import { defMathN } from "./internal/codegen";

export const addN: MultiMatOpMN = _addN;
export const addN22: MatOpMN = addN4;
export const [addN23, addN33, addN44] = defMathN(addN, "+");
