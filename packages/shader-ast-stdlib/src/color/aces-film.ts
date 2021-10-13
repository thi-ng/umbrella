import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import { add, div, mul } from "@thi.ng/shader-ast/ast/ops";
import { clamp01 } from "../math/clamp.js";

/**
 * Filmic HDR -> LDR mapping based on ACES.
 *
 * Reference:
 * https://knarkowicz.wordpress.com/2016/01/06/aces-filmic-tone-mapping-curve/
 *
 * @param col
 */
export const ACESFilm = defn("vec3", "ACESFilm", ["vec3"], (col) => [
    ret(
        clamp01(
            div(
                mul(col, add(mul(col, 2.51), 0.03)),
                add(mul(col, add(mul(col, 2.43), 0.59)), 0.14)
            )
        )
    ),
]);
