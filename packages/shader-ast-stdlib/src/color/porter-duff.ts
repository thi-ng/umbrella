import { Fn2 } from "@thi.ng/api";
import {
    $w,
    add,
    defn,
    FLOAT0,
    FLOAT1,
    FloatTerm,
    mul,
    ret,
    sub
} from "@thi.ng/shader-ast";
import { clamp01 } from "../math/clamp";

/**
 * Higher-order Porter-Duff alpha compositing operator. See
 * thi.ng/porter-duff for reference. Returns an optimized AST function
 * which accepts 2 RGBA colors (`vec4`) and returns blended & clamped
 * result (also `vec4`). All built-in PD operators are defined via this
 * HOF.
 *
 * The two given JS functions are used to extract blending coefficients
 * for src/dest colors and are called with the alpha components of both
 * colors.
 *
 * @param name function name
 * @param fa src coeff fn
 * @param fb dest coeff fn
 */
export const porterDuff = (
    name: string,
    fa: Fn2<FloatTerm, FloatTerm, FloatTerm>,
    fb: Fn2<FloatTerm, FloatTerm, FloatTerm>
) =>
    defn("vec4", name, ["vec4", "vec4"], (a, b) => {
        const src =
            fa === ZERO ? FLOAT0 : fa === ONE ? a : mul(a, fa($w(a), $w(b)));
        const dest =
            fb === ZERO ? FLOAT0 : fb === ONE ? b : mul(b, fb($w(a), $w(b)));
        return [
            ret(
                clamp01(
                    src === FLOAT0
                        ? dest
                        : dest === FLOAT0
                        ? src
                        : add(src, dest)
                )
            )
        ];
    });

// coefficient functions

export const ZERO = () => FLOAT0;
export const ONE = () => FLOAT1;
export const A = (a: FloatTerm) => a;
export const B = (_: FloatTerm, b: FloatTerm) => b;
export const ONE_MINUS_A = (a: FloatTerm) => sub(FLOAT1, a);
export const ONE_MINUS_B = (_: FloatTerm, b: FloatTerm) => sub(FLOAT1, b);

// standard Porter-Duff operators

export const blendSrcOver = porterDuff("blendSrcOver", ONE, ONE_MINUS_A);
export const blendDestOver = porterDuff("blendDestOver", ONE_MINUS_B, ONE);
export const blendSrcIn = porterDuff("blendSrcIn", B, ZERO);
export const blendDestIn = porterDuff("blendDestIn", ZERO, A);
export const blendSrcOut = porterDuff("blendSrcOut", ONE_MINUS_B, ZERO);
export const blendDestOut = porterDuff("blendDestOut", ZERO, ONE_MINUS_A);
export const blendSrcAtop = porterDuff("blendSrcAtop", B, ONE_MINUS_A);
export const blendDestAtop = porterDuff("blendDestAtop", ONE_MINUS_B, A);
export const blendXor = porterDuff("blendXor", ONE_MINUS_B, ONE_MINUS_A);
export const blendPlus = porterDuff("blendPlus", ONE, ONE);
