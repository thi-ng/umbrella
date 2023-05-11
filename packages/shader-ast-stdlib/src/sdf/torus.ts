import { F, V3 } from "@thi.ng/shader-ast/api/types";
import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import { vec2 } from "@thi.ng/shader-ast/ast/lit";
import { sub } from "@thi.ng/shader-ast/ast/ops";
import { $, $y } from "@thi.ng/shader-ast/ast/swizzle";
import { length } from "@thi.ng/shader-ast/builtin/math";

/**
 * Returns signed distance from `p` to torus centered around Y-axis with
 * radii `r1`, `r2`.
 *
 * @param p - vec3
 * @param r1 - float
 * @param r2 - float
 */
export const sdfTorus = defn(F, "sdTorus", [V3, F, F], (p, r1, r2) => [
	ret(sub(length(vec2(sub(length($(p, "xz")), r2), $y(p))), r1)),
]);
