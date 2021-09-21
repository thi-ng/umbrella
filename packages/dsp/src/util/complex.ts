import type { NumericArray } from "@thi.ng/api";
import { isNumber } from "@thi.ng/checks/is-number";
import type { ComplexArray } from "../api";

export const isComplex = (
    buf: NumericArray | ComplexArray
): buf is ComplexArray => !isNumber(buf[0]);
