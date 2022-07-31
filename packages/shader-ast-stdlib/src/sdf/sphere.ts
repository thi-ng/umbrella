import { defn, ret } from "@thi.ng/shader-ast/ast/function";
import { sub } from "@thi.ng/shader-ast/ast/ops";
import { length } from "@thi.ng/shader-ast/builtin/math";

/**
 * Returns signed distance from `p` to centered circle of radius `r`.
 *
 * @param p - vec2
 * @param r - float
 */
export const sdfCircle = defn(
	"float",
	"sdCircle",
	["vec2", "float"],
	(p, r) => [ret(sub(length(p), r))]
);

/**
 * Returns signed distance from `p` to centered sphere of radius `r`.
 *
 * @param p - vec3
 * @param r - float
 */
export const sdfSphere = defn(
	"float",
	"sdSphere",
	["vec3", "float"],
	(p, r) => [ret(sub(length(p), r))]
);
