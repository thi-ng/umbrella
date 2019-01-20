import { sub as _sub, sub4 } from "@thi.ng/vectors3";
import { MatOpMM, MultiMatOpMM } from "./api";
import { defMath } from "./internal/codegen";

/**
 * Componentwise matrix subtraction. If `out` is not
 * given, writes result in `a`.
 *
 * out = a - b
 *
 * @param out
 * @param a
 * @param b
 */
export const sub: MultiMatOpMM = _sub;
export const sub22: MatOpMM = sub4;
export const [sub23, sub33, sub44] = defMath(sub, "-");
