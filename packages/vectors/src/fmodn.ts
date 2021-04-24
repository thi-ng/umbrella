import { defMathOpN } from "./internal/codegen";

/**
 * Same as {@link mod}, but 2nd operand is a single scalar (uniform domain for
 * all vector components).
 */
export const [fmodN, fmodN2, fmodN3, fmodN4] = defMathOpN("%");
