import { defMathOp } from "./compile/emit";

/**
 * Similar to {@link mod}, {@link remainder}. This version of modulo uses the
 * same logic as the standard C function `fmod` and/or the JS `%` operator,
 * yielding results with the same sign as `a`, i.e. computes `a-b*trunc(a/b)`.
 *
 * @remarks
 * **Caution:** Due to the introduction of libc math functions in thi.ng/math
 * v4.0.0 and the resulting name/behavior clashes between the modulo logic in
 * JS, C & GLSL, this function previously _was_ called `mod`, but going forward
 * has been renamed/swapped to align w/ its C version and now exhibits a
 * different behavior than the current {@link mod} function.
 */
export const [fmod, fmod2, fmod3, fmod4] = defMathOp("%");
