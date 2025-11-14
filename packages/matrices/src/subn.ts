// SPDX-License-Identifier: Apache-2.0
import { $sub } from "@thi.ng/vectors/ops";
import { subN as _subN, subN4 } from "@thi.ng/vectors/subn";
import type { MatOpMN, MultiMatOpMN } from "./api.js";
import { defMathN } from "./defmath.js";

/**
 * Componentwise scalar subtraction. If `out` is not given, writes
 * result in `mat`.
 *
 * out = mat - n
 *
 * @param out -
 * @param mat -
 * @param n -
 */
export const subN: MultiMatOpMN = _subN;
export const subN22: MatOpMN = subN4;
export const [subN23, subN33, subN44] = defMathN($sub);
