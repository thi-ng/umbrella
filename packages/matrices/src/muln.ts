import { mulN as _mulN, mulN4 } from "@thi.ng/vectors3/muln";
import { MatOpMN, MultiMatOpMN } from "./api";
import { defMathN } from "./internal/codegen";

export const mulN: MultiMatOpMN = _mulN;
export const mulN22: MatOpMN = mulN4;
export const [mulN23, mulN33, mulN44] = defMathN(mulN, "*");
