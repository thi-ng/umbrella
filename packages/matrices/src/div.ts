import { div as _div, div4 } from "@thi.ng/vectors3/div";
import { MatOpMM, MultiMatOpMM } from "./api";
import { defMath } from "./internal/codegen";

export const div: MultiMatOpMM = _div;
export const div22: MatOpMM = div4;
export const [div23, div33, div44] = defMath(div, "/");
