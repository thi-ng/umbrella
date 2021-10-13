import { mod as _mod } from "@thi.ng/math/prec";
import type { MultiVecOpVV, VecOpVV } from "./api.js";
import { defHofOp } from "./compile/emit.js";
import { ARGS_VV, FN2 } from "./compile/templates.js";

/**
 * Similar to {@link fmod}, {@link remainder}. This version of modulo uses the
 * same logic as in GLSL, yielding different results for negative values, i.e.
 * computes `a - b * floor(a/b)`
 *
 * @remarks
 * **Caution:** Due to the introduction of libc math functions in thi.ng/math
 * v4.0.0 and the resulting name/behavior clashes between the modulo logic in
 * JS, C & GLSL, this function previously _was_ called `fmod`, but going forward
 * has been renamed/swapped to align w/ its GLSL version and now exhibits a
 * different behavior than the current {@link fmod} function.
 *
 * https://www.khronos.org/registry/OpenGL-Refpages/gl4/html/mod.xhtml
 */
export const [mod, mod2, mod3, mod4] = defHofOp<MultiVecOpVV, VecOpVV>(
    _mod,
    FN2("op"),
    ARGS_VV
);
