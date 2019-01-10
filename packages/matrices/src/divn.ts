import { divN as _divN, divN4 } from "@thi.ng/vectors3";
import { MatOpMN, MultiMatOpMN } from "./api";
import { defMathN } from "./internal/codegen";

export const divN: MultiMatOpMN = _divN;
export const divN22: MatOpMN = divN4;
export const [divN23, divN33, divN44] = defMathN(divN, "/");
