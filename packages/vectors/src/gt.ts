// SPDX-License-Identifier: Apache-2.0
import type { CompareOp, MultiCompareOp } from "./api.js";
import { defOp } from "./compile/emit.js";
import { MATH } from "./compile/templates.js";

export const [gt, gt2, gt3, gt4] = defOp<MultiCompareOp, CompareOp>(MATH(">"));
