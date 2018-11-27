import { subN as _subN, subN4 } from "@thi.ng/vectors3/subn";
import { MatOpMN, MultiMatOpMN } from "./api";
import { defMathN } from "./internal/codegen";

export const subN: MultiMatOpMN = _subN;
export const subN22: MatOpMN = subN4;
export const [subN23, subN33, subN44] = defMathN(subN, "-");
