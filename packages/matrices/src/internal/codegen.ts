import {
    ARGS_VN,
    ARGS_VV,
    compile,
    DEFAULT_OUT,
    MATH,
    MATH_N,
} from "@thi.ng/vectors";
import type { MultiMatOpMM, MultiMatOpMN } from "../api";

const DEFAULT_SIZES = [6, 9, 16];

export const defMath = (fn: MultiMatOpMM, op: string, sizes = DEFAULT_SIZES) =>
    sizes.map((n) =>
        fn.add(
            n,
            compile(n, MATH(op), ARGS_VV, undefined, "o", "", DEFAULT_OUT)
        )
    );

export const defMathN = (fn: MultiMatOpMN, op: string, sizes = DEFAULT_SIZES) =>
    sizes.map((n) =>
        fn.add(n, compile(n, MATH_N(op), ARGS_VN, "o,a", "o", "", DEFAULT_OUT))
    );
