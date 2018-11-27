import { compile } from "@thi.ng/vectors3/internal/codegen";
import { MATH, MATH_N } from "@thi.ng/vectors3/internal/templates";
import { MultiMatOpMM, MultiMatOpMN } from "../api";

const DEFAULT_SIZES = [6, 9, 16];

export const defMath =
    (fn: MultiMatOpMM, op: string, sizes = DEFAULT_SIZES) =>
        sizes.map((n) => fn.add(n, compile(n, MATH(op), "o,a,b", undefined, "o")));

export const defMathN =
    (fn: MultiMatOpMN, op: string, sizes = DEFAULT_SIZES) =>
        sizes.map((n) => fn.add(n, compile(n, MATH_N(op), "o,a,n", "o,a", "o")));
